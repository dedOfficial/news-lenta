const express = require('express');
const cors = require('cors');
const path = require('path');
const log = require('./libs/log')(module);
const bodyParser = require('body-parser');

const PostModel = require('./libs/mongoose').PostModel;
const PhotoModel = require('./libs/mongoose').PhotoModel;
const CommentModel = require('./libs/mongoose').CommentModel;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const handleFindSaveData = (req, res, err, data) => {
    if (!data) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
    }
    if(!err) return res.send(data);
    else {
        res.statusCode = 500;
        log.error(`Internal error(${res.statusCode}): ${err.message}`);
        return res.send({ error: 'Server error' });
    }
}

// ############################## GET ###################################
app.get('/api', (req, res) => {
    res.send('API is running');
});

app.get('/api/posts', (req, res) => {
    return PostModel.find((err, posts) => {
        if(!err) return res.send(posts);
        else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    })
});

app.get('/api/posts/:id', (req, res) => {
    return PostModel.find({id: req.params.id}, (err, data) => handleFindSaveData(req, res, err, data));
});

app.get('/api/photos', (req, res) => {
    return PhotoModel.find((err, photos) => {
        if(!err) return res.send(photos);
        else {
            res.statusCode = 500;
            log.error(`Internal error(${res.statusCode}): ${err.message}`);
            return res.send({ error: 'Server error' });
        }
    })
});

app.get('/api/photos/:id', (req, res) => {
    return PhotoModel.find({id: req.params.id}, (err, data) => handleFindSaveData(req, res, err, data));
});

app.get('/api/comments/:postId', (req, res) => {
    return CommentModel.find({postId: req.params.postId}, (err, data) => handleFindSaveData(req, res, err, data));
});

// ################################ POST ######################################

app.post('/api/posts', (req, res) => {
    const post = new PostModel(req.body);
    post.save((err, data) => handleFindSaveData(req, res, err, data));
});

app.post('/api/photos', (req, res) => {
    const photo = new PhotoModel(req.body);
    photo.save((err, data) => handleFindSaveData(req, res, err, data));
});

app.post('/api/comments', (req, res) => {
    const comment = new CommentModel(req.body);
    comment.save((err, data) => handleFindSaveData(req, res, err, data));
});

// ############################## DELETE #########################################

app.delete('/api/posts/:id', (req, res) => {
    PostModel.remove({id: req.params.id}, (err, data) => handleFindSaveData(req, res, err, data));
})

// ############################## Listening etc... ###################################

app.use((req, res, next) => {
    res.status(404);
    log.debug('Not found URL: ' + req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    log.error(`Internal error(${res.statusCode}): ${err.message}`);
    res.send({ error: err.message });
    return;
});

app.listen(3001, () => {
    log.info('Express server listening on port 3001');
});





