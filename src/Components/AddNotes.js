import React, { useState, useEffect } from "react";
import "./Notes.css";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AddNotes() {
  const navigate = useNavigate();
  const id = uuidv4();
  const [title, setTitle] = useState("");
  const [close, setClose] = useState();
  const [showClose, setShowClose] = useState(false);
  // const today = new Date().toLocaleString();
  const [notes, setNotes] = useState([]);
  const [hide, setHide] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    const newNote = {
      id: id,
      title: title,
      notes: notes.map((type) => ({
        data: type.data,
        amount: Math.round((type.amount * 100) / 100).toFixed(2),
        status: type.status,
      })),
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/notes");
  };

  const handleAddNote = () => {
    const newNote = {
      data: "",
      amount: "",
      status: false,
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const handleInputChange = (index, key, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index][key] = value;
    setNotes(updatedNotes);
  };

  const toggleDivVisibility = () => {
    setHide(!hide);
  };

  const handleClose = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  // comments
  const checkedSum = notes
    .filter((note) => note.status)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const sum = notes
    .filter((note) => !note.status)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div>
      <div>
        <nav>
          <Link onClick={handleSave}>
            <i className="fa fa-arrow-left hed" aria-hidden="true" />
          </Link>
          <h2 className="pt-2">Add Notes</h2>
        </nav>

        <div className="title">
          <input
            type="text"
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="sum">
          <h4>Sum: {sum}</h4>
        </div>

        <div>
          <h1>Current Time:</h1>
          <h2>{currentTime}</h2>
        </div>

        {notes.map((note, index) =>
          note.status === false ? (
            <>
              <div key={index} className="box my-2">
                <form>
                  <div className="form-check d-inline">
                    <input
                      className=" check-box "
                      type="checkbox"
                      id={`flexCheckDefault${index}`}
                      checked={note.status}
                      onChange={(e) =>
                        handleInputChange(index, "status", e.target.checked)
                      }
                    />
                  </div>
                  <div>
                    <input
                      className="form-control box-1"
                      placeholder="Enter Notes"
                      value={note.data}
                      onChange={(e) =>
                        handleInputChange(index, "data", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="number"
                      className="amount"
                      placeholder="Amount"
                      value={note.amount}
                      onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    aria-label="Close"
                    onClick={() => handleClose(index)}
                  ></button>
                </form>
                <span className="date">{new Date().toLocaleString()}</span>
              </div>
            </>
          ) : (
            ""
          )
        )}

        {showClose && (
          <button
            type="button"
            className="btn-close ms-auto my-2"
            aria-label="Close"
            value={close}
            onClick={() => handleClose()}
          ></button>
        )}

        <div className="btn btn-one my-4  " onClick={toggleDivVisibility}>
          {hide ? "Hide Archived" : "Show Archived"}
        </div>

        <div className="sum">
          <h4>Sum: {checkedSum}</h4>
        </div>

        {notes.map((note, index) =>
          note.status === true ? (
            <>
              {hide ? (
                <div key={index} className="box my-2">
                  <form>
                    <div className="form-check d-inline">
                      <input
                        className=" check-box "
                        type="checkbox"
                        id={`flexCheckDefault${index}`}
                        checked={note.status}
                        onChange={(e) =>
                          handleInputChange(index, "status", e.target.checked)
                        }
                      />
                    </div>
                    <div>
                      <input
                        className="form-control box-1"
                        placeholder="Enter Notes"
                        value={note.data}
                        disabled
                        style={
                          note.status ? { textDecoration: "line-through" } : {}
                        }
                        onChange={(e) =>
                          handleInputChange(index, "data", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group ">
                      <input
                        type="number"
                        className="amount"
                        placeholder="Amount"
                        style={
                          note.status ? { textDecoration: "line-through" } : {}
                        }
                        value={note.amount}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "amount",
                            e.target.value.toFixed(2)
                          )
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-close ms-auto"
                      aria-label="Close"
                      onClick={() => handleClose(index)}
                    ></button>
                  </form>
                  <span className="date">{new Date().toLocaleString()}</span>
                </div>
              ) : null}
            </>
          ) : (
            ""
          )
        )}
        <div className="plus">
          <i
            className="fa fa-plus"
            aria-hidden="true"
            onClick={handleAddNote}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNotes;
