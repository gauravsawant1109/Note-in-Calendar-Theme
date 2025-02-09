import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomHook from "./useCustomHook";
import NewNote from "./NewNote";
// import NewNote from "./NewNote";
const IndividualNote = () => {
  const { result, selectedDate, filteredData } = useCustomHook();
  const { INDNOTE } = useParams();
  // const note = NOTE ? JSON.parse(decodeURIComponent(NOTE)) : null;
  const [note, setNote] = useState([]);
  const caption = useState("No Any Note found")
  console.log("note in Details note", note);

  useEffect(() => {
    setNote(filteredData.filter((data) => data.Title.includes(INDNOTE)));
    console.log(note);
  }, [filteredData, INDNOTE]);

  return (
    <>
      <div
        className="d-flex justify-content-center  align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center ">
          {note.length > 0 ? (
            note.map((n, i) => (
              <div key={i}>
                <h1 className="m-0 ">{n.Title} </h1>
                <p>{n.note}</p>
                <h6 className="text-end">On : {n.EnteredDate}</h6>
              </div>
            ))
          ) : (
            <div>
              
          <NewNote caption={caption} />

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IndividualNote;
