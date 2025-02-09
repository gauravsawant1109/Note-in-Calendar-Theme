import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
// import { Routes } from "react-router-dom";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import DetailNote from "./Components/DetailNote";
import NewNote from "./Components/NewNote";
import IndividualNote from "./Components/IndividualNote";
import DetailNoteTitle from "./Components/DetailNoteTitle";

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<Navigate to="/Calendar"/>}/>
          <Route path="/Calendar" element={<Calendar/>}/>
          <Route path="/Calendar/DetailNoteDate/:NOTE" element={<DetailNote/>}/>
        
          <Route path="/Calendar/DetailNoteTitle/:NOTE" element={<DetailNoteTitle/>}/>

          <Route path="/Calendar/NewNote" element={<NewNote/>}/>
          <Route path="/Calendar/IndividualNote/:INDNOTE" element={<IndividualNote/>}/>


          

        </Routes>
      </Router>
      {/* <Calendar /> */}
    </>
  );
}

export default App;
