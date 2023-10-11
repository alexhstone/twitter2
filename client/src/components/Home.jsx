import {React, useState, useEffect} from 'react';
import Comment from './Comment';


const fetchComments = async (id) => {
    await fetch(`localhost:3030/api/comments/employee/${id}`)
    .then(res => res.json())

}

const Home = () => {
    
    const [comments, setComments] = useState([]);
    
    const fetchComments = async (id) => {
        await fetch(`http://localhost:3030/api/comments/employee/${id}`)
        .then(res => res.json())
        .then(comments => setComments(comments))
    }

    useEffect(() => { 
        fetchComments("zzz9969")
    },[])

    return (
        <div>
           <div>
            <h2>Comments FROM me</h2>
            {comments.length && comments.map(comment => <Comment comment={comment} key={comment?._id} />)}
           </div>
        </div>
    )
}


export default Home;