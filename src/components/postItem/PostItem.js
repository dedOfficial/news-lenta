import React from "react";

import './PostItem.css';
import logo from './speech-bubble.svg';

export default function PostItem({postTitle, postBody, commentsCount}) {

    return (
        <section className="post">
            <header className="post__header">
                <h4 className="post__title">{postTitle}</h4>
            </header>
            <main className="post__body">
                <p className="post__text">
                    {postBody}
                </p>
            </main>
            <footer className="post__footer">
                <div className="post__statistic">
                    <img src={logo} alt="comments"/>
                    <span>{commentsCount}</span>
                </div>
            </footer>
        </section>

    );
}