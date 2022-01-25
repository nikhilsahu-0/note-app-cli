const chalk = require('chalk');
const yargs = require('yargs');
const { readNote } = require('./notes.js');
const notes = require('./notes.js');


// Customize yargs version
yargs.version("1.2.0");



//add
yargs.command({
    command: "add",
    describe: "adds a new note",
    builder: {                              //builder property provides argument fascility for a command
        title: {
            describe: 'title of note',
            demandOption: true,             // this make sure that the argument is provided , by default this option is false.
            type: 'string'                //if dont mention this and if we pass the --title without any value it will store it as a boolean value
        },
        body: {
            describe: 'body of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {              // handler function exicutes when ever the command is used
        notes.addNotes(argv.title, argv.body);
    }
});

//remove
yargs.command({
    command: "remove",
    describe: "removes a note.",
    builder: {
        title: {
            describe: 'title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
});

//list
yargs.command({
    command: "list",
    describe: "list all the note.",
    handler: function () {
        notes.listNotes();
    }
});

//read
yargs.command({
    command: "read",
    describe: "read a selected note.",
    builder: {
        title: {
            discribe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        readNote(argv.title);
    }
});


yargs.argv;  // this is necessary , by reading this value we are letting yargs to get to know that we need its parsing 
                // by removing the yargs wont work as expected
                // some alternates may be yargs.parse();