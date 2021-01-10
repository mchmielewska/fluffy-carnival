let config;
try {
  config = require('../config');
} catch (e) {
  if (e instanceof Error && e.code === 'MODULE_NOT_FOUND')
    console.log("Can't load config (skipping)");
  else throw e;
}
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/users');
const Post = require('../models/posts');
const mailUtils = require('../utils/mail');
const friendsUtils = require('../utils/friends');
const searchParams = require('../utils/search');

const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];

exports.postRegisterUser = async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.surname ||
    !req.body.password ||
    !req.body.gender ||
    !req.body.birthDate
  ) {
    res.status(401).send('Missing required data!');
    return;
  }
  if (req.body.password.length < 8) {
    res.status(401).send('Password too short');
    return;
  }
  if (!mailUtils.validatePassword(req.body.password)) {
    res.status(401).send('Invalid password');
    return;
  }
  if (await User.findByEmail(req.body.email)) {
    res.status(401).send('Email alredy taken');
    return;
  }
  let NewUser = new User({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    bio: req.body.bio,
    country: req.body.country,
    city: req.body.city,
    favouriteMovie: req.body.favouriteMovie,
  });

  mailUtils.sendActivationEmail(NewUser);

  NewUser.encrypt()
    .then(() => {
      NewUser.save();
      res.status(201).send('User created');
    })
    .catch(() => res.status(400).send('Error occurred'));
};

exports.getActivateUser = (req, res, next) => {
  User.findOne({ guid: req.query.guid }).then((user) => {
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }
    user.isVerified = true;
    user.guid = '';
    user.save();
    res.redirect(`http://localhost:3000/useractivated`);
  });
};

exports.postAuthenticateUser = (req, res, next) => {
  let start_time = Date.now(); 
  let { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    console.log(`Took ${Date.now() - start_time} to query db`)
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (!user.isVerified) {
      res.status(404).send('User not verified');
      return;
    }

    user.comparePassword(password).then((result) => {
      console.log(`Took ${Date.now() - start_time} to query db + compare password`)
      if (result) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.SERVER_SECRET || config.server.secret,
          { expiresIn: 1000 }
        );
        res.json({
          auth: true,
          token: `${token}`,
        });
      } else {
        res
          .status(401)
          .json({ auth: false, token: null, msg: 'Incorrect password' });
      }
      console.log(`Took ${Date.now() - start_time} to query db + compare password + respond`)
    });
  });
};

exports.getLogoutUser = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

exports.getResetPassword = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.query.token }).then((user) => {
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }
    res.redirect(
      `http://localhost:3000/resetpassword2?token=${req.query.token}`
    );
  });
};

exports.postResetPassword = (req, res, next) => {
  User.findByEmail(req.body.email).then((user) => {
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }

    mailUtils.sendResetPasswordEmail(user);
    user.save();
    res.status(200).json({ success: true, msg: 'Reset mail sent' });
  });
};

exports.putResetPassword = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.query.token }).then((user) => {
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }

    // if (user.expirationTokenDate < Date.now()) {
    //     res.status(400).json({ success: false, msg: "Token expired" });
    //     return;
    // }
    user.password = req.body.password;

    user
      .encrypt()
      .then(() => {
        user.save();
        res.status(201).send('Password changed');
      })
      .catch(() => res.status(400).send('Error occurred'));
  });
};

exports.getFindCurrentUser = (req, res, next) => {
  User.findById(loggedUserId, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');

    Post.find({ authorId: loggedUserId }).then((posts) => {
      if (!posts) {
        res.status(400).json({ success: false, msg: 'Posts not found' });
      }
      const userPosts = _.map(posts, (post) =>
        _.pick(post, [
          'title',
          'publishDate',
          'description',
          'tags',
          'postImagePath',
        ])
      );
      const currentUser = _.pick(user, ['name', 'surname', 'profileImagePath']);

      res.status(200).send({ user: currentUser, posts: userPosts });
    });
  });
};

