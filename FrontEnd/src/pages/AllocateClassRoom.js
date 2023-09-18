import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/AllocateCourse.css";

function AllocateClassRoom() {
  const [classRooms, setClassRooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialAllocationState = {
    classIdFk: "",
    teacherIdFk: "",
  };

  const [newAllocation, setNewAllocation] = useState({
    ...initialAllocationState,
  });

  const [isTeacherSelected, setIsTeacherSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRoomResponse = await axios.get(
          "https://localhost:44378/api/ClassRooms"
        );
        const teacherResponse = await axios.get(
          "https://localhost:44378/api/Teachers"
        );
        const allocationResponse = await axios.get(
          "https://localhost:44378/api/Alocates"
        );

        setClassRooms(classRoomResponse.data);
        setTeachers(teacherResponse.data);
        setAllocations(allocationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateAllocation = async () => {
    try {
      const { classIdFk, teacherIdFk } = newAllocation;
      await axios.post("https://localhost:44378/api/Alocates", {
        classIdFk,
        teacherIdFk,
      });
      setNewAllocation({ ...initialAllocationState });
      setIsTeacherSelected(false); // Reset teacher selection
      fetchAllocations();
    } catch (error) {
      console.error("Error creating allocation:", error);
    }
  };

  const handleUpdateAllocation = async () => {
    try {
      const { classIdFk, teacherIdFk } = newAllocation;
      await axios.put(
        `https://localhost:44378/api/Alocates/${selectedAllocation.id}`,
        { classIdFk, teacherIdFk }
      );
      setNewAllocation({ ...initialAllocationState });
      setIsEditing(false);
      setSelectedAllocation(null);
      fetchAllocations();
    } catch (error) {
      console.error("Error updating allocation:", error);
    }
  };

  const handleDeleteAllocation = async (id) => {
    try {
      await axios.delete(`https://localhost:44378/api/Alocates/${id}`);
      fetchAllocations();
    } catch (error) {
      console.error("Error deleting allocation:", error);
    }
  };

  const fetchAllocations = async () => {
    try {
      const allocationResponse = await axios.get(
        "https://localhost:44378/api/Alocates"
      );
      setAllocations(allocationResponse.data);
    } catch (error) {
      console.error("Error fetching allocations:", error);
    }
  };

  const handleEditAllocation = (allocation) => {
    setSelectedAllocation(allocation);
    setNewAllocation({ ...allocation });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedAllocation(null);
    setNewAllocation({ ...initialAllocationState });
    setIsTeacherSelected(false);
  };

  return (
    <div className="create-edit-subject2">
      <h2>Class Allocation</h2>

      {/* Class Allocation Form */}
      <div>
        <div>
          <label>Teacher:</label>
          <select
            style={{
              width: "300px",
              marginLeft: "35px",
              height: "30px",
            }}
            value={newAllocation.teacherIdFk}
            onChange={(e) => {
              setNewAllocation({
                ...newAllocation,
                teacherIdFk: e.target.value,
              });
              setIsTeacherSelected(true); // Teacher selected, enable "Save" button
            }}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} ${teacher.lastName}`}
              </option>
            ))}
          </select>{" "}
          <br></br>
          {isTeacherSelected && !isEditing && (
            <button
              style={{
                width: "150px",
                marginLeft: "7px",
                height: "35px",
              }}
              onClick={handleCreateAllocation}
            >
              Save
            </button>
          )}
        </div>
        <br></br>
        <div>
          <label>Class Room:</label>
          <select
            style={{
              width: "300px",
              marginLeft: "10px",
              height: "30px",
            }}
            value={newAllocation.classIdFk}
            onChange={(e) =>
              setNewAllocation({ ...newAllocation, classIdFk: e.target.value })
            }
          >
            <option value="">Select Class Room</option>
            {classRooms.map((classRoom) => (
              <option key={classRoom.id} value={classRoom.id}>
                {classRoom.cLassName}
              </option>
            ))}
          </select>
          {!isEditing && (
            <button
              style={{
                width: "150px",
                marginLeft: "7px",
                height: "35px",
              }}
              onClick={handleCreateAllocation}
            >
              Allocate
            </button>
          )}
        </div>
        <div>
          {isEditing && (
            <>
              <button onClick={handleUpdateAllocation}>Update</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Class Allocation List */}
      <div>
        <h2>Class Allocation List</h2>
        <div className="allocation-list">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Class Room</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.id}>
                  <td>
                    {
                      classRooms.find((cr) => cr.id === allocation.classIdFk)
                        ?.cLassName
                    }
                  </td>
                  <td className="allocation-actions">
                    <button
                      style={{
                        width: "150px",
                        marginLeft: "7px",
                        height: "35px",
                      }}
                      onClick={() => handleDeleteAllocation(allocation.id)}
                    >
                      Dealocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllocateClassRoom;
