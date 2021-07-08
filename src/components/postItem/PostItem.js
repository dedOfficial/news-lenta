import React from "react";

import './PostItem.css';
import logo from './speech-bubble.svg';
import highlightFiltered from "../../services/highlight";

export default function PostItem({postTitle, postBody, commentsCount, query}) {

    return (
        <section className="post">
            <header className="post__header">
                <h4 className="post__title">{highlightFiltered(query, postTitle)}</h4>
            </header>
            <main className="post__body">
                <p className="post__text">
                    {highlightFiltered(query, postBody)}
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