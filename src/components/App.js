import React, {Component} from "react";

import './App.css';

import SearchForm from "./searchForm";

import JSONPlaceholder from "../services/jsonplaceholder";
import NewsItem from "./newsItem";

export default class App extends Component {
    db = new JSONPlaceholder();

    state = {
        postList: []
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

    render() {
        const {postList} = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <h1>News lenta</h1>
                    <SearchForm/>
                    <div className="grid-container">
                        {postList.map(({id, title, body}) => {
                            return (
                                <NewsItem
                                    key={id}
                                    postId={id}
                                    postTitle={title}
                                    postBody={body}
                                    isShowFullContent={false}
                                />
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}



