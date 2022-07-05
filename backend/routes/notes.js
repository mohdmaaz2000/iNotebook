const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const route = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1 : Code to get all the notes using get method 
route.get('/fetchAll', fetchUser, async (req, res) => {
    try {

        let mynotes = await Notes.find({ user: req.user.id });
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

// Route 3 : Code to update a note using put 
route.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a new note 

    try {
        let newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        // Find the note to updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes Not found");
        }

        // Checking if the user has the permission to update the notes or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("You dont have the permission to update this note");
        }

        // Updating the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).send("Internal error ocurred");
    }
});

// Route 4 : Code to delete the notes using delete
route.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Checking if the note is present or not
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Notes not found");
        }

        // Checking if the user has the permision to delete the notes or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        // Deleting the note if user has the permission
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send(`Notes with id ${req.params.id} has been deleted successfully`);
    } catch (error) {
        res.status(500).send("Internal error ocurred");
    }
});


module.exports = route;