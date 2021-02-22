import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/likesActions';
import Username from './Username';

class LikesForPost extends Component {
  render() {
    const allLikes = this.props.likes;
    const currentUser = this.props.currentUser;
    const users = this.props.users;
    const id = this.props.id;
    const props = this.props;

    const handleLike = (e, id) => {
      e.preventDefault();
      this.props.addLike(id);
    };

    const handleUnlike = (e, id) => {
      e.preventDefault();
      this.props.removeLike(id);
    };

    const getUserName = (users, id, props) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === id) {
          return <Username users={props.users} id={id} />;
        }
      }
    };

    const showLikes = (e, id) => {
      e.preventDefault();

      const divToShow = document.getElementById(id);
      // showDetails determines whether we should toggle current likes panel off, or
      //   whether we should turn the clicked panel on (and hide all the other ones)

      let targetElementVisible = !divToShow.classList.contains('hidden');

      if (targetElementVisible) {
        divToShow.classList.add('hidden');
      } else {
        const allLikesDivs = document.getElementsByClassName('likes-to-show');
        for (let i = 0; i < allLikesDivs.length; i++) {
          if (!allLikesDivs[i].classList.contains('hidden')) {
            allLikesDivs[i].classList.add('hidden');
          }
        }

        divToShow.classList.remove('hidden');
      }
    };

    const likesPanel = (id, props, allLikes, users) => {
      const postLikes = allLikes
        ? allLikes.find((post) => post._id === id)
        : [];
      const totalLikes = postLikes ? postLikes.likes.length : 0;

      const likes = postLikes.likes.map((like) => {
        const user = getUserName(users, like.user, props);
        const userLike = 'like' + Math.random() + like.user;
        return <div key={userLike}>{user}</div>;
      });

      const likesButton = totalLikes ? (
        <div>
          <div className="likes-to-show hidden" id={id}>
            {likes}
          </div>
          <button
            className="likes-panel-button like-button"
            onClick={(e) => showLikes(e, id)}
          >
            {totalLikes}
          </button>
        </div>
      ) : null;

      return likesButton;
    };

    const postLikes = allLikes.find((post) => post._id === id);
    const divToReturn = (postLikes) => {
      if (postLikes) {
        const divId = 'div-' + id;
        for (let i in postLikes.likes) {
          const currentUserId =
            typeof currentUser === 'object' ? currentUser.id : currentUser;
          if (postLikes.likes[i].user === currentUserId) {
            return (
              <div id={divId}>
                <div className="likes-panel">
                  {likesPanel(id, props, allLikes, users)}
                  <button
                    className="like-button liked"
                    onClick={(e) => handleUnlike(e, id)}
                  >
                    <i className="small material-icons red-text">
                      favorite_border
                    </i>
                  </button>
                </div>
              </div>
            );
          }
        }

        return (
          <div id={divId}>
            <div className="likes-panel">
              {likesPanel(id, props, allLikes, users)}
              <button
                className="like-button"
                onClick={(e) => handleLike(e, id)}
              >
                <i className="small material-icons">favorite_border</i>
              </button>
            </div>
          </div>
        );
      } else {
        const divId = 'div-' + id;
        return (
          <div id={divId}>
            <div className="likes-panel">
              {likesPanel(id, props, allLikes, users)}
              <button
                className="like-button"
                onClick={(e) => handleLike(e, id)}
              >
                <i className="small material-icons">favorite_border</i>
              </button>
            </div>
          </div>
        );
      }
    };

    return <div className="col m3 s3 right-align">{divToReturn(postLikes)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    likes: state.likes,
    users: state.users.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (id) => {
      dispatch(addLike(id));
    },
    removeLike: (id) => {
      dispatch(removeLike(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikesForPost);
