import React, {Component} from "react";

import './App.css';

import PostItem from "./postItem";
import Comment from "./commentItem";
import SearchForm from "./searchForm";

import JSONPlaceholder from "../services/jsonplaceholder";

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
                                <div key={id} className="news-item">
                                    <PostItem
                                        postTitle={title}
                                        postBody={body}
                                    />
                                    <Comment/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}



