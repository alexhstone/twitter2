import {React, useState, useEffect} from 'react';
import Comment from './Comment';


const Comments = ({comments, sync}) => {


    return (
        
            <div className="Comments">
                {comments.length && comments.map(comment => <Comment comment={comment} key={comment?._id} sync={sync} />)}
            </div>
           
    )
}

export default Comments;