import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/Table.css"; 
function AddClassRoom() {
  const [subjects, setClassRooms] = useState([]);
  const [newClassRoomName, setNewClassRoomName] = useState("");
  const [editClassRoomName, setEditClassRoomName] = useState("");
  const [selectedClassRoom, setSelectedClassRoom] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Function to fetch subjects
  const fetchClassRooms = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44378/api/ClassRooms"
      );
      setClassRooms(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Function to create a new classRoom
  const createClassRoom = async () => {
    const newClassRoom = {
      cLassName: newClassRoomName,
    };

    try {
      await axios.post("https://localhost:44378/api/ClassRooms", newClassRoom);
      setIsSuccess(true);
      setNewClassRoomName("");
      fetchClassRooms();
    } catch (error) {
      console.error("Error creating classRoom:", error);
    }
  };

  // Function to update a classRoom
  const updateClassRoom = async () => {
    const updatedClassRoom = {
      id: selectedClassRoom.id,
      cLassName: editClassRoomName,
    };

    try {
      await axios.put(
        `https://localhost:44378/api/ClassRooms/${selectedClassRoom.id}`,
        updatedClassRoom
      );
      setIsSuccess(true);
      setEditClassRoomName("");
      fetchClassRooms();
    } catch (error) {
      console.error("Error updating classRoom:", error);
    }
  };

  // Function to delete a classRoom
  const deleteClassRoom = async (id) => {
    try {
      await axios.delete(`https://localhost:44378/api/ClassRooms/${id}`);
      setIsSuccess(true);
      fetchClassRooms();
    } catch (error) {
      console.error("Error deleting classRoom:", error);
    }
  };

  // Effect to fetch subjects initially and whenever there's a change
  useEffect(() => {
    fetchClassRooms();
  }, [isSuccess]);

  return (
    <div>
      <h1></h1>
      <br></br>

      {/* Create ClassRoom */}
      <div className="create-edit-subject">
        <h2>Create | Edit ClassRoom</h2>
        <input
          type="text"
          placeholder="ClassRoom Name"
          value={selectedClassRoom ? editClassRoomName : newClassRoomName}
          onChange={(e) =>
            selectedClassRoom
              ? setEditClassRoomName(e.target.value)
              : setNewClassRoomName(e.target.value)
          }
          style={{
            width: "300px",
            height: "30px",
          }}
        />
        {selectedClassRoom ? (
          <button
            onClick={updateClassRoom}
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
            onClick={createClassRoom}
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

      {/* List ClassRooms */}
      <div className="subject-list-container">
        <div className="table-container">
          <table className="subject-table">
            <thead>
              <tr>
                <th colSpan="3">
                  <h1>Class Rooms</h1>
                </th>
              </tr>
              <tr>
                <th style={{ width: "7%" }}>Classroom Name</th>
                <th style={{ width: "1%" }}>Edit</th>
                <th style={{ width: "15%" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((classRoom) => (
                <tr key={classRoom.id}>
                  <td>{classRoom.cLassName}</td>
                  <td className="action-buttons">
                    <button onClick={() => setSelectedClassRoom(classRoom)}>
                      {" "}
                      Edit
                    </button>
                  </td>

                  <td className="action-buttons">
                    <button onClick={() => deleteClassRoom(classRoom.id)}>
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

export default AddClassRoom;
