import {React, useState, useEffect} from 'react';




const Comment = ({comment, sync}) => {
    let [message, setMessage] = useState("");

    const submitFollowup = async () => {
        //submit our message...
        console.log(comment)
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
            <p>{comment?._id}</p>
            <p>{comment?.comment}</p>
            {comment.followups && comment.followups.map((p, i) => <p key={`${p}${i}`}>{p}</p>)}
            <div id="message">

            </div>
                <input id={comment._id} type="text" onChange={setMessage} />
                <button onClick={submitFollowup}>respond</button>
        </div>
    )
}

export default Comment;