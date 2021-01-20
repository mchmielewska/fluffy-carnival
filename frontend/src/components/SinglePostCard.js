import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostDetails from './PostDetails';
import PostTags from './PostTags';
import { shortenDescription, readMore } from '../utils/postUtils';
import PostCardAuthor from './PostCardAuthor';
import LikesForPost from './LikesForPost';
import PostImage from './PostImage';

class SinglePostCard extends Component {
  render() {
    const post = this.props.post;
    const classList = this.props.classList;
    const likesProps = {
      id: post.id,
    };

    return (
      <div className={classList}>
        <div className="post card">
          <div className="card-content row">
            <PostCardAuthor {...this.props} />
            <LikesForPost {...likesProps} />
          </div>
          <PostImage {...this.props} />
          <PostTags {...post} />
          <div className="card-content text">
            <Link to={'/posts/' + post.id}>
              <h6 className="card-title">{post.title}</h6>
            </Link>
            <p className="description">
              {shortenDescription(post.description, 100)}
            </p>
            <p className="center-align">{readMore(post, 100)}</p>
          </div>
          <PostDetails {...post} />
        </div>
      </div>
    );
  }
}

export default SinglePostCard;
