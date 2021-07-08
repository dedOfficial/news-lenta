import React, {Component} from "react";

import Pagination from "rc-pagination";

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
        postData: [],
        query: '',
        activePage: 1
    }


    componentDidMount() {
        this.setPostList();
    }

    setActivePage = (pageNum) => {
        this.setState({
            activePage: pageNum
        })
    }

    setPostList = async () => {
        try {
            const data = await this.db.getAllPosts(1);
            this.setState({
                postList: data
            });
        } catch (e) {
            console.error(e);
        }
    }

    setQuery = (newQuery) => {
        this.setState({
            query: newQuery
        })
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
        const {postList, isShowModal, postData, query, activePage} = this.state;

        const renderedNews = postList
            .filter(({title, body}) => title.includes(query) || body.includes(query))
            .map(({id, title, body}) => {
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
                            query={query}
                        />
                    </div>
                );
            });

        return (
            <React.Fragment>
                <div className="container">
                    <h1>News lenta</h1>
                    <SearchForm
                        searchHandler={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const query = Object.fromEntries(formData.entries()).search;
                            this.setQuery(query);
                        }}
                    />
                    <div className="grid-container">
                        {
                            renderedNews.length ?
                                renderedNews :
                                (query ? `Не найдено результатов по запросу "${query}"` : "Загрузка...")
                        }
                    </div>
                    <Pagination
                        pageSize={10}
                        onChange={this.setActivePage}
                        total={postList.length}
                        current={activePage}
                        className="page-panel"
                    />
                </div>
                {isShowModal && this.showModalHandler(postData)}
            </React.Fragment>
        );
    }
}



