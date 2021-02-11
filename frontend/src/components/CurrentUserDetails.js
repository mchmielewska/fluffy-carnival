import React from 'react';

const CurrentUserDetails = (props) => {
  const currentUser = props.currentUser;
  const friends = props.friends;

  return (
    <div className="user-details profile-data">
      <p className="username">
      {currentUser.user.name} {currentUser.user.surname}
      </p>
      <p>{currentUser.user.city}</p>
      <div className="row center-align">
        <div className="col m6">
          <p>
            <span className="bold">{currentUser.posts.length}</span>
            <br></br>
            <span className="uppercase">posts</span>
          </p>
        </div>
        <div className="col m6">
          <p>
            <span className="bold">{friends.length}</span>
            <br></br>
            <span className="uppercase">friends</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserDetails;
