import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postsActions';

class Dashboard extends Component {

    render() {
        this.props.getPosts();
        const posts = this.props.posts;

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

        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="col s12 m6" key={post.id}>
                        <div className="post card" >
                            <div className="card-image">
                                <img src="http://placekitten.com/300/300" alt="cat"></img>
                            </div>
                            <div className="card-content">
                                <Link to={'/posts/' + post.id}>
                                    <h5 className="card-title teal-text ">{post.title}</h5>
                                </Link>
                                <p>{post.description}</p>
                            </div>
                            <div className="card-action">
                            <p className="card-date teal-text">{dateBuilder(post.publishDate)}</p>
                            <p className="valign-wrapper">
                                <i className="small material-icons">{privacyLevelIcon(post.privacyLevel)}</i>
                            </p>
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
            <div className="container" id="home">
                <div className="row">
                        {postList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {
            dispatch(getPosts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
