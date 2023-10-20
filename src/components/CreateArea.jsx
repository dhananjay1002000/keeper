import React, { useState } from "react";
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import { url } from "./App";

function CreateArea(props) {
  const [textInput, setInputText] = useState({
    title: "",
    content: ""
  });
  const [isExpanded , setIsExpanded] = useState(false);
  function handleIsExpanded(){
       setIsExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form>   
        <input
        name="title"
        onChange={handleChange}
        placeholder="Title"
        value={textInput.title}
        onClick={handleIsExpanded}
      />
      {
        isExpanded && 
      <textarea
          name="content"
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
          value={textInput.content}
      />
      
      }
      
      
        
       {
        isExpanded &&  <button className="bt"
        onClick={async (event) => {
          event.preventDefault();
          try{
            
              await axios.post(`${url}/post` , textInput);
              props.handleOnClick();
                 
          }catch(err){
            console.error("Error post data: "  , err);
          }
          setInputText({
            title: "",
            content: ""
          });
          setIsExpanded(false);
          
        }}
      >
    <Zoom in= {isExpanded}>
        <AddIcon  />
    </Zoom>
        
      </button>
       }
      </form>
    </div>
  );
}

export default CreateArea;