exports.patchUpdateUser = (req, res, next) => {
  User.findOne({ _id: loggedUserId }).then((foundUser) => {
    if (foundUser.role === 'User' || foundUser.role === 'Moderator') {
      if (req.body.password || req.body.email || req.body.role) {
        res
          .status(400)
          .json({ success: false, msg: 'This data cannot be modified' });
        return;
      }
      User.findByIdAndUpdate(loggedUserId, { $set: req.body }).then((user) => {
        if (!user) {
          res.status(400).json({ success: false, msg: 'User not found' });
          return;
        }
        user.save();
        res.status(200).json({ success: true, msg: 'Profile updated' });
        return;
      });
    } else if (foundUser.role === 'Admin') {
      if (req.body.password || req.body.email) {
        res
          .status(400)
          .json({ success: false, msg: 'This data cannot be modified' });
        return;
      }
      User.findByIdAndUpdate(req.query.id, { $set: req.body }).then((user) => {
        if (!user) {
          res.status(400).json({ success: false, msg: 'User not found' });
          return;
        }
        user.save();
        res
          .status(200)
          .json({ success: true, msg: 'Profile updated by Admin' });
        return;
      });
    }
  });
};

exports.patchChangePassword = (req, res, next) => {
  User.findOne({ _id: loggedUserId }).then((foundUser) => {
    if (foundUser.role === 'User' || foundUser.role === 'Moderator') {
      User.findById(loggedUserId).then((user) => {
        if (!user) {
          res.status(400).json({ success: false, msg: 'User not found' });
          return;
        } else if (req.body.validatepassword != req.body.password) {
          res
            .status(400)
            .json({ success: false, msg: "Passwords don't match." });
        }

        user.password = req.body.password;

        user
          .encrypt()
          .then(() => {
            user.save();
            res.status(201).send('Password changed');
          })
          .catch(() => res.status(400).send('Error occurred'));
      });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: loggedUserId }).then((foundUser) => {
    if (foundUser.role === 'User') {
      User.findOne({ _id: loggedUserId }).then((user) => {
        if (!user) {
          res.status(400).json({ success: false, msg: 'User not found' });
        }
        user.remove();
        res.status(200).send('User removed!');
      });
    } else if (foundUser.role === 'Admin') {
      User.findOne({ _id: req.query.id }).then((user) => {
        if (!user) {
          res.status(400).json({ success: false, msg: 'User not found' });
        }
        user.remove();
        res.status(200).send('User removed by Admin!');
      });
    }
  });
};

exports.getFindUsers = async (req, res, next) => {
  const users = await searchParams.userSearch(req);

  if (!users || users.length == 0) {
    res
      .status(400)
      .json({ success: false, msg: 'Users matching criteria not found' });
  }
  const foundUsers = _.map(users, (user) =>
    _.pick(user, [
      '_id',
      'name',
      'surname',
      'birthDate',
      'gender',
      'country',
      'city',
      'friends',
      'email',
      'profileImagePath',
    ])
  );

  res.send(foundUsers);
};

exports.putChangeVisibility = (req, res, next) => {
  User.findById(loggedUserId).then((user) => {
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }

    user.visibility = req.body.visibility;
    user.save();

    res.status(200).json({ success: true, msg: 'Visibility changed!' });
  });
};

exports.patchProfileImage = (req, res, next) => {
  User.findOne({ _id: loggedUserId }).then((user) => {
    User.findByIdAndUpdate(loggedUserId).then((user) => {
      const result = saveImage(user, req.file);
      if (result) {
        res.status(200).json({ success: true, msg: 'Profile image updated' });
      } else {
        res.status(403).json({ success: false, msg: 'something went wrong' });
      }
      return;
    });
  });
};

function saveImage(user, file) {
  var fs = require('fs');
  const imageEncoded = fs.readFileSync(file.path);
  if (imageEncoded == null) return false;
  // const image = JSON.parse(imageEncoded).then(json => console.log(json));
  // console.log(image != null, image.type, imageMimeTypes)
  // if (image != null && imageMimeTypes.includes(image.type)) {

  user.profileImage = new Buffer.from(imageEncoded, 'base64');
  user.profileImageType = 'image/jpeg';
  user.save();
  return true;
}
