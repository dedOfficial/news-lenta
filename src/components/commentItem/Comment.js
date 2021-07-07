import React from "react";

import './Comment.css';

export default function Comment() {
    return (
        <article className="comment">
            <h4 className="comment__author">example_user@mail.com</h4>
            <p className="comment__body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt est expedita labore odio, praesentium
                temporibus ut veniam. Aperiam commodi consequatur culpa cum deserunt dicta eaque et, eum illo minima
                veniam?
            </p>
        </article>
    );
}