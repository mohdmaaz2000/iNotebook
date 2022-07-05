const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const route = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1 : Code to get all the notes using get method
route.get('/fetchAll', fetchUser, async (req, res) => {
    try {

        let mynotes = await Notes.find({user: req.user.id });
        res.json(mynotes);

    } catch (error) {
        res.status(500).send("Internal error ocurred");
    }
});

    // Route 2 : Code to add note using post 
    route.post('/addnotes', fetchUser, [
        body('title', 'Minimum length of name is 3').isLength({ min: 3 }),
        body('description', 'Enter valid description').isLength({ min: 5 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            const note = new Notes({
                user: req.user.id, title, description, tag 
            });
            const savednote = await note.save();
            res.send(savednote);
        } catch (error) {
            res.status(500).send("Internal error ocurred");
        }
    });

    



module.exports = route;