import React from 'react';
import { Link } from 'react-router-dom';

const CurrentUserDetails = (props) => {
  const currentUser = props.currentUser;
  const friends = props.friends;
  const id = props.id;

  console.log(props)

  return (
    <div className="user-details profile-data">
      <p className="username">
        {currentUser.user.name} {currentUser.user.surname}
      </p>
      <p>{currentUser.user.city}</p>
      <div className="row center-align">
        <div className="col m6">
        <Link className="details-link"
            to={{
              pathname: `/users/${id}`,
              state: { from: props.location.pathname },
            }}
          >          <p>
            <span className="bold">{currentUser.posts.length}</span>
            <br></br>
            <span className="uppercase">posts</span>
          </p>
          </Link>

        </div>
        <div className="col m6">
        <Link className="details-link"
            to={{
              pathname: '/friends',
              state: { from: props.location.pathname },
            }}
          >
<p>
            <span className="bold">{friends.length}</span>
            <br></br>
            <span className="uppercase">friends</span>
          </p>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default CurrentUserDetails;
