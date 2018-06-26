const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res) => {
    db.Blog
        .findAll()
        .then(blogs => (
            res.status(200).json(blogs)
        ))
        .catch(err => res.status(404)
        .send('error, failed GET request'));
});

router.get('/featured', (req, res) => {
    db.Blog
        .findAll({ where: { featured: true } })
        .then(blogs => {
            if (!blogs) res.status(404).send();
            res.status(200).json(blogs)
        })
            .catch(err => res.status(404)
                .send('error, failed GET request'));
});


router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.Blog
        .findById(id)
            .then(blogs => (
                blogs ?
                    res.status(200).json(blogs) :
                    res.status(404).send('invalid blogId')
        ))
        .catch(err => res.status(404)
            .send('error, failed GET request'));
});

router.post('/', (req, res) => {
    let newBlog = req.body;
    newBlog.authorId = req.query.authorId;
    // console.log('new blog text', newBlog);
    db.Blog.create(newBlog)
        .then(blogs => (
            res.status(201).json(blogs)
        ))
        .catch(err => res.status(500).send('failed POST request'));
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    db.Blog.update(req.body, { where: { id: id } })
        .then(blogs => (
            res.status(204).json(blogs)
        ))
        .catch(err => res.status(500).send('error, failed PUT request'));
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.Blog.destroy( { where: { id: id } } )
        .then(blogs => (
            res.status(200).json(blogs)
        ))
        .catch(err => res.status(500).send('error, failed DELETE request'));
});

module.exports = router;
