import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postsActions';
import { getUsers } from '../actions/usersActions';
import Sidebar from './Sidebar'

class Dashboard extends Component {

    render() {
        this.props.getUsers();
        this.props.getPosts();
        
        const posts = this.props.posts;
        const users = this.props.users;

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

        function profileImage (user) {
            if (user.profileImagePath === undefined) {
                return (
                <img className="responsive-img post-header" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                )} else {
                return (<img className="responsive-img post-header" src={user.profileImagePath} alt="profile"></img>)
                }
        }

        function getAuthor(users, post) {
            for (let i=0; i < users.length; i++) {
                if (users[i]._id === post.authorId) {
                    const author = 
                    <div className="row">
                        <div className="col m2 post-header">
                            { profileImage(users[i])}
                        </div>
                        <div className="col m10">
                            <Link to={'/users/' + users[i]._id}>
                                <p className="bold">{ users[i].name } { users[i].surname }</p>
                            </Link>
                            <p>{ users[i].city }</p>
                        </div>
                    </div>

                    return author 
                }
            }
        }

        function postImage (post) {
            if (post.postImagePath === undefined) {
                return (
                <img className="post-img" src="http://placekitten.com/300/300" alt="post"></img>
                )} else {
                return (<img className="post-img" src={post.postImagePath} alt="post"></img>)
                }
        }

        const postList = posts.length ? (
            (posts.sort((a, b) => (a.publishDate < b.publishDate) ? 1 : -1)).map(post => {
                return (
                    <div className="col m4 s6" key={post.id}>
                        <div className="post card" >
                            <div className="card-content row">
                                <div className="post-header left-align col m10">
                                    {getAuthor(users, post)}
                                </div>
                                <div className="col m2 right-align">
                                    <span><i className="small material-icons">favorite_border</i></span>
                                </div>
                            </div>
                            <div className="card-image">
                                <Link to={'/posts/' + post.id}>
                                    { postImage(post) }
                                </Link>
                            </div>
                            <div className="card-content text">
                                <Link to={'/posts/' + post.id}>
                                    <h6 className="card-title">{post.title}</h6>
                                </Link>
                                    <p className="description">{shortenDescription(post.description)}</p>
                                    <p className="center-align">{readMore(post)}</p>
                            </div>
                            <div className="card-action row">
                            
                                <div className="user-details left-align col m10">
                                    <p className="card-date">{dateBuilder(post.publishDate)}</p>
                                </div>
                                <div className="col m2 right-align privacy-level">
                                    <span title={privacyLevelIcon(post.privacyLevel)}><i className="material-icons">{privacyLevelIcon(post.privacyLevel)}</i></span>
                                </div>
                            
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
                     <Sidebar />
                    <div className="col s10">
                        <div className="row center post-list">
                            { postList }
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        posts: state.posts,
        users: state.users.all }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        },
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
