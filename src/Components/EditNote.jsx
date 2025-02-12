import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCustomHook from "./useCustomHook";

const EditNote = () => {
  const { filteredData, setFilteredData,setInitial } = useCustomHook();
//  console.log("date",date);
 
  const { NoteForEdit } = useParams();
  const navigate = useNavigate();

  // State for storing note details
  const [editingNote, setEditingNote] = useState({
    Title: "",
    note: "",
    EnteredDate: "",
  });

  // Find the note when the component mounts
  useEffect(() => {
    const foundNote = filteredData.find((data) => data.Title === NoteForEdit);
    if (foundNote) {
      setEditingNote(foundNote);
    }
  }, [NoteForEdit, filteredData]);

  // Handle input changes
  const handleChange = (e) => {
    setEditingNote({ ...editingNote, [e.target.name]: e.target.value });
  };

  // Handle note update
  const handleUpdate = () => {
    if (!editingNote.Title.trim() || !editingNote.note.trim()) {
      alert("Title and note cannot be empty!");
      return;
    }

    const updatedNotes = filteredData.map((item) =>
      item.Title === NoteForEdit ? editingNote : item
    );
    console.log("updatedNote",updatedNotes);
    
    setInitial(updatedNotes)
    setFilteredData(updatedNotes);
    console.log("updatedNotes",updatedNotes);
    
    // alert("Note updated successfully!");
    navigate(`/Calendar/DetailNoteDate/${editingNote.EnteredDate}`); // Redirect to home or notes list page
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="d-flex flex-column shadow p-4 mb-5 bg-body-tertiary rounded  ">
        
      <h2 className="text-center mb-3 ">Edit Note</h2>
      {editingNote.Title ? (
        <>
          <label >Title:</label>
          <input
            type="text"
            name="Title"
            className="mb-2"
            value={editingNote.Title}
            onChange={handleChange}
          />
          
          <label>Note:</label>
          <textarea
            name="note"
            className="mb-2"
            value={editingNote.note}
            onChange={handleChange}
          ></textarea>

          <label>Entered Date:</label>
          <input
            type="date"
            name="EnteredDate"
            value={editingNote.EnteredDate}
            onChange={handleChange}
            className="mb-2"
          />

          <button className="btn btn-primary " onClick={handleUpdate}>
            Update
          </button>
        </>
      ) : (
        <p>No note found for editing</p>
      )}
    
      </div>
    </div>
  );
};

export default EditNote;
