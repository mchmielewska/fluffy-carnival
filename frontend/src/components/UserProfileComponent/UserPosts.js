import React from 'react';
import SinglePostCard from '../PostCardComponent/SinglePostCard';
import { MetroSpinner } from 'react-spinners-kit';

const UserPosts = (props) => {
  const loading = props.loading;
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
          classList: 'col single-post-card',
        };
        return <SinglePostCard {...props} key={post.id} />;
      })
  ) : (
    <div className="center">No posts found</div>
  );

  const element =
    posts.length && !loading ? (
      <div className="col m12">{postList}</div>
    ) : (
      <div className="center spinner col m12">
        <MetroSpinner size={50} color="#CCCCCC" loading={loading} />
      </div>
    );

  return element;
};

export default UserPosts;
