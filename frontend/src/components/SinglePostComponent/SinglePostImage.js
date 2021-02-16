import React from 'react';

const SinglePostImage = (props) => {
  const image = (post) => {
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
  };
  return image(props);
};

export default SinglePostImage;
