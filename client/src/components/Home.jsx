import {React, useState, useEffect} from 'react';
import Comment from './Comment';
import './Home.css';




const Home = () => {
    const id = "zzz9969";
    const [employeeComments, setEmployeeComments] = useState([]);
    const [managerComments, setManagerComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const postNewComment = async () => {
        //submit our message...
        await fetch(`http://localhost:3030/api/comments/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
               { comment : document.getElementById("comment").value,
                 user_id : id,
                }
            )
        })
        //empty our text input...
        document.getElementById("comment").value = "";
        //reload comments
        fetchComments();
    }

    
    const fetchComments = async () => {
        
        await fetch(`http://localhost:3030/api/comments/employee/${id}`)
        .then(res => res.json())
        .then(comments => setEmployeeComments(comments))

        await fetch(`http://localhost:3030/api/comments/manager/${id}`)
        .then(res => res.json())
        .then(comments => setManagerComments(comments))
    }

    useEffect(() => { 
        fetchComments()
    },[])

    return (
        <div className="container">
            <div className="newComment">
                <h1>Twitter 2</h1>
                <h2>Submit a new comment</h2>
                <input type="text" name="comment" id="comment" onChange={setNewComment} />
                <button onClick={postNewComment}>submit!</button>
            </div>
           <div className="employeeComments">
            <h2>Comments FROM me</h2>
            <div className="commentContainer">
                {employeeComments.length && employeeComments.map(comment => <Comment comment={comment} key={comment?._id} sync={fetchComments} />)}
            </div>
           </div>
           <div className="managerComments">
            <h2>Comments TO me</h2>
            <div className="commentContainer">
                {managerComments.length && managerComments.map(comment => <Comment comment={comment} key={comment?._id} sync={fetchComments} />)}
            </div>
           </div>
        </div>
    )
}


export default Home;