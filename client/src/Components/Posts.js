import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/posts/`)
            .then(resp => {
                const { data } = resp.data;
                setPosts(data);
            }).catch(error => console.log(error.message));
    }, [])

    const history = useHistory();

    return (
        <div className='posts'>
            {!posts.length && <p>Loading...</p>}
            {
                posts &&
                posts.map(post => {
                    console.log(post);
                    return (
                        <div className='post' onClick={() => history.push(`/${post.id}`)} key={post.id}>
                            <div className="post__content">
                                <h4>{post.contents}</h4>
                                <hr />
                                <p>{post.title}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}