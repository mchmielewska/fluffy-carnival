import React from 'react';
import { Link } from 'react-router-dom';
import { profileImage } from './userUtils';

export function postImage(post) {
  const id = post.id ? post.id : post._id;
  if (post.postImagePath === undefined) {
    return (
      <div className="image-container">
        <Link to={'/posts/' + id}>
          <img
            className="post-img"
            src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1610371508/sincerely-media-FPrniQ84dEk-unsplash_r2f1bx.jpg"
            alt="post"
          ></img>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="image-container">
        <Link to={'/posts/' + id}>
          <img className="post-img" src={post.postImagePath} alt="post"></img>
        </Link>
      </div>
    );
  }
}

export function singlePostImage(post) {
  if (post.postImagePath === undefined) {
    return (
      <img
        className="post-image"
        src="http://placekitten.com/500/500"
        alt="post"
      ></img>
    );
  } else {
    return (
      <img className="post-image" src={post.postImagePath} alt="post"></img>
    );
  }
}

export function dateBuilder(date) {
  const event = new Date(date);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  };
  const newDate = `${event.toLocaleDateString('en-GB', options)}`;
  return newDate;
}

export function privacyLevelIcon(privacyLevel) {
  if (privacyLevel === 'public') {
    return 'public';
  } else if (privacyLevel === 'friendsOnly') {
    return 'people';
  } else if (privacyLevel === 'private') {
    return 'lock';
  }
}

export function shortenDescription(text, maxLength) {
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
    return text;
  }
}

export function readMore(post, maxLength) {
  if (post.description.length > maxLength) {
    return <Link to={'/posts/' + post.id}>read more</Link>;
  }
}

export function getAuthor(users, post, size = 'm2') {
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === post.authorId || users[i]._id === post.author) {
      const className = `col ${size} post-header`;
      const author = (
        <div className="row">
          <div className={className}>
            {profileImage(users[i], 'responsive-img post-header')}
          </div>
          <div className="col m10">
            <Link to={'/users/' + users[i]._id}>
              <p className="bold">
                {users[i].name} {users[i].surname}
              </p>
            </Link>
            <p>{users[i].city}</p>
          </div>
        </div>
      );

      return author;
    }
  }
}

export function getAuthorForSinglePostPage(users, post) {
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === post.authorId || users[i]._id === post.author) {
      const author = (
        <div>
          <Link to={'/users/' + users[i]._id}>
            {profileImage(users[i], 'responsive-img single-post')}
            <p className="bold">
              {users[i].name} {users[i].surname}
            </p>
          </Link>
        </div>
      );

      return author;
    }
  }
}

export function postTags(post) {
  let tagsArray = [];
  for (let i in post.tags) {
    if (post.tags[i].includes(',')) {
      tagsArray.push(post.tags[i].split(','));
    } else if (post.tags[i] === '') {
      return;
    } else {
      tagsArray.push(post.tags[i]);
    }
    tagsArray = tagsArray.flat();
  }

  const tags = tagsArray
    ? tagsArray.map((tag) => {
        return (
          <span className="single-tag" key={Math.random()}>
            <Link to={'/tags/' + tag}>{tag}</Link>
          </span>
        );
      })
    : null;

  return tags;
}
