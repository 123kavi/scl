import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  } else {
    return age;
  }
}

function StudentCreate() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactPerson: "",
    contactNo: "",
    emailAddress: "",
    dob: "",
    classIdFk: "", 
  });

  const [classList, setClassList] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  const printRef = useRef(null);

  useEffect(() => {
    // Fetch classroom data for the dropdown
    axios
      .get("https://localhost:44378/api/ClassRooms")
      .then((response) => {
        setClassList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classroom data:", error);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "dob") {
      const age = calculateAge(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value, age });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new student
    axios
      .post("https://localhost:44378/api/Students", formData)
      .then((response) => {
        setSubmittedData(response.data); 
        axios
          .get(`https://localhost:44378/api/Students/${response.data.id}`)
          .then((studentResponse) => {
            setStudentInfo(studentResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching student data by ID:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  const handlePrint = () => {
    if (printRef.current) {
      html2canvas(printRef.current).then((canvas) => {
        const pdf = canvas.toDataURL("image/png");
        const printWindow = window.open("", "", "width=600,height=600");
        printWindow.document.open();
        printWindow.document.write(
          `<html><head><title>Print Student Information</title></head><body><img src="${pdf}" /></body></html>`
        );
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
      });
    }
  };

  return (
    <div className="create-edit-subject2">
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter First Name"
          />
        </div>
        <br />
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter Last Name"
          />
        </div>
        <br />
        <div>
          <label>Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            placeholder="Enter Contact Person"
          />
        </div>
        <br />
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <label>Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            placeholder="Enter Contact No"
          />
        </div>
        <br />
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            placeholder="Enter Email Address"
          />
        </div>
        <br />
        <div>
          <label>Classroom:</label>
          <select
            name="classIdFk"
            value={formData.classIdFk}
            onChange={handleChange}
          >
            <option value="">Select Classroom</option>
            {classList.map((classRoom) => (
              <option key={classRoom.id} value={classRoom.id}>
                {classRoom.cLassName}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit">Create</button>
      </form>

      {submittedData && (
        <div className="submitted-data" ref={printRef}>
          <h3>Submitted Information:</h3>
          <p>First Name: {submittedData.firstName}</p>
          <p>Last Name: {submittedData.lastName}</p>
          <p>Contact Person: {submittedData.contactPerson}</p>
          <p>Date of Birth: {submittedData.dob}</p>
          <p>Age: {submittedData.age}</p>
          <p>Contact No: {submittedData.contactNo}</p>
          <p>Email Address: {submittedData.emailAddress}</p>
          <p>Classroom: {submittedData.classIdFk}</p>
        </div>
      )}

      {studentInfo && (
        <div className="student-info">
          <h3>Fetched Student Information:</h3>
          <p>First Name: {studentInfo.firstName}</p>
          <p>Last Name: {studentInfo.lastName}</p>
          <p>Contact Person: {studentInfo.contactPerson}</p>
          <p>Date of Birth: {studentInfo.dob}</p>
          <p>Age: {studentInfo.age}</p>
          <p>Contact No: {studentInfo.contactNo}</p>
          <p>Email Address: {studentInfo.emailAddress}</p>
          <p>Classroom: {studentInfo.classIdFk}</p>
        </div>
      )}

      {submittedData && <button onClick={handlePrint}>Print as PDF</button>}
    </div>
  );
}

export default StudentCreate;
