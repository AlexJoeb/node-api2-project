// * Express router.
const router = require('express').Router();

// * Database file.
const db = require('../data/db');


// * -> GET -> `/api/posts` -> Returns all posts.
router.get('/', (req, res) => {
    return db.find()
        .then((resp) => {
            console.log(resp);
            return res.status(200).json({ message: `Here is all of the posts.`, data: resp });
        }).catch(error => {
            console.error(error);
            return res.status(500).json({ message: `The posts information could not be retrieved.` });
        })
})

// * -> GET -> `/api/posts/:id` -> Return a singular post by ID.
router.get(`/:id`, (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(resp => {
            if (!resp.length) {
                // * No such post with given id.
                return res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                return res.status(200).json({ message: `Here is the post with an ID of ${id}.`, data: resp[0] })
            }
        }).catch(error => {
            res.status(500).json({ message: "The post information could not be retrieved." });
        })
})

// * -> GET -> `/api/posts/:id/comments` -> Return a singular post's comments by ID.
router.get(`/:id/comments`, (req, res) => {
    const id = parseInt(req.params.id);
    db.findPostComments(id)
        .then(resp => {
            if (!resp.length) {
                // * No such post with given id.
                return res.status(404).json({ message: `The post with ID ${id} does not have comments (or the post does not exist).` })
            } else {
                return res.status(200).json({ message: `Here is the post's comments with an ID of ${id}.`, data: resp })
            }
        }).catch(error => {
            res.status(500).json({ message: "The post information could not be retrieved." });
        })
})

// * -> POST -> `/api/posts` -> Inserts a post to the database.
router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) return res.status(400).json({ message: "Please provide `title` and `contents` for the post." });

    db.insert({ title, contents })
        .then(resp => {
            return res.status(201).json({ message: "Inserted post.", data: resp });
        }).catch(error => {
            return res.status(500).json({ message: "Could not insert post." });
        })
})

// * -> POST -> `/api/posts/:id/comments` -> Creates a comment for the post with the specified id using information sent inside of the `request body`. 
router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    const post_id = parseInt(req.params.id);

    if (!text) return res.status(400).json({ message: "Please provide `text` for the comment." });

    db.insertComment({
        text,
        post_id
    })
    .then(resp => {
        return res.status(201).json({ message: "Inserted comment into post.", data: resp });
    }).catch(error => {
        return res.status(500).json({ message: "Could not insert comment into post." });
    })
})

module.exports = router;