import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
  const url = "process.env.REACT_APP_SERVER_URL"
  const [noteList, setNoteList] = useState([]);
  useEffect(()=>{
    loadData();

  } , [] );

  async function loadData(){
    
    try{
      const res = await axios.get(url);
      setNoteList([ ...res.data]);
    }
    catch(err){
      console.error("Error occured : " , err);
    }
  }
 
 async function handleOnClick() {
       
         
         loadData();
    };
    
  
  async function handleDelete(delId) {   
    setNoteList(prevNotes => {
      return prevNotes.filter((note) => {
        return note._id !== delId;
      });
    });
     try{
        await axios.delete(`${url}/del/${delId}`);
     }
     catch(err){
      console.error(err);
     }
       
   }


  return (
    <div>
      <Header />
      <CreateArea handleOnClick={handleOnClick} />
      {
        
      noteList.map((note, index) => {
        console.log(note);
        return (
          <Note
            key={note._id}
            id={index}
            delId = {note._id}
            title={note.title}
            content={note.content}
            handleDelete={handleDelete}
          />
        );
      })}
      <Footer />
    </div>
  );

}

export default App;
export {url};
