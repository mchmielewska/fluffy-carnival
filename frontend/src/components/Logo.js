import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
    return (
        <Link className="brand-logo" to="/">
        <img
          id="logo"
          src="https://res.cloudinary.com/fluffy-carnival/image/upload/v1612963806/fluffy_z4bue1.png"
          alt="logo"
        ></img>
      </Link>
    )

}

export default Logo;