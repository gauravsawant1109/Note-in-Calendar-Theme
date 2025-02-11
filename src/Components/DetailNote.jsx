import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import useCustomHook from "./useCustomHook";
import NewNote from "./NewNote";
import { IoWarning } from "react-icons/io5";
// import NewNote from "./NewNote";
const DetailNote = () => {
  const { result, selectedDate, filteredData } = useCustomHook();
  const { NOTE } = useParams();
  // const note = NOTE ? JSON.parse(decodeURIComponent(NOTE)) : null;
  const [note, setNote] = useState([]);
  const caption = useState("No Any Note found")
  console.log("note in Details note", note);

  useEffect(() => {
    setNote(filteredData.filter((data) => data.EnteredDate?.includes(NOTE)));
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
            <>
            {note.map((n, i) => (
              <div className="m-5  rounded "  key={i}>
                <h3 className=" ">{i+1}) {n.Title} </h3>
                <p>{n.note}</p>
                <h6 className="text-end">On : {n.EnteredDate}</h6>
              </div>
            ))}
             <div>
             <Link to={`/Calendar/NewNote/${NOTE}`} 
                RenderDate={NOTE}
                className="btn btn-primary mb-2"
                style={{ textDecoration: "none" }}
              >
                <span className="text-white">New Note</span>
              </Link>
            </div>
            </>
          ) : (
            <div>
              
          {/* <NewNote caption={caption} RenderDate={NOTE}/> */}
         <div className="d-flex flex-column justify-content-center" style={{height:"100vh"}}>
         <h1 className="m-5"> <span className="text-warning "><IoWarning/></span> {caption}</h1>
          <Link to={`/Calendar/NewNote/${NOTE}`} caption={caption} RenderDate={NOTE}><button className="btn btn-primary">Add New Note</button></Link>


         </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailNote;
