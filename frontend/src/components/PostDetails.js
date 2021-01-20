import React from 'react';
import { dateBuilder, privacyLevelIcon } from '../utils/postUtils';

const PostDetails = (props) => {
  const comments = props.comments ? props.comments.length : null;
  return (
    <div className="card-action row">
      <div className="user-details left-align col m9">
        <p className="card-date">{dateBuilder(props.publishDate)}</p>
      </div>
      <div className="col m3 right-align privacy-level">
        <span title="comments" className="post-comments-icons">
          {comments}
          <i className="material-icons">chat_bubble_outline</i>
        </span>
        <span title={privacyLevelIcon(props.privacyLevel)}>
          <i className="material-icons">
            {privacyLevelIcon(props.privacyLevel)}
          </i>
        </span>
      </div>
    </div>
  );
};

export default PostDetails;
