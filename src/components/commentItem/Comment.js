import React from "react";

import './Comment.css';

export default function Comment({commentEmail, commentBody}) {
    return (
        <article className="comment">
            <h4 className="comment__author">{commentEmail}</h4>
            <p className="comment__body">
                {commentBody}
            </p>
        </article>
    );
}