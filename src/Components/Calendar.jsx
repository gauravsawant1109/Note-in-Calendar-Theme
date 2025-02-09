import React from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { IoIosSearch } from "react-icons/io";
import {
  IoChevronForwardCircleOutline,
  IoChevronBackCircleOutline,
} from "react-icons/io5";
import useCustomHook from "./useCustomHook";
import { Link } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
const Calendar = () => {
  const {
    searchTitle,
    setSearchTitle,
    clickToSelect,
    filteredData,
    nextMonth,
    prevMonth,
    selectedDate,
    currentMonth,
    setSearchDate,
    searchDate,
    searchNote,
    RemoveNote,
  } = useCustomHook();
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const renderHeader = () => {
    return (
      <div className="d-flex items-center p-4 bg-gray-100 rounded-t-lg">
        <button onClick={prevMonth} className="btn">
          <IoChevronBackCircleOutline size={30} />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="btn">
          <IoChevronForwardCircleOutline size={30} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="d-flex fs-4 flex-column justify-content-around grid grid-cols-7 bg-gray-200 rounded-t-lg">
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "yyyy-MM-dd");

        // Filter notes for the current date
        const notesForDay = filteredData.filter((data) =>
          data.EnteredDate?.includes(formattedDate)
        );

        days.push(
          <div
            style={{
              width: "10.3rem",
              height: "10.2rem",
              borderRadius: "20px",
              border: "1px solid grey",
              // background: `${notesForDay.length > 0 ? "skyblue" : ""}`,
              background: 
              formattedDate === todayDate
              ? "yellow"
              : notesForDay.length 
              ? "skyblue"
              :""

            }}
            className={`text-start p-2 fs-5 cursor-pointer rounded-lg ${
              !isSameMonth(day, monthStart) ? "text-gray-400" : ""
            } ${
              isSameDay(day, selectedDate) ? "bg-blue" : "hover:bg-gray-100"
            }`}
            onClick={() => clickToSelect(cloneDay)}
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/Calendar/DetailNoteDate/${formattedDate}`}
              key={formattedDate}
            >
              {" "}
              <div>{format(day, "d")}</div>
            </Link>
            {/* Show all titles below the date */}
            <div
              style={{
                height: `${notesForDay.length > 3 ? "5.3rem" : ""}`,
                overflow: `${notesForDay.length > 3 ? "auto" : ""}`,
                // background: `${notesForDay.length > 0 ? "skyblue" : ""}`,
              }}
              className="text-sm text-gray-600   mt-1"
            >
              {notesForDay.length > 0
                ? notesForDay.map((note, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between mb-1"
                    >
                      <Link
                        to={`/Calendar/IndividualNote/${note.Title}`}
                        style={{textDecoration:"none"}}
                        
                      >{note.Title.length>9 ? `${note.Title.slice(0, 9)}...`:note.Title}</Link>
                      <button
                        type="button"
                        onClick={() => RemoveNote(note)}
                        className="btn btn-danger pt-0 p-1"
                      >
                        {" "}
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="p-2 d-flex justify-content-evenly">{rows}</div>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>{renderHeader()}</div>
        <div className="d-flex pt-4 pb-4 pe-4">
          <div>
            <Link
              to="/Calendar/NewNote"
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              <span className="text-white">New Note</span>
            </Link>
          </div>

          <div class="dropdown ms-2">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Title / Date
            </button>
            <ul class="dropdown-menu bg-secondary-subtle  text-center">
              <li>
                {" "}
                <input
                  type="date"
                  className="form-control d-inline w-auto"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </li>
              <li>
                {" "}
                <input
                  type="text"
                  placeholder="Enter Note Title"
                  className="form-control d-inline w-100 "
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </li>
            </ul>
          </div>

          <button
            className="btn btn-outline-primary "
            style={{ height: "38px" }}
            onClick={searchNote}
          >
            <IoIosSearch />
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-evenly">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
