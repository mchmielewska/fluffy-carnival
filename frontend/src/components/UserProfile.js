import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import SidebarLinks from './SidebarLinks'
import { getCurrentUser, getUsers } from '../actions/usersActions';
import { getPosts } from '../actions/postsActions';

class UserProfile extends Component {
    
    render() {
        this.props.getCurrentUser();
        this.props.getUsers();
        this.props.getPosts();

        const currentUser = this.props.currentUser;

        const getAge = birthDate => Math.floor((new Date() - new Date(this.props.user.birthDate).getTime()) / 3.15576e+10);

        function isCurrentUser (checkedUser) {
            if (checkedUser._id === currentUser.id) {

                return (<Link 
                        className="link" to={ {
                            pathname: `/users/${checkedUser._id}/edit`
                        }}>
                    <i className="material-icons tiny">edit</i>Edit profile</Link>
                )
                
            }
        }

        const user = this.props.user ? ( 
                        <div className="row">
                                <div className="col s12">
                                    <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                                    
                                </div>
                                {isCurrentUser(this.props.user)}
                                <div className="col s12">
                                    <p className="bold">{ this.props.user.name } { this.props.user.surname }</p>
                                    <p>{getAge()}, { this.props.user.city }</p>
                                    <p><span className="bold">{ this.props.user.friends.length }</span>
                                    <br></br><span className="uppercase">friends</span></p>
                                </div>
                        </div>
        ) : (
            <div className="center">
                Loading user data...
            </div>
        )

        const userPosts = this.props.posts;

        function dateBuilder (date) {
            const event = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const newDate = `${event.toLocaleDateString('en-EN', options)} ${event.toLocaleTimeString('en-US', { hour12: false })}`;
            return newDate;
        }

        function privacyLevelIcon (privacyLevel) {
            if (privacyLevel === "public") {
                return "public";
            } else if (privacyLevel === "friendsOnly") {
                return "people";
            } else if (privacyLevel === "private") {
                return "lock";
            }
        }

        function shortenDescription (text) {
            if (text.length > 100) {
                text = text.substring(0,100) + '...';
                return text;
            }
        }

        function readMore(post) {
            if (post.description.length > 100) {
                return <Link to={'/posts/' + post.id}>read more</Link>
            }
        }

        const postList = userPosts.length ? (
            (userPosts.sort((a, b) => (a.publishDate < b.publishDate) ? 1 : -1)).map(post => {
                return (
                    <div className="col s6" key={post.id}>
                        <div className="post card" >
                            <div className="card-content row">
                                <div className="col s12 right-align">
                                    <span title={privacyLevelIcon(post.privacyLevel)}><i className="small material-icons">{privacyLevelIcon(post.privacyLevel)}</i></span>
                                </div>
                            </div>
                            <div className="card-image">
                                <img src="http://placekitten.com/300/300" alt="cat"></img>
                            </div>
                            <div className="card-content">
                                <Link to={'/posts/' + post.id}>
                                    <h6 className="card-title">{post.title}</h6>
                                </Link>
                                    <p className="description">{shortenDescription(post.description)} {readMore(post)}</p>
                            </div>
                            <div className="card-action">
                            <p className="card-date">{dateBuilder(post.publishDate)}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <div className="center">
                No posts found
            </div>
        )

        return (
            <div className="row">
                <div className="col s10">
                    <div className="row profile">
                            <div className="col m2">
                                <Link className="nav-link btn" to="/users"><i className="material-icons left">keyboard_arrow_left</i>Back</Link>
                                
                            </div>
                            <div className="col m2 center">
                                {user}
                            </div>
                            <div className="col m8">
                                {postList}
                            </div>
                    </div>
                    </div>
                <SidebarLinks />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.user_id;
    return {
        currentUser: state.auth.user,
        user: state.users.all.find(user => user._id === id),
        posts: state.posts.filter(post => post.authorId === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    getUsers: () => {
        dispatch(getUsers())
    },
    getPosts: () => {
        dispatch(getPosts())
    },
    getCurrentUser: () => {
        dispatch(getCurrentUser())
    }
}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));