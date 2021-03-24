//const validator = require('validator');
var notes=require('./notes.js');
const yargs=require('yargs');
const chalk=require('chalk');

//customize your version
yargs.version('1.1.0')

//create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder:{
    title: {
      describe:'Note title',
      demandOption: true,
      type: 'string'
    },
    body:{
      describe:'Note body',
      demandOption:true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title,argv.body);
  }
})

//create remove command
yargs.command({
  command:'remove',
  describe:'Remove a note',
  builder:{
    title:{
      describe:'Remove Note',
      demandOption:true,
      type:'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title);
  }
})

//create list command
yargs.command({
  command:'list',
  describe:'List all note',
  handler(){
    notes.listNotes();
  }
})

//create read command
yargs.command({
  command:'read',
  describe:'read a note',
  builder:{
    title:{
      describe:'read Notes',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.readNotes(argv.title);
  }
})
//console.log(process.argv);

//This is required since when we call argv on yargs it is going
//to parse and print it
//console.log(yargs.argv)
//but if you dont want to print but parse it we can customize
yargs.parse()
