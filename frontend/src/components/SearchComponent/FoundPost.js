import React from 'react';
import { Link } from 'react-router-dom';
import Author from '../Author';
import { shortenDescription, readMore } from '../../utils/postUtils';
import PostDetails from '../PostCardComponent/PostDetails';

const FoundPost = (props) => {
  const authorProps = {
    users: props.users,
    post: props.post,
    class: 'm1',
  };
  const post = props.post;

  return (
    <div className="col search-item">
      <div className="post card">
        <div className="card-content row">
          <div className="post-header left-align col m10">
            <Author {...authorProps} />
          </div>
        </div>
        <div className="card-content text search">
          <Link to={'/posts/' + post.id}>
            <h6 className="card-title">{post.title}</h6>
          </Link>
          <p className="description">
            {shortenDescription(post.description, 300)}
          </p>
          <p className="center-align">{readMore(post, 300)}</p>
        </div>
        <PostDetails {...post} />
      </div>
    </div>
  );
};

export default FoundPost;
