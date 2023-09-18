import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/Table.css";

function AddTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    emailAddress: "",
  });
  const [editTeacher, setEditTeacher] = useState({
    id: null,
    firstName: "",
    lastName: "",
    contactNo: "",
    emailAddress: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to fetch teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://localhost:44378/api/Teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Function to create a new teacher
  const createTeacher = async () => {
    try {
      await axios.post("https://localhost:44378/api/Teachers", newTeacher);
      setIsSuccess(true);
      setNewTeacher({
        firstName: "",
        lastName: "",
        contactNo: "",
        emailAddress: "",
      });
      fetchTeachers();
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  // Function to update a teacher
  const updateTeacher = async () => {
    try {
      await axios.put(
        `https://localhost:44378/api/Teachers/${editTeacher.id}`,
        editTeacher
      );
      setIsSuccess(true);
      setEditTeacher({
        id: null,
        firstName: "",
        lastName: "",
        contactNo: "",
        emailAddress: "",
      });
      fetchTeachers();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  // Function to delete a teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`https://localhost:44378/api/Teachers/${id}`);
      setIsSuccess(true);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Effect to fetch teachers initially and whenever there's a change
  useEffect(() => {
    fetchTeachers();
  }, [isSuccess]);

  return (
    <div>
      <h1></h1>
      <br></br>
      {/* Create and Edit Teacher */}
      <div className="create-edit-subject1">
        <h2>Create | Edit Teacher</h2>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={newTeacher.firstName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, firstName: e.target.value })
            }
            style={{
              width: "300px",
              marginLeft: "7px",
              height: "30px",
            }}
          />
        </div>
        <br></br>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={newTeacher.lastName}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, lastName: e.target.value })
            }
            style={{
              width: "300px",
              marginLeft: "7px",
              height: "30px",
            }}
          />
        </div>
        <br></br>
        <div>
          <label>Contact No:</label>
          <input
            type="text"
            value={newTeacher.contactNo}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, contactNo: e.target.value })
            }
            style={{
              width: "300px",
              height: "30px",
              marginLeft: "5px",
            }}
          />
        </div>{" "}
        <br></br>
        <div>
          <label>Email :</label>
          <input
            type="text"
            value={newTeacher.emailAddress}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, emailAddress: e.target.value })
            }
            style={{
              width: "300px",
              height: "30px",
              marginLeft: "38px",
            }}
          />
        </div>
        <br></br>
        {editTeacher.id ? (
          <button
            onClick={updateTeacher}
            style={{
              width: "100px",
              backgroundColor: "green",
              marginLeft: "1px",
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
            onClick={createTeacher}
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

      {/* List Teachers */}
      <div className="subject-list-container">
        <div className="table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th colSpan="4">
                  <h1>Teachers</h1>
                </th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Contact No</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{`${teacher.firstName} ${teacher.lastName}`}</td>
                  <td>{teacher.contactNo}</td>
                  <td>{teacher.emailAddress}</td>
                  <td className="action-buttons">
                    <button
                      style={{
                        width: "70px",
                        marginLeft: "7px",
                        height: "35px",
                      }}
                      onClick={() => setEditTeacher(teacher)}
                    >
                      Edit
                    </button>{" "}
                    <br></br>
                    <button
                      style={{
                        width: "70px",
                        marginLeft: "7px",
                        marginBottom: "-100px",
                        height: "35px",
                      }}
                      onClick={() => deleteTeacher(teacher.id)}
                    >
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

export default AddTeacher;
