import React, {Component} from "react";

import './NewsItem.css';
import PostItem from "../postItem";
import Comment from "../commentItem";
import JSONPlaceholder from "../../services/jsonplaceholder";
import PropTypes from "prop-types";

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
        commentsList: []
    }

    componentDidMount() {
        this.setCommentsList();
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

    createCommentsContent = (flag) => {
        const {commentsList} = this.state;
        const {query} = this.props
        if (flag) {
            return commentsList.map(({id, email, body}) => (
                <Comment key={id} commentEmail={email} commentBody={body} query={query}/>
            ));
        } else {
            const {email, body} = commentsList[commentsList.length - 1];
            return <Comment commentEmail={email} commentBody={body} query={query}/>
        }
    }

    render() {
        const {postTitle, postBody, isShowFullContent, query} = this.props;
        const {commentsList} = this.state;

        return (
            <div className="news-item">
                <PostItem
                    postTitle={postTitle}
                    postBody={postBody}
                    commentsCount={commentsList.length}
                    query={query}
                />
                {commentsList.length ? this.createCommentsContent(isShowFullContent) : "Загрузка..."}
            </div>
        );
    }
}