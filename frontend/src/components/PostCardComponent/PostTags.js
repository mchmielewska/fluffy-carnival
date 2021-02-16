import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostTags extends Component {
  render() {
    let tagsArray = [];
    const postTags = this.props.tags;

    const styledTags = (tags) => {
      if (tags.length !== 0) {
        for (let i in tags) {
          if (postTags[i].includes(',')) {
            tagsArray.push(tags[i].split(','));
          } else if (postTags[i] === '') {
            return;
          } else {
            tagsArray.push(tags[i]);
          }
          tagsArray = tagsArray.flat();
        }
        const tagsElement = tagsArray.length
          ? tagsArray.map((tag) => {
              return (
                <span className="single-tag" key={Math.random()}>
                  <Link to={'/tags/' + tag}>{tag}</Link>
                </span>
              );
            })
          : null;
        return tagsElement;
      }
    };

    return (
      <div className="row tags">
        <div className="user-details">{styledTags(postTags)}</div>
      </div>
    );
  }
}

export default PostTags;
