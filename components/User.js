/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

function User({
  image,
  name,
  email,
  lastLogin,
}) {
  return (
    <div>
      <img src={image} alt={name} />
      <h1>{ name }</h1>
      <h2>{email}</h2>
      <h3>{lastLogin}</h3>
    </div>
  );
}

User.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  lastLogin: PropTypes.string,
};

User.defaultProps = {
  image: 'https://i1.sndcdn.com/avatars-7zyJqb8d6yycCtdL-ViuJng-t500x500.jpg',
  name: 'Mmmmm',
  email: 'mmmmm@gmail.com',
  lastLogin: '2022-08-29',
};

export default User;
