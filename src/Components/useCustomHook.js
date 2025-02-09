import React, { useEffect } from 'react'
import { useState } from 'react'
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NOTE from "./DetailNote"
const useCustomHook = () => {
  // function getDate() {
  //     return new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  // } 
  // const [initial,setInitial]=useState([])
  // const [initial,setInitial]=useState(() => {
  //     const storedNotes = localStorage.getItem("Notes");
  //     const getstoredNotes = JSON.parse(storedNotes)
  //     return getstoredNotes   
  // });
  const navigate = useNavigate();
  const [initial, setInitial] = useState(() => {
    const storedNotes = localStorage.getItem("Notes");
    return storedNotes ? JSON.parse(storedNotes) : []
  });

  const [note, setNote] = useState("")
  const [Title, setTitle] = useState("")


  const [EnteredDate, setEnteredDate] = useState(new Date().toISOString().slice(0,10))
  //     toLocaleDateString('en-GB') returns the date in dd/mm/yyyy format.
  // .split('/').join('-') replaces / with - to get dd-mm-yyyy.
  useEffect(() => {
    // const initial = {Title:Title,note:note,id:EnteredDate}  
    localStorage.setItem("Notes", JSON.stringify(initial))

  }, [initial])

  function AddedNote(e) {
    e.preventDefault()
    //   if (!Title || !note ) {
    //     toast.error("Please fill all fields before adding a note.");
    //     return;
    // }

    // EnteredDate == null ? new Date().toISOString().slice(0, 10) : EnteredDate
    navigate("/Calendar")
    console.log(" Title :", Title, " note :", note, " date / id :", EnteredDate);
    const addedNote = { Title, note, EnteredDate }
    setInitial([...initial, addedNote]) 
    setEnteredDate("")
    console.log("initial Notes", initial);
    toast.success("Note Successfully added");
    navigate("/Calendar")
  }
  const [searchDate, setSearchDate] = useState()
  const [searchTitle,setSearchTitle]=useState()
  // const getData = localStorage.getItem("Notes");
  // const [dataOne, setDataOne] = useState(JSON.parse(getData));
  const [filteredData, setFilteredData] = useState(initial)
  console.log("filteredData state", filteredData);
  // console.log("geted data :", dataOne);

  // search Note
  function searchNote(e) {
    e.preventDefault()
    console.log("initial array in search function ", initial);
    if(searchDate){
    const One = initial.filter((data) => data.EnteredDate == searchDate)
    setFilteredData(One)
    navigate(`/Calendar/DetailNoteDate/${searchDate}`)
   }else if(searchTitle){
    const One = initial.filter((data) => data.Title.toLowerCase().includes(searchTitle.toLowerCase()))
    setFilteredData(One)
    navigate(`/Calendar/DetailNoteTitle/${searchTitle}`)
    }
    console.log("single data", One);
  }
  console.log("filtered data", filteredData);
  const [result, setResult] = useState("Select Note In Details ")

  // Remove Note 
  function RemoveNote(noteID) {
    const updatedNotes = initial.filter((n) => n.Title != noteID.Title)
    setInitial(updatedNotes)// also delete from localStorage
    setFilteredData(updatedNotes)
    // setFilteredData(filteredData.filter((n) => n != noteID)) // only delete from window
    // if (filteredData.length == 0) {
    //   setResult("No Any Note Available")
    // }
  }

   const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    
  
    console.log("date",format(selectedDate,"yyyy-MM-dd")/*.toISOString().slice(0,10)*/);
    
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
    function clickToSelect(cloneDay){
      setSelectedDate(cloneDay)
    }
    const [renderNote,setrenderNote] = useState()
  return {searchTitle,setSearchTitle,clickToSelect,renderNote,setrenderNote,nextMonth,prevMonth,selectedDate, setSelectedDate,currentMonth, setCurrentMonth, result, EnteredDate, RemoveNote, filteredData, setEnteredDate, setNote, note, AddedNote, initial, setInitial, Title, setTitle, searchNote, searchDate, setSearchDate }
}

export default useCustomHook;