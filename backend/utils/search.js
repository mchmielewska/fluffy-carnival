const Post = require('../models/posts');
const friendsUtils = require('../utils/friends');
const User = require('../models/users');

exports.userSearch = async (req) => {
  let users;
  if (req.query.search) {
    users = await User.find({
      $and: [
        { visibility: 'visible' },
        {
          $or: [
            {
              name: { $regex: req.query.search, $options: 'i' },
            },
            {
              surname: { $regex: req.query.search, $options: 'i' },
            },
          ],
        },
      ],
    });
    return users;
  } else {
    users = await User.find({ visibility: 'visible' });
    return users;
  }
};

exports.postSearch = async (req) => {
  if (req.query.privacy === 'all') {
    const user = await User.findById(loggedUserId);
    const friendsIds = friendsUtils.myFriends(user);
    let posts = await Post.find({
      $or: [
        {
          $and: [
            { authorId: friendsIds },
            { state: 'published' },
            { privacyLevel: 'friendsOnly' },
          ],
        },
        { $and: [{ authorId: loggedUserId }, { state: 'published' }] },
        { $and: [{ privacyLevel: 'public' }, { state: 'published' }] },
      ],
    });
    return posts;
  }
  if (req.query.tags) {
    const user = await User.findById(loggedUserId);
    const friendsIds = friendsUtils.myFriends(user);
    let tag = req.query.tags;
    let posts = await Post.find({
      $or: [
        {
          $and: [
            { authorId: friendsIds },
            { state: 'published' },
            { privacyLevel: 'friendsOnly' },
            { tags: { $in: [tag] } }
          ],
        },
        { $and: [{ authorId: loggedUserId }, { state: 'published' }, { tags: { $in: [tag] } }] },
        { $and: [{ privacyLevel: 'public' }, { state: 'published' }, { tags: { $in: [tag] } }] },
      ],
    });
    return posts;
  }
  if (req.query.search) {
    const user = await User.findById(loggedUserId);
    const friendsIds = friendsUtils.myFriends(user);
    let posts = await Post.find({
      $and: [
        {
          $or: [
            { privacyLevel: 'public' },
            { authorId: loggedUserId },
            {
              $and: [{ authorId: friendsIds }, { privacyLevel: 'friendsOnly' }],
            },
          ],
        },
        { state: 'published' },
        {
          $text: { $search: `\"${req.query.search}\"`, $caseSensitive: false },
        },
      ],
    });
    return posts;
  } else if (req.query.privacy == 'private') {
    let posts = await Post.find({
      $and: [
        { authorId: loggedUserId },
        { state: 'published' },
        { privacyLevel: 'private' },
      ],
    });
    return posts;
  } else if (req.query.privacy == 'friendsonly') {
    const user = await User.findById(loggedUserId);
    const friendsIds = friendsUtils.myFriends(user);
    let posts = await Post.find({
      $and: [
        { authorId: friendsIds },
        { state: 'published' },
        { privacyLevel: 'friendsOnly' },
      ],
    });
    return posts;
  }
};
