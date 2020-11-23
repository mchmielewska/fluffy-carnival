import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// import { deletePost } from './actions/postActions'

class Post extends Component {
    // handleClick = () => {
    //     this.props.deletePost(this.props.post.id);
    //     this.props.history.push('/dashboard/');
    // }
    
    render() {
        function dateBuilder (date) {
            const event = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const newDate = `${event.toLocaleDateString('en-EN', options)} ${event.toLocaleTimeString('en-US', { hour12: false })}`;
            return newDate;
        }

        const post = this.props.post ? (
            <div className="card horizontal">
                <div className="card-image">
                   <img src="http://placekitten.com/300/300" alt="cat"></img>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <h4>{this.props.post.title}</h4>
                        <p>{this.props.post.description}</p>
                    </div>
                    <div className="card-action">
                        <p>{dateBuilder(this.props.post.publishDate)}</p>
                    </div>
                </div>

                <div className="center">
                    {/* <button className="btn grey" onClick={this.handleClick}>
                        Delete post
                    </button> */}
                </div>
            </div>
        ) : (
            <div className="center">
                Loading post...
            </div>
        )
    
        return (
            <div className="container">
                {post}
            
            <Link className="nav-link btn" to="/dashboard"><i className="material-icons left">keyboard_arrow_left</i>Back</Link>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id;
    return {
        post: state.posts.find(post => post.id === id)
}
}

//to change the state
const mapDispatchToProps = (dispatch) => {
return {
    // deletePost: (id) => {
    //     dispatch(deletePost(id))
    // }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)