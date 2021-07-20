const mongoose = require('mongoose');
const log = require('./log')(module);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost/newsdb', options);

const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas
const Photo = new Schema({
    albumId: { type: Number, required: false },
    id: { type: Number, required: false },
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});

const Post = new Schema({
    userId: { type: Number, required: false },
    id: { type: Number, required: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
});

const Comment = new Schema({
    postId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true }
});

Comment.static('findByPostId', function(postId) { return this.find({ postId }); });
Post.static('findByIndexId', function(id) { return this.find({ id }); });
Comment.static('findByIndexId', function(id) { return this.find({ id }); });

const PostModel = mongoose.model('Post', Post);
const PhotoModel = mongoose.model('Photo', Photo);
const CommentModel = mongoose.model('Comment', Comment);

module.exports.PostModel = PostModel;
module.exports.PhotoModel = PhotoModel;
module.exports.CommentModel = CommentModel;