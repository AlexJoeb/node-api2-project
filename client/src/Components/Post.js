import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { ReactComponent as Delete } from '../Assets/Delete.svg'
import { ReactComponent as Comment } from '../Assets/Comment.svg'
export default function Post() {

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/posts/${params.id}`)
            .then(resp => {
                const { data } = resp.data;
                setPost(data);
                axios.get(`http://localhost:5001/api/posts/${params.id}/comments`)
                    .then(resp => {
                        const { data } = resp.data;
                        setComments(data);
                    }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
    }, []);

    const handleChange = e => {
        setComment(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!comment) return;
        axios.post(`http://localhost:5001/api/posts/${params.id}/comments`, {
            text: comment,
        })
            .then(resp => {
                axios.get(`http://localhost:5001/api/posts/${params.id}/comments`)
                    .then(resp => {
                        const { data } = resp.data;
                        setComments(data);
                        setComment('');
                    }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
    }

    const handlePostDelete = () => {
        // Send DELETE request.
        // Reroute to '/'
        axios.delete(`http://localhost:5001/api/posts/${params.id}`)
            .then(resp => {
                history.push('/');
            }).catch(error => console.log(error.message));
    }

    return (
        <div>
            {!post && <p>Loading post...</p>}
            {post && <div className='post page'>
                <div className="post__title">
                    <h2>{post.contents}</h2>
                    <p>{post.title}</p>
                </div>
                <div className="post__controls">
                    <Delete onClick={handlePostDelete} className='post__controls--delete' />
                    <Comment className='post__controls--comment' />
                    <span>{comments.length}</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='comment' id='comment' placeholder='Leave a comment...' value={comment} onChange={handleChange} />
                        <button type='submit'>Enter</button>
                    </form>
                </div>
                <div className="post__comments">
                    {
                        comments && comments.map(comment => (
                            <p key={comment.id}>
                                - {comment.text}
                            </p>
                        ))
                    }
                </div>
            </div>}
        </div>
    )
}
