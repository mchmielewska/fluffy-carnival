const Post = require('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const searchParams = require('../utils/search');
const _ = require('lodash');
const cloudinary = require('cloudinary').v2;
const { post } = require('../routers/users');

function saveImage(post, file) {
  var fs = require('fs');
  const imageEncoded = fs.readFileSync(file.path);
  if (imageEncoded == null) return false;

  post.postImage = new Buffer.from(imageEncoded, 'base64');
  post.postImageType = 'image/jpeg';
}

exports.postAddNew = (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    res.status(401).send('Missing required data!');
    return;
  }

  console.log(req.body);

  let NewPost = new Post({
    authorId: loggedUserId,
    title: req.body.title,
    description: req.body.description,
    privacyLevel: req.body.privacyLevel,
    publishDate: req.body.publishDate,
    state: req.body.state,
    tags: req.body.tags,
  });

  if (req.file.path) {
    cloudinary.uploader.upload(
      req.file.path,
      { async: 'false', width: 800 },
      function (error, result) {
        console.log('result:', result, 'resultUrl', result.secure_url);

        if (result.secure_url) {
          NewPost.postImageCloudUrl = result.secure_url;
          NewPost.save();
          console.log(result, error);
          res
            .status(200)
            .json({ success: true, message: 'Post created (with image)' });
          return;
        }
      }
    );
  } else {
    // saveImage(NewPost, req.file);
    NewPost.save();
    res.status(200).json({ success: true, message: 'Post created!' });
  }
};

exports.getFindPost = async (req, res, next) => {
  const posts = await searchParams.postSearch(req);

  if (!posts || posts.length == 0) {
    res.status(400).json({ success: false, message: 'Not found' });
    return;
  }

  let foundPosts;

  if (req.query.search) {
    foundPosts = _.map(posts, (post) =>
      _.pick(post, [
        'id',
        'title',
        'publishDate',
        'authorId',
        'description',
        'tags',
        'privacyLevel',
        'comments',
      ])
    );
  } else {
    foundPosts = _.map(posts, (post) =>
      _.pick(post, [
        'id',
        'title',
        'publishDate',
        'authorId',
        'description',
        'tags',
        'privacyLevel',
        'postImagePath',
        'comments',
      ])
    );
  }

  res.send(foundPosts);
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.body.id }).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
    } else if (post.authorId != loggedUserId) {
      res.status(400).json({
        success: false,
        message: "Your not allowed to delete other user's post.",
      });
      return;
    }

    post.remove();
    res.status(200).send('Post removed!');
  });
};

exports.patchUpdatePost = async (req, res, next) => {
  Post.findByIdAndUpdate(req.query.id, { $set: req.body }).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    } else if (post.authorId != loggedUserId) {
      res.status(400).json({
        success: false,
        message: "Your not allowed to modify other user's post.",
      });
      return;
    }

    // if (req.file) saveImage(post, req.file);
    if (req.file) {
      cloudinary.uploader.upload(
        req.file.path,
        { async: 'false', width: 800 },
        function (error, result) {
          console.log('result:', result, 'resultUrl', result.secure_url);

          if (result.secure_url) {
            // post.postImage = undefined;
            post.postImageCloudUrl = result.secure_url;
          }

          console.log(result, error);
          post.save();
          res
            .status(200)
            .json({ success: true, message: 'Post updated (with image)' });
          return;
        }
      );
    } else {
      const tags = req.body.tags
        ? req.body.tags.toLowerCase().split(', ')
        : undefined;
      post.tags = tags;
      console.log(post.tags);

      post.save();
      res.status(200).json({ success: true, message: 'Post updated' });
      return;
    }
  });
};

exports.postLikePost = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.id).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    } else if (post.likes.includes(loggedUserId)) {
      res
        .status(400)
        .json({ success: false, message: 'You already liked this post' });
      return;
    }

    const like = {
      user: loggedUserId,
      id: req.query.id,
    };

    post.likes.push(like);
    post.save();

    User.findById(loggedUserId).then((user) => {
      const likedPost = {
        postId: req.query.id,
      };
      user.likedPosts.push(likedPost);
      user.save();
    });

    res.status(200).json({ success: true, message: 'Post liked!' });
    return;
  });
};

