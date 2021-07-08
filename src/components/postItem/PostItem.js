import React from "react";

import './PostItem.css';
import logo from './speech-bubble.svg';

export default function PostItem({postTitle, postBody, commentsCount}) {

    return (
        <section className="post">
            <header className="post__header">
                <h4 className="post__title">{postTitle || "First Time Post!"}</h4>
            </header>
            <main className="post__body">
                <p className="post__text">
                    {postBody || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut dolor eaque eius, illo minima nobis optio totam? Ad debitis deserunt distinctio error reiciendis tempora tempore. Exercitationem illum nihil veritatis."}
                </p>
            </main>
            <footer className="post__footer">
                <div className="post__statistic">
                    <img src={logo} alt="comments"/>
                    <span>{commentsCount || '23'}</span>
                </div>
            </footer>
        </section>

    );
}