import {React, useState, useEffect} from 'react';
import Comments from './Comments';
import './Home.css';




const Home = () => {
    const id = "zzz9969";
    const [employeeComments, setEmployeeComments] = useState([]);
    const [managerComments, setManagerComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [filter, setFilter] = useState("employee");

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
    const handleSelect = (e) => {
        setFilter(e.target.value)
    }

    return (
        
        <div class="Home">
          
            <header className="newComment">
                <h1>Twitter 2</h1>
                <h2>Submit a new comment</h2>
                <div className="input">
                    <input type="text" name="comment" id="comment" onChange={setNewComment} />
                    <button onClick={postNewComment}>submit!</button>
                </div>
            </header>
            <main>
            <select name="filter" id="filter" onChange={e => handleSelect(e)}>
                <option value="employee">comments left by me</option>
                <option value="manager">comments about me</option>
            </select>
           
                <Comments comments={filter == "employee" ? employeeComments : managerComments} sync={fetchComments} />
            </main>
        </div>
    )
}


export default Home;