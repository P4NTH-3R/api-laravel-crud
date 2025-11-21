import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentCreate() {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: ''
    });

    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    const saveStudent = (e) => {
        e.preventDefault();
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.post('http://localhost:8000/api/students', data).then(res => {
            alert(res.data.message);
            navigate('/students');
        });
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {/* Page Header */}
                    <div className="mb-4 text-center">
                        <h2 className="display-6 fw-bold mb-2" style={{background: 'linear-gradient(135deg, #7b61ff, #20c997)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
                            ✨ Add New Student
                        </h2>
                        <p className="text-muted">Fill in the details to create a new student record</p>
                    </div>

                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">📝 Student Information</h4>
                            <Link to="/students" className="btn btn-secondary btn-sm">← Back</Link>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="mb-4">
                                    <label className="form-label">👤 Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={student.name} 
                                        onChange={handleInput} 
                                        className="form-control" 
                                        placeholder="Enter student's full name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">📚 Course</label>
                                    <input 
                                        type="text" 
                                        name="course" 
                                        value={student.course} 
                                        onChange={handleInput} 
                                        className="form-control" 
                                        placeholder="e.g., Computer Science"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">📧 Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={student.email} 
                                        onChange={handleInput} 
                                        className="form-control" 
                                        placeholder="student@example.com"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">📱 Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        value={student.phone} 
                                        onChange={handleInput} 
                                        className="form-control" 
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary btn-lg">💾 Save Student</button>
                                    <Link to="/students" className="btn btn-outline-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentCreate;