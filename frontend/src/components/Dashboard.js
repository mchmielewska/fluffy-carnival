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

        function getAuthor(users, post) {
            for (let i=0; i < users.length; i++) {
                if (users[i]._id === post.authorId) {
                    const author = 
                    <div>
                        <Link to={'/users/' + users[i]._id}>
                            <p className="bold">{ users[i].name } { users[i].surname }</p>
                        </Link>
                        <p>{ users[i].city }</p>
                    </div>

                    return author 
                }
            }
        }

        const postList = posts.length ? (
            (posts.sort((a, b) => (a.publishDate < b.publishDate) ? 1 : -1)).map(post => {
                return (
                    <div className="col m4 s6" key={post.id}>
                        <div className="post card" >
                            <div className="card-content row">
                                <div className="user-details left-align col m6">
                                    {getAuthor(users, post)}
                                </div>
                                <div className="col m6 right-align">
                                    <span title={privacyLevelIcon(post.privacyLevel)}><i className="small material-icons">{privacyLevelIcon(post.privacyLevel)}</i></span>
                                </div>
                            </div>
                            <div className="card-image">
                                <Link to={'/posts/' + post.id}>
                                    <img src="http://placekitten.com/300/300" alt="cat"></img>
                                </Link>
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
                        <div className="row center post-list">
                            { postList }
                        </div>
                    </div>
                    <Sidebar />
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
