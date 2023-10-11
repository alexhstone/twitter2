import {React, useState, useEffect} from 'react';
import Comment from './Comment';


const fetchComments = async (id) => {
    await fetch(`localhost:3030/api/comments/employee/${id}`)
    .then(res => res.json())

}

const Home = () => {
    
    const [employeeComments, setEmployeeComments] = useState([]);
    const [managerComments, setManagerComments] = useState([]);
    
    const fetchComments = async (id) => {
        await fetch(`http://localhost:3030/api/comments/employee/${id}`)
        .then(res => res.json())
        .then(comments => setEmployeeComments(comments))

        await fetch(`http://localhost:3030/api/comments/manager/${id}`)
        .then(res => res.json())
        .then(comments => setManagerComments(comments))
    }

    useEffect(() => { 
        fetchComments("zzz9969")
    },[])

    return (
        <div>
           <div>
            <h2>Comments FROM me</h2>
            {employeeComments.length && employeeComments.map(comment => <Comment comment={comment} key={comment?._id} />)}
           </div>
           <div>
            <h2>Comments TO me</h2>
            {managerComments.length && managerComments.map(comment => <Comment comment={comment} key={comment?._id} />)}
           </div>
        </div>
    )
}


export default Home;