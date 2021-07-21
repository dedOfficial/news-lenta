import React, {Component} from "react";
import Pagination from "rc-pagination";
import './App.css';
import SearchForm from "./searchForm";
import JSONPlaceholder from "../services/jsonplaceholder";
import NewsItem from "./newsItem";
import Overlay from "./overlay";
import Modal from "./modal";
import Button from './button';
import CreateModal from './createModal';

export default class App extends Component {
    db = new JSONPlaceholder();

    state = {
        postList: [],
        isShowPostDetailModal: false,
        isShowCreatePostModal: false,
        postData: [],
        query: '',
        activePage: parseInt(window.localStorage.getItem('activePage')) || 1
    }

    // mounting
    componentDidMount() {
        this.setPostList();
    }

    // state setters
    setActivePage = (pageNum) => {

        window.localStorage.setItem('activePage', pageNum);

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

    setShowPostDetailModal = (postData) => {
        this.setState({
            postData
        })
        this.setState(({isShowPostDetailModal}) => ({
            isShowPostDetailModal: !isShowPostDetailModal,
        }));
    }

    setShowCreatePostModal = () => {
        this.setState( ({ isShowCreatePostModal }) => ({
            isShowCreatePostModal: !isShowCreatePostModal
        }) );
    }

    toggleDocumentOverflow = () => {
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    // form handler
    searchHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let query = Object.fromEntries(formData.entries()).search;
        this.setQuery(
            query
                .replace(/^[%&',;=?$\x22 ]+/, '')
                .replace(/[%&',;=?$\x22 ]+$/, '')
        );
        this.setActivePage(1);
    }

    postDataHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataObject = Object.fromEntries(formData.entries());
        dataObject.id = this.state.postList.length + 1;
        dataObject.userId = 666;
        const res = await this.db.postPost(dataObject);
        console.log(res);
    }

    // markup renderers
    showModalHandler = ([postId, postTitle, postBody]) => {
        return (
            <Overlay>
                <Modal
                    postId={postId}
                    postTitle={postTitle}
                    postBody={postBody}
                    closeModalHandler={() => this.setShowModal()}
                />
            </Overlay>
        );
    }

    renderNews = () => {
        const {postList, query, activePage} = this.state;
        return postList
            .filter(({title, body}) => title.includes(query) || body.includes(query))
            .map(({id, title, body}, index) => {
                if (index >= activePage * 10 - 10 && index < activePage * 10) {
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
                                query={query}
                            />
                        </div>
                    );
                }
                return null;
            });

    }

    renderPagePanel = (total) => (
        <Pagination
            pageSize={10}
            onChange={this.setActivePage}
            total={total}
            current={this.state.activePage}
            className="page-panel"
            prevIcon="<"
            nextIcon=">"
            jumpPrevIcon="<<"
            jumpNextIcon=">>"
            showTitle={false}
            showQuickJumper={true}
        />
    );

    render() {
        const {isShowPostDetailModal, isShowCreatePostModal, postData, query} = this.state;

        const renderedNews = this.renderNews();

        return (
            <React.Fragment>
                <div className="container">
                    <h1>News lenta</h1>

                    <SearchForm searchHandler={this.searchHandler}/>

                    {this.renderPagePanel(renderedNews.length)}
                    <Button text="Create" handleClick={this.setShowCreatePostModal}/>

                    <div className="grid-container">
                        {renderedNews.length ?
                            renderedNews :
                            (query ? `Не найдено результатов по запросу "${query}"` : "Загрузка...")}
                    </div>

                    {this.renderPagePanel(renderedNews.length)}

                </div>

                {isShowPostDetailModal && this.showModalHandler(postData)}
                {isShowCreatePostModal && (<Overlay> <CreateModal handleSubmit={this.postDataHandler} closeModalHandler={this.setShowCreatePostModal}/> </Overlay>)}
            </React.Fragment>
        );
    }
}



