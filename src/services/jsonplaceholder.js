export default class JSONPlaceholder {
    #apiBase = 'https://jsonplaceholder.typicode.com/';

    #getResources = async (page = '') => {
        const url = this.#apiBase + page;
        const res = await fetch(url);
        return await res.json();
    }

    getAllPosts = async (pageNumber) => {
        let data = await this.#getResources('posts');
        return data.map(this.#transformPostData);
    }

    getPost = async (id) => {
        const post = await this.#getResources(`posts/${id}`)
        return this.#transformPostData(post);
    }

    getCommentsByPostId = async (postId) => {
        const comments = await this.#getResources(`comments?postId=${postId}`)

        return comments.map(this.#transformCommentData);
    }

    #transformPostData = ({body, id, title}) => {
        return {id, title, body};
    }

    #transformCommentData = ({id, email, body}) => {
        return {id, email, body};
    }
}