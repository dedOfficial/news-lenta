const express = require('express');
const path = require('path');
const log = require('./libs/log')(module);

const PostModel = require('./libs/mongoose').PostModel;
const PhotoModel = require('./libs/mongoose').PhotoModel;
const CommentModel = require('./libs/mongoose').CommentModel;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const handleFindData = (req, res, err, data) => {
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
    return PostModel.find({id: req.params.id}, (err, data) => handleFindData(req, res, err, data));
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
    return PhotoModel.find({id: req.params.id}, (err, data) => handleFindData(req, res, err, data));
});

app.get('/api/comments/:postId', (req, res) => {
    return CommentModel.find({postId: req.params.postId}, (err, data) => handleFindData(req, res, err, data));
});

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

app.listen(3000, () => {
    log.info('Express server listening on port 3001');
});





