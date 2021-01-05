import React from 'react';
import { Link } from 'react-router-dom';

export function profileImage(user, className) {
  if (user.profileImagePath === undefined) {
    return (
      <img
        className={className}
        src="https://i.imgur.com/IJMRjcI.png"
        alt="profile"
      ></img>
    );
  } else {
    return (
      <img
        className={className}
        src={user.profileImagePath}
        alt="profile"
      ></img>
    );
  }
}

export function userCard(user, sendInvitation) {
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(user.birthDate).getTime()) / 3.15576e10);

  return (
    <div className="col m3" key={user._id}>
      <div className="card profile-card valign-wrapper">
        {profileImage(user, 'responsive-img')}
        <div className="user-details">
          <Link to={'/users/' + user._id}>
            <p className="bold username">
              {user.name} {user.surname}
            </p>
          </Link>
          <p className="small-text">
            {getAge()}, {user.city}
          </p>
          <div className="friends-counter">
            <span className="bold">{user.friends.length}</span>
            <br></br>
            <span className="uppercase">friends</span>
          </div>
          <div className="action">{sendInvitation(user)}</div>
        </div>
      </div>
    </div>
  );
}
