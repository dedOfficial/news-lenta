import React from "react";

import './Modal.css';
import NewsItem from "../newsItem";
import PropTypes from "prop-types";

export default function Modal(props) {
    const {closeModalHandler,updatePostList, ...newsItemProps} = props;

    return (
        <section className="modal">
            <div
                className="modal__close"
                onClick={closeModalHandler}
            >&times;</div>
            <NewsItem
                {...newsItemProps}
                updatePostList={async () => await updatePostList()}
            />
        </section>
    );
}
Modal.propTypes = {
    postId: PropTypes.number,
    postTitle: PropTypes.string,
    postBody: PropTypes.string,
    isShowFullContent: PropTypes.bool,
    closeModalHandler: PropTypes.func
}
Modal.defaultProps = {
    isShowFullContent: true
}