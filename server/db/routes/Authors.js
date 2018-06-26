const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res) => {
    db.Author
        .findAll()
        .then(authors => (
            res.status(200).json(authors)
        ))
        .catch(err => res.status(404)
            .send('error, failed GET request'));
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    db.Author
        .findById(id)
            .then(authors => {
                authors ?
                    res.status(200).json(authors) :
                    res.status(404).send('invalid authorID')
        })
        .catch(err => res.status(404)
            .send('error, failed GET request'));
});


router.get('/:id/blogs', (req, res) => {
    let id = req.params.id;
    db.Blog
        .findAll({ where: { authorId: id } })
        .then(authors => {
            if (!authors) res.status(404).send();
            console.log(authors);
            res.status(200).json(authors);
        })
        .catch(err => res.status(404)
            .send('error, failed GET request'));
});

router.post('/', (req, res) => {
    db.Author.create(req.body)
        .then(authors => {
            res.status(201).json(authors)
        })
        .catch(err => res.status(500)
            .send('error, failed POST request'))
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    db.Author.update(req.body, { where: { id: id } })
        .then(authors => {
            res.status(204).json(authors);
        })
        .catch(err => res.status(500)
            .send('error, bad PUT request'));
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    db.Author.destroy({ where: { id: id } })
        .then(authors => {
            res.status(200).json(authors);
        })
        .catch(err => res.status(404).send('error, falied DELETE request'));
});

module.exports = router;

