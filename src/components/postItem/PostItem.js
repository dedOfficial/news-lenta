import React from "react";

import './PostItem.css';
import logo from './speech-bubble.svg';

export default function PostItem() {
    return (
        <section className="post">
            <header className="post__header">
                <h4 className="post__title">First Time Post!</h4>
            </header>
            <main className="post__body">
                <p className="post__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deserunt
                    dignissimos distinctio ducimus ipsa, nihil obcaecati placeat reiciendis sint sunt? Alias delectus
                    eligendi fuga illo illum ipsum perferendis vel vero!</p>
            </main>
            <footer className="post__footer">
                <div className="post__statistic">
                    <img src={logo} alt="comments"/>
                    <span>23</span>
                </div>
            </footer>
        </section>

    );
}