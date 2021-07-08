import React from "react";

import './Modal.css';
import NewsItem from "../newsItem";

export default function Modal(props) {
    const {closeModalHandler, ...newsItemProps} = props;

    return (
        <section className="modal">
            <div
                className="modal__close"
                onClick={closeModalHandler}
            >&times;</div>
            <NewsItem
                {...newsItemProps}
            />
        </section>
    );
}