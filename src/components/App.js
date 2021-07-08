import React, {Component} from "react";

import './App.css';

import SearchForm from "./searchForm";

import JSONPlaceholder from "../services/jsonplaceholder";
import NewsItem from "./newsItem";
import Overlay from "./overlay";
import Modal from "./modal";

export default class App extends Component {
    db = new JSONPlaceholder();

    state = {
        postList: [],
        isShowModal: false,
        postData: []
    }

    componentDidMount() {
        this.setPostList();
    }

    setPostList = async () => {
        try {
            const data = await this.db.getAllPosts();
            this.setState({
                postList: data
            });
        } catch (e) {
            console.error(e);
        }
    }

    showModalHandler = ([postId, postTitle, postBody]) => {
        return (
            <Overlay>
                <Modal
                    postId={postId}
                    postTitle={postTitle}
                    postBody={postBody}
                    isShowFullContent={true}
                    closeModalHandler={() => this.setShowModal()}
                />
            </Overlay>
        );
    }

    setShowModal = (postData) => {
        this.setState({
            postData
        })
        this.setState(({isShowModal}) => ({
            isShowModal: !isShowModal,
        }));

    }

    render() {
        const {postList, isShowModal, postData} = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <h1>News lenta</h1>
                    <SearchForm/>
                    <div className="grid-container">
                        {postList.map(({id, title, body}) => {
                            return (
                                <div
                                    key={id}
                                    onClick={() => {
                                        this.setShowModal([id, title, body])
                                    }}
                                >
                                    <NewsItem
                                        postId={id}
                                        postTitle={title}
                                        postBody={body}
                                        isShowFullContent={false}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {isShowModal && this.showModalHandler(postData)}
            </React.Fragment>
        );
    }
}