exports.deleteUnlikePost = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.id).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    } else {
      const removedLike = post.likes.find((like) => like.user == loggedUserId);
      if (!removedLike) return;

      removedLike.remove();
      post.save();

      User.findById(loggedUserId).then((user) => {
        const removedLike = user.likedPosts.find(
          (likedPost) => likedPost.postId == req.query.id
        );
        removedLike.remove();
        user.save();
      });

      res.status(200).json({ success: true, message: 'Post unliked!' });
      return;
    }
  });
};

exports.getPostLikes = (req, res, next) => {
  Post.find({ state: 'published' }).then((posts) => {
    if (!posts || posts.length == 0) {
      res.status(400).json({ success: false, message: 'Posts not found' });
      return;
    }

    const likes = _.map(posts, (post) => _.pick(post, ['_id', 'likes']));
    res.send(likes);
  });
};

exports.getUserFavourites = (req, res, next) => {
  Post.find({ state: 'published' }).then((posts) => {
    if (!posts || posts.length == 0) {
      res.status(400).json({ success: false, message: 'Posts not found' });
      return;
    }
    let favouritesArray = [];

    const allLikedPosts = posts.filter((post) => post.likes.length !== 0);
    const favouritesList = allLikedPosts.filter((post) =>
      post.likes.find((postLike) => postLike.user == loggedUserId)
    );

    for (let i in favouritesList) {
      const likedPost = posts.find((post) => post.id === favouritesList[i].id);
      favouritesArray.push(likedPost);
    }

    let foundPosts = _.map(favouritesArray, (post) =>
      _.pick(post, [
        'id',
        'title',
        'publishDate',
        'authorId',
        'description',
        'tags',
        'privacyLevel',
        'postImagePath',
      ])
    );

    res.send(foundPosts);
  });
};

exports.postAddComment = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.id).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    }

    const newComment = {
      author: loggedUserId,
      comment: req.body.comment,
      publishDate: Date.now(),
    };

    post.comments.push(newComment);
    post.save();

    res.status(200).json({ success: true, message: 'Comment added!' });
    return;
  });
};

exports.deleteComment = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.postId).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    }

    const commentToBeRemoved = post.comments.find(
      (comment) => comment.author == loggedUserId && comment._id == req.query.id
    );

    commentToBeRemoved.remove();
    post.save();

    res.status(200).json({ success: true, message: 'Comment deleted!' });
    return;
  });
};

exports.getPostComments = (req, res, next) => {
  Post.findOne({ _id: req.query.id }).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    }

    const comments = post.comments;
    res.send(comments);
  });
};

exports.postLikeComment = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.postId).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    }

    const like = {
      user: loggedUserId,
    };

    const commentToBeLiked = post.comments.find(
      (comment) => comment._id == req.query.id
    );
    console.log(commentToBeLiked);

    commentToBeLiked.likes.push(like);
    commentToBeLiked.save();
    post.save();

    res.status(200).json({ success: true, message: 'Comment liked!' });
    return;
  });
};

exports.deleteLikeUnlikeComment = (req, res, next) => {
  Post.findByIdAndUpdate(req.query.postId).then((post) => {
    if (!post) {
      res.status(400).json({ success: false, message: 'Post not found' });
      return;
    }

    const comment = post.comments.find(
      (comment) => comment._id == req.query.id
    );
    console.log(comment);
    const commentToBeUnliked = comment.likes.find(
      (like) => like.user == loggedUserId
    );
    console.log(commentToBeUnliked);

    commentToBeUnliked.remove();
    post.save();
    console.log(post.comments);

    res.status(200).json({ success: true, message: 'Comment unliked!' });
    return;
  });
};
