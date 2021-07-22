export default class JSONPlaceholder {
    #apiBase = 'http://localhost:3001/api/';

    #getResources = async (page = '') => {
        const url = this.#apiBase + page;
        const res = await fetch(url);
        return await res.json();
    }

    #postData = async (page = '', data) => {
        const url = this.#apiBase + page;
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetch(url, fetchOptions);
        return await res.json();
    }

    #deleteResources = async (page) => {
        const url = this.#apiBase + page;
        const fetchOptions = {
            method: 'DELETE',
        };
        const res = await fetch(url, fetchOptions);
        return await res.json();
    }

    getAllPosts = async () => {
        const data = await this.#getResources('posts');
        return data.map(this.#transformPostData);
    }

    postPost = async (newPost) => {
        const res = await this.#postData('posts', newPost);
        return res;
    }

    deletePost = async (postId) => {
        const res = await this.#deleteResources(`posts/${postId}`);
        console.log(res);
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

    postComment = async (newComment, postId) => {
        const res = await this.#postData(`comments/${postId}`, newComment);
        return res;
    }

    #transformPostData = ({body, id, title}) => {
        return {id, title, body};
    }

    #transformCommentData = ({_id, email, body}) => {
        return {_id, email, body};
    }

    #transformPhotoData = ({thumbnailUrl, url}) => {
        return {thumbnailUrl, url};
    }
}