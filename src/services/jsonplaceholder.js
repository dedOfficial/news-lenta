export default class JSONPlaceholder {
    #apiBase = 'http://localhost:3001/api/';

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
        const photo = await this.#getResources(`photos/${id}`);
        return this.#transformPhotoData(photo[0]);
    }

    getCommentsByPostId = async (postId) => {
        const comments = await this.#getResources(`comments/${postId}`)

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