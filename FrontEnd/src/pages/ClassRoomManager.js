import React, { useState, useEffect } from "react";
import axios from "axios";

import "../components/style/ClassroomManager.css";

function ClassroomManager() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroomId, setSelectedClassroomId] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [teacherName, setTeacherName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44378/api/ClassRooms"
      );
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const fetchSubjectTeacherData = async (classroomId) => {
    try {
      const response = await axios.get(
        `https://localhost:44378/api/classroom/${classroomId}/subjects-teachers`
      );
      const { teacher, subjects } = response.data;
      setTeacherName(`${teacher.firstName} ${teacher.lastName}`);
      setSubjectName(subjects[0].subjectName);
    } catch (error) {
      console.error("Error fetching subject and teacher data:", error);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    setSelectedClassroomId(selectedId);
    const selected = classrooms.find(
      (classroom) => classroom.id === parseInt(selectedId)
    );
    setSelectedClassroom(selected);

    fetchSubjectTeacherData(selectedId);
  };

  return (
    <div className="classroom-manager">
      <h1>Classroom | Teacher | Allocated Subject</h1>

      {/* Dropdown Box */}
      <div className="dropdown-box">
        <h2>Select Classroom</h2>
        <select onChange={handleDropdownChange} value={selectedClassroomId}>
          <option value="">Select a Classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom.id} value={classroom.id}>
              {classroom.cLassName}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher Details Box */}
      {teacherName && (
        <div className="teacher-details-box">
          <h2>Allocated Teacher Details</h2>
          <p>
            <strong>Name:</strong> {teacherName}
          </p>
        </div>
      )}

      {/* Subject Details Box */}
      {subjectName && (
        <div className="subject-details-box">
          <h2>Subject Details</h2>
          <p>
            <strong>Subject:</strong> {subjectName}
          </p>
        </div>
      )}
    </div>
  );
}

export default ClassroomManager;
