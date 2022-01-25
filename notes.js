'use strict!';
const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...';
};

const addNotes = (title, body) => {
    const notes = loadNotes();

    const duplicate = notes.find(note => note.title === title);


    if (!duplicate) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Note added!"));
    }
    else {
        console.log(chalk.red.inverse(`Note "${title}" already exists!`))
    }

};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());     // it is directly reaturning the parsed note array
    }
    catch (e) {
        return [];
    }

};


const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length === filteredNotes.length) {
        console.log(chalk.red.inverse(`${title} doesn't exist!`));
    }
    else {
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse(`${title} removed!`));
    }

};

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length === 0) {
        console.log(chalk.red.inverse("NO Notes!"))
    }
    else {
        let cnt = 1;
        console.log(chalk.whiteBright.inverse("Your notes"));
        notes.forEach(element => {
            console.log(`${cnt}. ${element.title}`);
            cnt++;
        });
    }

};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(x => x.title === title);

    if (!note) {
        console.log(chalk.red.inverse(`${title} not found!`))
    }
    else {
        console.log(chalk.inverse.white(note.title));
        console.log(note.body);
    }
};

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};