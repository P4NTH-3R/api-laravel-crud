import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Student() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBadgeClass = (course) => {
        const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger', 'bg-secondary'];
        if (!course) return 'bg-secondary';
        let hash = 0;
        for (let i = 0; i < course.length; i++) {
            hash = course.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/students').then(res => {
            setStudents(res.data.students);
            setLoading(false);
        });
    }, []);

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/students/${id}`).then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();
        });
    }

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mt-3 text-muted loading">Loading Students...</h4>
                </div>
            </div>
        );
    }

    var studentDetails = "";
    studentDetails = students.map((item, index) => {
        return (
            <tr key={index}>
                <td className="fw-bold text-primary">#{item.id}</td>
                <td className="fw-semibold">{item.name}</td>
                <td><span className={`badge ${getBadgeClass(item.course)}`}>{item.course}</span></td>
                <td className="text-muted"><small>{item.email}</small></td>
                <td className="text-muted"><small>{item.phone}</small></td>
                <td className="text-center">
                    <div className="btn-group" role="group">
                        <Link to={`/students/${item.id}/edit`} className="btn btn-success btn-sm">✏️ Edit</Link>
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">🗑️ Delete</button>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    {/* Page Header */}
                    <div className="mb-4 text-center">
                        <h2 className="display-5 fw-bold mb-2" style={{background: 'linear-gradient(135deg, #7b61ff, #20c997)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
                            Student Management
                        </h2>
                    </div>

                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h4 className="mb-1">📚 Student List</h4>
                                <small className="text-muted">Total Students: {students.length}</small>
                            </div>
                            <Link to="/students/create" className="btn btn-primary">
                                <i className="bi bi-plus-circle"></i> Add Student
                            </Link>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;