import React, {Component} from "react";

import './NewsItem.css';
import PostItem from "../postItem";
import Comment from "../commentItem";
import JSONPlaceholder from "../../services/jsonplaceholder";

export default class NewsItem extends Component {
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

    commentsMarkup = null

    createCommentsContent = (flag) => {
        const {commentsList} = this.state;
        const {query} = this.props
        if (flag) {
            this.commentsMarkup = commentsList.map(({id, email, body}) => (
                <Comment key={id} commentEmail={email} commentBody={body} query={query}/>
            ));
        } else {
            const {email, body} = commentsList[commentsList.length - 1];
            this.commentsMarkup = <Comment commentEmail={email} commentBody={body} query={query}/>
        }
    }

    render() {
        const {postTitle, postBody, isShowFullContent, query} = this.props;
        const {commentsList} = this.state;

        if (commentsList.length !== 0) {
            this.createCommentsContent(isShowFullContent);
        }

        return (
            <div className="news-item">
                <PostItem
                    postTitle={postTitle}
                    postBody={postBody}
                    commentsCount={commentsList.length}
                    query={query}
                />
                {this.commentsMarkup}
            </div>
        );
    }
}