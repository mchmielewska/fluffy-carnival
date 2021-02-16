import React from 'react';
import { Link } from 'react-router-dom';

const PostImage = (props) => {
  const post = props.post;
  const id = post.id ? post.id : post._id;

  const image = (post) => {
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
  };

  return <div className="card-image">{image(post)}</div>;
};

export default PostImage;
