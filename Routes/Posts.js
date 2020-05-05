// * Express router.
const router = require('express').Router();

// * Database file.
const db = require('../data/db');

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

module.exports = router;