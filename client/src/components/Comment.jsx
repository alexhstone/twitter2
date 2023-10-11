import {React, useState, useEffect} from 'react';


const Comment = ({comment}) => {

    return (
        <div className="comment">
            <p>{comment?.comment}</p>
            {comment.followups && comment.followups.map((p, i) => <p key={`${p}${i}`}>{p}</p>)}
            <button>respond</button>
        </div>
    )
}

export default Comment;