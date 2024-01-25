// Create web server

// Import modules

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Routes

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.send('error: ' + err);
        });
});

// Get comment by id
router.get('/:id', (req, res) => {
    Comment.findByPk(req.params.id)
        .then(comment => {
            if (comment) {
                res.json(comment);
            } else {
                res.send('Comment does not exist');
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        });
});

// Add a comment
router.post('/', (req, res) => {
    if (!req.body.comment) {
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    } else {
        Comment.create(req.body)
            .then(() => {
                res.send('Comment Added!');
            })
            .catch(err => {
                res.send('error: ' + err);
            });
    }
});

// Delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send('Comment Deleted!');
        })
        .catch(err => {
            res.send('error: ' + err);
        });
});

// Update a comment
router.put('/:id', (req, res) => {
    if (!req.body.comment) {
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    } else {
        Comment.update(
            { comment: req.body.comment },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send('Comment Updated!');
            })
            .error(err => res.send(err))
            .catch(err => {
                res.send('error: ' + err);
            });
    }
});

// Export module

module.exports = router;
