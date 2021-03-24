const fs=require('fs');
const chalk=require('chalk')

const readNotes=(title) =>{
  const notes=loadNotes()
  const finddata=notes.find((note)=> note.title===title)
  if(finddata){
    console.log(chalk.inverse(finddata.title))
    console.log(finddata.body)
  }
  else{
    console.log(chalk.red("Unable to Find Node!"))
  }
}

const addNote =(title,body) =>{
    const notes=loadNotes()
    const duplicateNotes= notes.filter((note)=> note.title===title)

    if(duplicateNotes.length==0){
      notes.push({
          title:title,
          body:body
      })
      saveNotes(notes)
      console.log(chalk.green("New Note added!"))
    }
    else{
      console.log(chalk.red(`Note title:'${title}' is already present!`))
    }
}

const saveNotes= (notes) =>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)

}
const loadNotes =() =>{
  try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON)
  }catch(err){
    return []
  }

}
const removeNote = (title) =>{
  const loadData=loadNotes()
  const notesToKeep=loadData.filter( (data)=> data.title!=title)
  if(notesToKeep.length==loadData.length){
    console.log(chalk.red(`Title:${title} is not present`))
  }
  else{
    saveNotes(notesToKeep)
    console.log(chalk.green("Note removed!"))
  }
}

const listNotes=()=>{
  const loadData= loadNotes()

  console.log(chalk.inverse.green("Your Notes:"))
  var count=1;
  loadData.forEach((data)=>{
      console.log(count.toString()+")"+chalk.white(data.title))
      console.log("--->"+chalk.white(data.body))
      count++;

  })

}

module.exports={
  readNotes: readNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}
