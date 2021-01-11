import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  dateBuilder,
  privacyLevelIcon,
  shortenDescription,
  readMore,
  getAuthor,
} from '../utils/postUtils';
import { userCard } from '../utils/userUtils';
import { inviteFriend } from '../actions/friendsActions';
class Search extends Component {
  render() {
    const posts = this.props.posts;
    const users = this.props.users;
    const usersFound = this.props.usersFound;
    const currentUser = this.props.currentUser.id;

    const friendsList = this.props.friendsList;
    const friendsIds = friendsList.map((el) => el._id);

    const handleInvite = (id) => {
      this.props.inviteFriend(id);
    };

    function sendInvitation(user) {
      if (user._id === currentUser || friendsIds.includes(user._id)) return;

      return (
        <button
          className="action-button"
          onClick={(e) => handleInvite(user._id)}
        >
          <i className="material-icons tiny">add_circle_outline</i> Add to
          friends
        </button>
      );
    }

    const userList = usersFound ? (
      usersFound.map((user) => {
        return userCard(user, sendInvitation);
      })
    ) : (
      <div className="center">No users found</div>
    );

    const postList = posts.length ? (
      posts
        .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
        .map((post) => {
          return (
            <div className="col search-item" key={post.id}>
              <div className="post card">
                <div className="card-content row">
                  <div className="post-header left-align col m10">
                    {getAuthor(users, post, 'm1')}
                  </div>
                </div>
                <div className="card-content text search">
                  <Link to={'/posts/' + post.id}>
                    <h6 className="card-title">{post.title}</h6>
                  </Link>
                  <p className="description">
                    {shortenDescription(post.description, 300)}
                  </p>
                  <p className="center-align">{readMore(post, 300)}</p>
                </div>
                <div className="card-action row">
                  <div className="user-details left-align col m10">
                    <p className="card-date">{dateBuilder(post.publishDate)}</p>
                  </div>
                  <div className="col m2 right-align privacy-level">
                    <span title={privacyLevelIcon(post.privacyLevel)}>
                      <i className="material-icons">
                        {privacyLevelIcon(post.privacyLevel)}
                      </i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
    ) : (
      <div className="center">No posts found</div>
    );

    return (
      <div className="row">
        <Sidebar />
        <div className="col s10">
          <div className="row center user-list">{userList}</div>
          <div className="row center post-list">{postList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.friends.friendsList,
    currentUser: state.auth.user,
    users: state.users.all,
    posts: state.search.posts,
    usersFound: state.search.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inviteFriend: (id) => {
      dispatch(inviteFriend(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
