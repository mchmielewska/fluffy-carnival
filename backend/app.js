/*jshint esversion: 6 */
const morganBody = require('morgan-body');
const express = require('express');
const mongoose = require('mongoose');
let config;
try {
  config = require('./config');
} catch (e) {
  if (e instanceof Error && e.code === 'MODULE_NOT_FOUND')
    console.log("Can't load config (skipping)");
  else throw e;
}
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const cors = require('cors');

const cloudinary = require('cloudinary').v2;

const bodyparser = require('body-parser');
const UserRoutes = require('./routers/users');
const PostRoutes = require('./routers/posts');
const FriendsRoutes = require('./routers/friends');
const User = require('./models/users');
const Post = require('./models/posts');

const app = express();
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(cors());

morganBody(app);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.SERVER_SECRET || config.server.secret,
};

console.log(':(((((((((((', config.server);

if (config.cloudinary) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });
}

const successHandler = (jwt_payload, done) => {
  User.findById(jwt_payload.id).then((user) => {
    if (!user) {
      done(null, false);
      return;
    }

    done(null, user);
  });
};

passport.use(new Strategy(opts, successHandler));

app.use('/users', UserRoutes);
app.use('/friends', FriendsRoutes);
app.use('/posts', PostRoutes);

app.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => res.send('Secret hello')
);

mongoose
  .connect(process.env.DATABASE_URL || config.database.url, {
    useNewUrlParser: true,
  })
  .then(() => app.listen(process.env.PORT || config.server.port))
  .then(() =>
    User.create({
      email: 'admin@fluffyadmin.com',
      isVerified: true,
      password: 'Admin123!',
      role: 'Admin',
      name: 'Admin',
      surname: 'Adminadmin',
      gender: 'other',
      birthDate: 1970 - 01 - 01,
    }).then((User) =>
      User.encrypt().then(() => {
        User.save();
      })
    )
  )
  .catch((err) => console.log(err));
