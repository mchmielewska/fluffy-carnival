import React from 'react';
import ProfileImage from './ProfileImage';

const Username = (props) => {
  const users = props.users;
  const id = props.id;

  const getUserName = (users, id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        const path = '/users/' + users[i]._id;
        const imageProps = {
          user: users[i],
          class: 'responsive-img post-header',
        };

        const user = (
          <div className="row likes-username">
            <div className="col m2">
              <ProfileImage {...imageProps} />
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
  };

  return getUserName(users, id);
};

export default Username;
