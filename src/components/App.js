import React from "react";

import './App.css';

import PostItem from "./postItem";
import Comment from "./commentItem";
import Overlay from "./overlay";
import Modal from "./modal";

function App() {
    const li = [
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>,
        <div className="news-item">
            <PostItem/>
            <Comment/>
        </div>
    ];

    return (
        <React.Fragment>
            <div className="container">
                <h1>News lenta</h1>
                <div className="grid-container">
                    {li}
                </div>
            </div>

            <Overlay>
                <Modal/>
            </Overlay>
        </React.Fragment>
    );
}


export default App;
