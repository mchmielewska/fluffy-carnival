import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postsActions';

class Dashboard extends Component {

    render() {
        this.props.getPosts();
        const posts = this.props.posts;

        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="col s12 m6" key={post.id}>
                        <div className="post card" >
                            <div className="card-image">
                                <img src="https://cataas.com/cat?type=md" alt="cat"></img>
                            </div>
                            <div className="card-content">
                                <Link to={'/posts/' + post.id}>
                                    <span className="card-title teal-text ">{post.title}</span>
                                </Link>
                                <p>{post.description}</p>
                            </div>
                            <div className="card-action">
                            <span className="card-date teal-text">{post.publishDate}</span>
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
            <div className="container home">
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
