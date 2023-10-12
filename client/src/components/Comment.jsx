import {React, useState, useEffect} from 'react';
import './Comment.css';




const Comment = ({comment, sync}) => {
    let [message, setMessage] = useState("");
    let [sentiment, setSentiment] = useState("");

    const getSentiment = async () => {
        fetch('http://localhost:3030/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
               { message : comment.comment,
                })
        }).then(res => res.json())
        .then(sentiment => console.log(sentiment))

    }

    //useEffect(getSentiment[]);


    const submitFollowup = async () => {
        //submit our message...
        await fetch(`http://localhost:3030/api/comments/${comment?._id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
               { "message" : document.getElementById(comment._id).value}
            )
        })
        //empty our text input...
        document.getElementById(comment._id).value = "";
        //reload comments
        sync()
    }

    return (
        <div className="comment">
            <h3>{comment?.comment}</h3>
            {comment.followups && <h4>response:</h4>}
            <div className="followups">
                {comment.followups && comment.followups.map((p, i) => <p key={`${p}${i}`}>{p}</p>)}
            </div>
                <input id={comment._id} type="text" onChange={setMessage} />
                <button onClick={submitFollowup}>respond</button>
                <button onClick={getSentiment}>(Experimental) Analyze Content</button>
        </div>
    )
}

export default Comment;