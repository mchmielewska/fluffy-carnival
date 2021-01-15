import React from 'react';
import { profileImage } from '../utils/userUtils';

const Username = (props) => {
  const users = props.users;
  const id = props.id;
  function getUserName(users, id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        const path = '/users/' + users[i]._id;
        const user = (
          <div className="row likes-username">
            <div className="col m2">
              {profileImage(users[i], 'responsive-img post-header')}
            </div>
            <div className="col m10">
              <a className="username" href={path}>
                {users[i].name} {users[i].surname}
              </a>
            </div>
          </div>
        );
        return user;
      }
    }
  }

  return getUserName(users, id);
};

export default Username;
