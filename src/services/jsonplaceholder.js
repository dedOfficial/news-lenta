export default class JSONPlaceholder {
    #apiBase = 'https://jsonplaceholder.typicode.com/';

    #getResources = async (page = '') => {
        const url = this.#apiBase + page;
        const res = await fetch(url);
        return await res.json();
    }

    getAllPosts = async (pageNumber) => {
        const data = await this.#getResources('posts');
        return data.map(this.#transformPostData);
    }

    getPost = async (id) => {
        const post = await this.#getResources(`posts/${id}`)
        return this.#transformPostData(post);
    }

    getPhoto = async (id) => {
        const photo = await this.#getResources(`photos/${id}`)
        return this.#transformPhotoData(photo);
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

    #transformPhotoData = ({thumbnailUrl, url}) => {
        return {thumbnailUrl, url};
    }
}