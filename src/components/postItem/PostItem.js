import React from "react";

import './PostItem.css';
import logo from './speech-bubble.svg';
import highlightFiltered from "../../services/highlight";
import PropTypes from "prop-types";

export default function PostItem({postTitle, postBody, commentsCount, query, postImageURL}) {
    return (
        <section className="post">
            <header className="post__header">
                <h4 className="post__title">{highlightFiltered(query, postTitle)}</h4>
            </header>
            <main className="post__body">
                <p className="post__text">
                    {highlightFiltered(query, postBody)}
                </p>
                <div className="post__image">
                    <img src={postImageURL} alt={postTitle.split(' ')[0]}/>
                </div>
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
PostItem.propTypes = {
    postTitle: PropTypes.string,
    postBody: PropTypes.string,
    commentsCount: PropTypes.number,
    query: PropTypes.string,
    postImageURL: PropTypes.string
}
PostItem.defaultProps = {
    postBody: '***No Text***',
    postImageURL: null
}