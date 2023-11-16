import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Notes.css";

function Notes() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const store = localStorage.getItem("notes");
    const parsedData = JSON.parse(store) || [];
    setData(parsedData);
  }, []);

  const handleClose = (title) => {
    const updatedData = data.filter((item) => item.title !== title);
    setData(updatedData);
    localStorage.setItem("notes", JSON.stringify(updatedData));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div>
      <nav>
        <h2 className="pt-2">Notes</h2>
        <div className="threedot ms-auto pt-2 mr-2">
          <h2>
            <div className="dropdown">
              <a
                className="three-dot"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    Select item
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Import
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Export
                  </a>
                </li>
              </ul>
            </div>
          </h2>
        </div>
      </nav>
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <i className="fa fa-search ms-auto  " aria-hidden="true" />
      </div>

      <section className="">
        <div className="main-screen">
          {data &&
            data
              .filter((x) => x.title.toLowerCase().includes(search))
              .map((x, i) => (
                <div className="inside" key={i}>
                  <div className="d-flex">
                    <h6 className="p-2">{x.title}</h6>

                    <div className="btn-two  ms-auto">
                      <Link to={`/update/${x.id}`}>
                        <i
                          className="fa fa-pencil-square-o btn "
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>

                    <button
                      type="button"
                      className="btn-close ms-auto my-2"
                      aria-label="Close"
                      onClick={() => handleClose(x.title)}
                    ></button>
                  </div>
                  {x.notes &&
                    x.notes.map((x, i) => (
                      <div className="notes" key={i}>
                        <input type="checkbox" checked={x.status} />
                        <span>{x.data}</span>
                        <span>{x.amount}</span>
                      </div>
                    ))}
                </div>
              ))}
        </div>
      </section>

      <div className="plus">
        <Link to="/add">
          <i className="fa fa-plus" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default Notes;
