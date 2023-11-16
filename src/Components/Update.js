import React from "react";
import "./Notes.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  // const [close, setClose] = useState();
  // const [showClose, setShowClose] = useState(false);
  const today = new Date().toLocaleString();
  const [notes, setNotes] = useState([]);

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
    const index = existingNotes.findIndex((note) => note.id === id);

    if (index !== -1) {
      existingNotes[index] = newNote;
    } else {
      existingNotes.push(newNote);
    }

    setNotes(existingNotes);

    localStorage.setItem("notes", JSON.stringify(existingNotes));
    navigate("/notes");
  };

  const handleAddNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        data: "",
        amount: "",
        status: false,
        showClose: true,
      },
    ]);
  };

  useEffect(() => {
    const save = localStorage.getItem("notes");
    if (save) {
      const parseData = JSON.parse(save);
      const editPage = parseData.find((item) => item.id === id);
      if (editPage) {
        setTitle(editPage.title);
        setNotes(editPage.notes);
      }
    }
  }, [id]);

  const handleInputChange = (index, key, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index][key] = value;
    setNotes(updatedNotes);
  };

  const [hide, setHide] = useState(true);

  const toggleDivVisibility = () => {
    setHide(!hide);
  };

  const handleClose = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const checkedSum = notes
    .filter((note) => note.status)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const sum = notes
    .filter((note) => !note.status)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div>
      <div>
        <nav>
          <Link onClick={handleSave}>
            <i className="fa fa-arrow-left hed" aria-hidden="true" />
          </Link>
          <h2 className="pt-2">Update Notes</h2>
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
                      defaultValue={note.amount}
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
                <span className="date">{today}</span>
              </div>
            </>
          ) : (
            ""
          )
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
                        value={note.amount}
                        style={
                          note.status ? { textDecoration: "line-through" } : {}
                        }
                        onChange={(e) =>
                          handleInputChange(index, "amount", e.target.math)
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
                  <span className="date">{today}</span>
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

export default Update;
