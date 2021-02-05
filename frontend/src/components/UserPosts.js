import React from 'react';
import SinglePostCard from './SinglePostCard';
import { MetroSpinner } from 'react-spinners-kit';

const UserPosts = (props) => {
  const loading = props.loading;
  const posts = props.posts;
  const users = props.users;
  const likes = props.likes;
  const currentUser = props.currentUser;
  console.log(loading)

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

  const element =
    posts.length && !loading ? (
      <div className="col m9">{postList}</div>
    ) : (
      <div className="center spinner col m9">
        <MetroSpinner size={50} color="#CCCCCC" loading={loading} />
      </div>
    );

  return element;
};

export default UserPosts;
