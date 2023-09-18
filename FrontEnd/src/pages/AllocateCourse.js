import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/Table.css";

function AllocateCourse() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialCourseState = {
    deptIdFk: "",
    teacherIdFk: "",
  };

  const [newCourse, setNewCourse] = useState({ ...initialCourseState });
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get(
          "https://localhost:44378/api/Teachers"
        );
        const subjectResponse = await axios.get(
          "https://localhost:44378/api/Subjects"
        );
        const courseResponse = await axios.get(
          "https://localhost:44378/api/Courses"
        );

        setTeachers(teacherResponse.data);
        setSubjects(subjectResponse.data);
        setCourses(courseResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCourse = async () => {
    try {
      const { deptIdFk, teacherIdFk } = newCourse;
      await axios.post("https://localhost:44378/api/Courses", {
        deptIdFk,
        teacherIdFk,
      });
      setNewCourse({ ...initialCourseState });
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const { deptIdFk, teacherIdFk } = newCourse;
      await axios.put(
        `https://localhost:44378/api/Courses/${selectedCourse.id}`,
        { deptIdFk, teacherIdFk }
      );
      setNewCourse({ ...initialCourseState });
      setIsEditing(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`https://localhost:44378/api/Courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const courseResponse = await axios.get(
        "https://localhost:44378/api/Courses"
      );
      setCourses(courseResponse.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setNewCourse({ ...course });
    setIsEditing(true);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSaveTeacher = () => {
    // You can add validation here to ensure a teacher is selected before saving.
    console.log("Teacher saved:", selectedTeacher);
  };

  const handleAllocate = () => {
    if (selectedTeacher && selectedDepartment) {
      setNewCourse({
        ...newCourse,
        deptIdFk: selectedDepartment,
        teacherIdFk: selectedTeacher,
      });

      if (isEditing) {
        handleUpdateCourse();
      } else {
        handleCreateCourse();
      }
    } else {
      console.error("Please select both a teacher and a subject.");
    }
  };

  return (
    <div className="create-edit-subject2">
      <h2>Teacher Details</h2>
      <div>
        <div>
          <label>Teacher:</label>
          <select
            style={{
              width: "300px",
              marginLeft: "30px",
              height: "30px",
            }}
            value={selectedTeacher}
            onChange={handleTeacherChange}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} ${teacher.lastName}`}
              </option>
            ))}
          </select>
          <button
            style={{
              width: "150px",
              marginLeft: "7px",
              height: "35px",
            }}
            onClick={handleSaveTeacher}
          >
            Save Teacher
          </button>
        </div>
        <br></br>
        <br></br>
        <h2>Alocatd subjects </h2>
        <div>
          <label>Subject:</label>
          <select
            style={{
              width: "300px",
              marginLeft: "31px",
              marginTOP: "px",
              height: "30px",
            }}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div>
          {isEditing ? (
            <>
              <button onClick={handleUpdateCourse}>Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button
              style={{
                width: "150px",
                marginLeft: "84px",
                marginTop: "30px",
                height: "35px",
              }}
              onClick={handleAllocate}
            >
              Allocate
            </button>
          )}
        </div>
      </div>
      <br></br>
      <div>
        <div className="course-list">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    {`${
                      teachers.find((t) => t.id === course.teacherIdFk)
                        ?.firstName
                    } ${
                      teachers.find((t) => t.id === course.teacherIdFk)
                        ?.lastName
                    }`}
                  </td>
                  <td>
                    {
                      subjects.find((s) => s.id === course.deptIdFk)
                        ?.subjectName
                    }
                  </td>
                  <td className="course-actions">
                    <button onClick={() => handleDeleteCourse(course.id)}>
                      Deallocate
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

export default AllocateCourse;
