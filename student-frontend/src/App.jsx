import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Student from './pages/Student';
import StudentCreate from './pages/StudentCreate';
import StudentEdit from './pages/StudentEdit';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-gradient navbar-dark shadow-sm">
        <div className="container">
            <Link className="navbar-brand" to="/">
              <span className="brand-gradient">Student App</span>
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/students">Student List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students/create">Add Student</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="app-container">
        <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/students" element={<Student />} />
            <Route path="/students/create" element={<StudentCreate />} />
            <Route path="/students/:id/edit" element={<StudentEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;