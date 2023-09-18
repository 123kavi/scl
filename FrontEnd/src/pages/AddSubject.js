import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/Table.css";

function AddSubject() {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to fetch subjects
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("https://localhost:44378/api/Subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Function to create a new subject
  const createSubject = async () => {
    const newSubject = {
      subjectName: newSubjectName,
    };

    try {
      await axios.post("https://localhost:44378/api/Subjects", newSubject);
      setIsSuccess(true);
      setNewSubjectName("");
      fetchSubjects();
    } catch (error) {
      console.error("Error creating subject:", error);
    }
  };

  // Function to update a subject
  const updateSubject = async () => {
    const updatedSubject = {
      id: selectedSubject.id,
      subjectName: editSubjectName,
    };

    try {
      await axios.put(
        `https://localhost:44378/api/Subjects/${selectedSubject.id}`,
        updatedSubject
      );
      setIsSuccess(true);
      setEditSubjectName("");
      fetchSubjects();
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  // Function to delete a subject
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`https://localhost:44378/api/Subjects/${id}`);
      setIsSuccess(true);
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  // Effect to fetch subjects initially and whenever there's a change
  useEffect(() => {
    fetchSubjects();
  }, [isSuccess]);

  return (
    <div>
      <h1></h1>
      <br></br>
      {/* Create and Edit Subject */}
      <div className="create-edit-subject">
        <h2>Create | Edit Subject</h2>
        <br></br>
        <input
          type="text"
          placeholder="Subject Name"
          value={selectedSubject ? editSubjectName : newSubjectName}
          onChange={(e) =>
            selectedSubject
              ? setEditSubjectName(e.target.value)
              : setNewSubjectName(e.target.value)
          }
          style={{
            width: "300px",
            height: "30px",
          }}
        />

        {selectedSubject ? (
          <button
            onClick={updateSubject}
            style={{
              width: "100px",
              backgroundColor: "green",
              marginLeft: "10px",

              color: "white",
              borderRadius: "5px",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        ) : (
          <button
            onClick={createSubject}
            style={{
              width: "100px",
              marginLeft: "10px",

              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Create
          </button>
        )}
      </div>

      {/* List Subjects */}
      <div className="subject-list-container">
        <div className="table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th colSpan="3">
                  <h1>Subjects</h1>
                </th>
              </tr>
              <tr>
                <th style={{ width: "7%" }}>Subject Name</th>
                <th style={{ width: "1%" }}>Edit</th>
                <th style={{ width: "15%" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.subjectName}</td>
                  <td className="action-buttons">
                    <button onClick={() => setSelectedSubject(subject)}>
                      Edit
                    </button>
                  </td>
                  <td className="action-buttons">
                    <button onClick={() => deleteSubject(subject.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isSuccess && <p>Operation successful!</p>}
    </div>
  );
}

export default AddSubject;
