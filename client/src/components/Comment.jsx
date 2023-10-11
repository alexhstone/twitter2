import {React, useState, useEffect} from 'react';


const Comment = (comment) => {

    return (
        <div className="comment">
            <p>{comment.comment}</p>
            <button>respond</button>
        </div>
    )
}