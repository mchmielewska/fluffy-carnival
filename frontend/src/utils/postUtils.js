import React from 'react';
import { Link } from 'react-router-dom';

export function dateBuilder(date) {
  const event = new Date(date);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  };
  const newDate = `${event.toLocaleDateString('en-GB', options)}`;
  return newDate;
}

export function privacyLevelIcon(privacyLevel) {
  if (privacyLevel === 'public') {
    return 'public';
  } else if (privacyLevel === 'friendsOnly') {
    return 'people';
  } else if (privacyLevel === 'private') {
    return 'lock';
  }
}

export function shortenDescription(text, maxLength) {
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
    return text;
  }
}

export function readMore(post, maxLength) {
  if (post.description.length > maxLength) {
    return <Link to={'/posts/' + post.id}>read more</Link>;
  }
}
