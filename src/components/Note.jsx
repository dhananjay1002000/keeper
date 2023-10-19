import React, { useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Note(props) {
  const [isEditable , setIsEditable] = useState(false);
  const [textInput, setInputText] = useState({
    title: props.title,
    content: props.content
  });

  function handleEditOnClick(event){
    setIsEditable(prevValue => !prevValue);
    console.log(isEditable);
    event.preventDefault();
  }

  async function handleSaveOnClick(event){
    event.preventDefault();
    setIsEditable(prevValue => !prevValue);
    try{
      await axios.put(`http://localhost:4000/put/${props.delId}` , textInput);
    }
    catch(err){
      console.error("An error occurred: "  , err);
    }
    
  }

  function handleOnChange(event){
    const {name , value} = event.target;
    setInputText( (prevValue) => {
     return {
      ...prevValue,
      [name]:value
     }
    })
    console.log(textInput);
  }

  return (
    <div  >
      <form className="note-form">
        <input type="text" value= {textInput.title} name="title" disabled = {!isEditable} onChange={handleOnChange} />
        {
          !isEditable ? <button className="add-bt" onClick={handleEditOnClick}> <EditIcon /> </button> : <button className="add-bt"  onClick={handleSaveOnClick} > <SaveIcon /> </button>
        }
        <textarea type="text" value={textInput.content} name="content" disabled = {!isEditable} onChange={handleOnChange}/>
        <button className="del-bt" onClick={(event)=>{
            event.preventDefault();
            console.log(props.id);
            props.handleDelete(props.delId , props.id);
        }}><DeleteIcon /></button>
      </form>
    </div>
  );
}

export default Note;
