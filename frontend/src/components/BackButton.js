import React from 'react';

const BackButton = (props) => {
  return (
    <button
      className="nav-link btn btn-primary"
      onClick={() => {
        props.history.goBack();
      }}
    >
      <i className="material-icons left">keyboard_arrow_left</i>
      Back
    </button>
  );
};

export default BackButton;
