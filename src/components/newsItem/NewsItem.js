import React, {Component} from "react";

import './NewsItem.css';
import PostItem from "../postItem";
import Comment from "../commentItem";
import JSONPlaceholder from "../../services/jsonplaceholder";
import PropTypes from "prop-types";
import Button from "../button";
import Overlay from "../overlay";
import CreateModal from "../createModal";

export default class NewsItem extends Component {
    static propTypes = {
        postId: PropTypes.number,
        postTitle: PropTypes.string,
        postBody: PropTypes.string,
        isShowFullContent: PropTypes.bool,
        query: PropTypes.string
    }
    static defaultProps = {
        isShowFullContent: false
    }

    db = new JSONPlaceholder();

    state = {
        commentsList: [],
        postPhoto: {},
        isShowCreateModal: false
    }

    componentDidMount() {
        this.setCommentsList();
        this.setPostPhoto();
    }

    setCommentsList = async () => {
        try {
            const data = await this.db.getCommentsByPostId(this.props.postId);
            this.setState({
                commentsList: data
            });
        } catch (e) {
            console.error(e);
        }
    }

    setPostPhoto = async () => {
        try {
            const data = await this.db.getPhoto(this.props.postId);
            this.setState({
                postPhoto: data
            })
        } catch (e) {
            console.error(e)
        }
    }

    deletePost = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isDelete = confirm('Are you sure?');
        try {
            if (isDelete) {
                await this.db.deletePost(this.props.postId);
                window.localStorage.setItem('activePage', '1');
                window.location.reload();
            }
        } catch (e) {
            console.error(e)
        }
    }

    createComment = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataObject = Object.fromEntries(formData.entries());
        dataObject.postId = this.props.postId;
        await this.db.postComment(dataObject);
        await this.setCommentsList(this.props.postId);
        await this.props.updatePostList();
        e.target.reset();
        this.setShowCreateModal();
    }

    createCommentsContent = (flag) => {
        const {commentsList} = this.state;
        const {query} = this.props
        if (flag) {
            return commentsList.map(({_id, email, body}) => (
                <Comment key={_id} commentEmail={email} commentBody={body} query={query}
                         isShowFullContent={this.props.isShowFullContent} commentId={_id}
                        updateCommentsList={async () => {await this.setCommentsList(this.props.postId)}}/>
            ));
        } else {
            const {email, body} = commentsList[commentsList.length - 1];
            return <Comment commentEmail={email} commentBody={body} query={query}/>;
        }
    }

    setShowCreateModal = () => {
        this.setState(({isShowCreateModal}) => ({
            isShowCreateModal: !isShowCreateModal
        }));
    }

    render() {
        const {postTitle, postBody, isShowFullContent, query} = this.props;
        const {commentsList, postPhoto, isShowCreateModal} = this.state;

        const {url, thumbnailUrl} = postPhoto;

        return (

            <div className="news-item">
                {isShowFullContent && <Button text="Delete" handleClick={this.deletePost}/>}
                <PostItem
                    postTitle={postTitle}
                    postBody={postBody}
                    commentsCount={commentsList.length}
                    query={query}
                    postImageURL={isShowFullContent ? url : thumbnailUrl}
                />
                {isShowFullContent && <Button text="New Comment" handleClick={this.setShowCreateModal}/>}
                {commentsList.length ? this.createCommentsContent(isShowFullContent) : ""}


                {isShowCreateModal && <Overlay><CreateModal
                    handleSubmit={this.createComment}
                    closeModalHandler={this.setShowCreateModal}
                    modalTitle="Create New Comment"
                    type="comment"
                /></Overlay>}
            </div>

        );
    }
}