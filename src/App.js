import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Notes from "./Components/Notes";
import AddNotes from "./Components/AddNotes";
import Update from "./Components/Update";
import Login from "./login";
import Jwt from "./Components/Jwt";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/notes"
            element={
              <Jwt>
                <Notes />
              </Jwt>
            }
          />
          <Route path="/add" element={<AddNotes />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
