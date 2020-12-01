import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/postsActions'
import { getCurrentUser, getUsers } from '../actions/usersActions'

class Post extends Component {

    handleClick = () => {
        console.log(this.props.post.id)
        this.props.deletePost(this.props.post.id);
        this.props.history.push('/posts/');
    }
    
    render() {
        function postActionPanel(userId, postId, handleClick) {
            if (userId !== currentUser.id) 
                return "";
            
            return (
                <div className="right-align">
                    <Link 
                    className="btn" to={ {
                        pathname: `/posts/${postId}/edit`
                    }}>Edit post</Link>
                    <button className="btn" onClick={handleClick}>
                        Delete post
                    </button>
                </div>                
            )
        }
        
        function dateBuilder (date) {
            const event = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const newDate = `${event.toLocaleDateString('en-EN', options)} ${event.toLocaleTimeString('en-US', { hour12: false })}`;
            return newDate;
        }

        function getAuthor(users, post) {
            for (let i=0; i < users.length; i++) {
                if (users[i]._id === post.authorId) {
                    const author = 
                    <div>
                        <Link to={'/users/' + users[i]._id}>
                            <p className="bold">{ users[i].name } { users[i].surname }</p>
                        </Link>
                    </div>

                    return author 
                }
            }
        }

        const currentUser = this.props.currentUser;
        const users = this.props.users;

        const post = this.props.post ? (
            <div>
                <div className="card horizontal">
                <div className="author">
                    <img className="responsive-img" src="https://i.imgur.com/IJMRjcI.png" alt="profile"></img>
                    <p>
                    {getAuthor(users, this.props.post)}
                    </p>
                   
                </div>
                <div className="card-stacked">
                    <h5 className="right-align post-title">{this.props.post.title}</h5>
                    <div className="card-content">
                        <img className="post-image" src="http://placekitten.com/500/500" alt="cat"></img>
                        <p className="post-description">{this.props.post.description}</p>
                    </div>
                    <div className="card-action">
                        <p class="post-date">{dateBuilder(this.props.post.publishDate)}</p>
                    </div>
                </div>
            </div>
            


            </div>
        ) : (
            <div className="center">
                Loading post...
            </div>
        )
    
        return (
            
            <div className="container">
                <div className="edit-links">
                    <Link className="nav-link btn" to="/posts"><i className="material-icons left">keyboard_arrow_left</i>
                        Back
                    </Link>
                    {postActionPanel(this.props.post.authorId, this.props.post.id, this.handleClick)}
                </div>
                {post}
            
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id;
    return {
        currentUser: state.auth.user,
        users: state.users.all,
        post: state.posts.find(post => post.id === id)
}
}

//to change the state
const mapDispatchToProps = (dispatch) => {
return {
        getCurrentUser: () => {
            dispatch(getCurrentUser())
        },
        deletePost: (id) => {
                dispatch(deletePost(id))
        },
        getUsers: () => {
                dispatch(getUsers())
        }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)