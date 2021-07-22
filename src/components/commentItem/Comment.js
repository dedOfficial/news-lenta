import React from "react";

import './Comment.css';
import highlightFiltered from "../../services/highlight";
import PropTypes from "prop-types";
import Button from "../button";
import JSONPlaceholder from "../../services/jsonplaceholder";

export default function Comment({commentEmail, commentBody, query, isShowFullContent, commentId, updateCommentsList}) {


    return (
        <article className="comment">
            <h4 className="comment__author">{highlightFiltered(query, commentEmail)}</h4>
            <p className="comment__body">
                {highlightFiltered(query, commentBody)}
            </p>
            {isShowFullContent && <Button text="Delete Comment"
                                          handleClick={async () => {await deleteComment(commentId, updateCommentsList)}}/>}
        </article>
    );
}

const db = new JSONPlaceholder();

async function deleteComment(id, cb) {
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm('Are you sure?');
    try {
        if (isDelete) {
            await db.deleteComment(id);
            await cb();
        }
    } catch (e) {
        console.error(e)
    }
}
Comment.propTypes = {
    commentEmail: PropTypes.string,
    commentBody: PropTypes.string,
    query: PropTypes.string
}