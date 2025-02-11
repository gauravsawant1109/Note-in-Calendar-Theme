import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCustomHook from "./useCustomHook";
import { ToastContainer, toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
const NewNote = ({caption,RenderDate}) => {

  const { EnteredDate, setEnteredDate, setNote, note, AddedNote, initial,Title,setTitle } =
    useCustomHook();
console.log("RenderDate",RenderDate);
 const { NOTE } = useParams();
  // const note = NOTE ? JSON.parse(decodeURIComponent(NOTE)) : null;
 
useEffect(()=>{
 if(NOTE){
  setEnteredDate(NOTE)
 }
},[NOTE,setEnteredDate])

  return (
      
      <div className="align-content-center " style={{height:"100vh"}}  >
        <Link to={"/Calendar"}>
        <h5 type="button" className="text-primary " style={{position:"absolute",top:"0",left:"0"}}><IoMdArrowRoundBack className="pt-0"/> Calendar</h5>
        
        </Link>
      {caption ? (<h3 className="text-danger">{caption}</h3>):"" }
    <form
      onSubmit={AddedNote}
      className="d-flex  justify-content-center  "
    >
      <div className="border-2 p-3 border rounded">
        <h2 className="text-center">Add New Note</h2>
        <div className="text-center m-2">
          
          <input type="text" placeholder="Enter Title" className=" m-2" value={Title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <textarea
          className=" rounded ms-5 me-5  bg-light-subtle border"
          placeholder="Enter Your Note"
          rows="4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <p className="text-center mt-2">
          {/* Submit On: {new Date().toISOString().slice(0,10)} (default) */}
          <div>
            {" "}
            <input
              type="date"
              placeholder="Enter Your Date"
              className=" p-1"
              // value={RenderDate ? RenderDate : new Date().toISOString().slice(0,10)}
              value={EnteredDate} 
              onChange={(e) => setEnteredDate(e.target.value)}
            />
          </div>
        </p>
        <div className="d-flex justify-content-center m-3">
          <button type="submit" className="btn btn-outline-primary">
            {/* <Link to="/Home">Add Note</Link> */}
            Add Note
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
    </div>
  );
};

export default NewNote;
