import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomHook from "./useCustomHook";
import NewNote from "./NewNote";
// import NewNote from "./NewNote";
const DetailNoteTitle = () => {
  const { result, selectedDate, filteredData } = useCustomHook();
  const { NOTE } = useParams();
  // const note = NOTE ? JSON.parse(decodeURIComponent(NOTE)) : null;
  const [note, setNote] = useState([]);
  const caption = useState("No Any Note found")
  console.log("note in Details note", note);

  useEffect(() => {
    setNote(filteredData.filter((data) => data.Title.toLowerCase().includes(NOTE.toLowerCase())));
    console.log(note);
  }, [filteredData, NOTE]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        // style={{ height: "100vh" }}
      >
        
        <div className="text-center ">
          {note.length > 0 ? (
            note.map((n, i) => (
              <div className="m-5  rounded "  key={i}>
                <h3 className=" ">{i+1}) {n.Title} </h3>
                <p>{n.note}</p>
                <h6 className="text-end">On : {n.EnteredDate}</h6>
              </div>
            ))
          ) : (
            <div>
              
          <NewNote caption={caption} RenderDate={NOTE}/>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailNoteTitle;
