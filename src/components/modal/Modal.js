import React from "react";

import './Modal.css';
import PostItem from "../postItem";
import Comment from "../commentItem";

export default function Modal() {
    return (
        <section className="modal">
            <div className="modal__close">&times;</div>
            <article className="modal__posts-wrap">
                <PostItem/>
            </article>
            <article className="modal__comments-wrap">
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </article>
        </section>
    );
}