import React from 'react';
import SinglePostCard from './SinglePostCard';

const UserPosts = (props) => {
  const posts = props.posts;
  const users = props.users;
  const likes = props.likes;
  const currentUser = props.currentUser;

  const postList = posts.length ? (
    posts
      .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
      .map((post) => {
        const props = {
          post: post,
          users: users,
          likes: likes,
          currentUser: currentUser,
          classList: 'col s6',
        };
        return <SinglePostCard {...props} key={post.id} />;
      })
  ) : (
    <div className="center">No posts found</div>
  );

  return <div className="col m9">{postList}</div>;
};

export default UserPosts;
