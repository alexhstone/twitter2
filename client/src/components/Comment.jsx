import {React, useState, useEffect} from 'react';


const Comment = ({comment}) => {

    return (
        <div className="comment">
            <p>{comment?.comment}</p>
            {//comment?.followups.map(p => <p>{p}</p>)
            }
            <button>respond</button>
        </div>
    )
}

export default Comment;