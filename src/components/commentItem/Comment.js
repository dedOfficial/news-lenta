import React from "react";

import './Comment.css';
import highlightFiltered from "../../services/highlight";
import PropTypes from "prop-types";

export default function Comment({commentEmail, commentBody, query}) {
    return (
        <article className="comment">
            <h4 className="comment__author">{highlightFiltered(query, commentEmail)}</h4>
            <p className="comment__body">
                {highlightFiltered(query, commentBody)}
            </p>
        </article>
    );
}
Comment.propTypes = {
    commentEmail: PropTypes.string,
    commentBody: PropTypes.string,
    query: PropTypes.string
}