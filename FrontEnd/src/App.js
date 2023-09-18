import React from "react";
import "../src/components/style/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import AddSubject from "./pages/AddSubject";
import AddTeacher from "./pages/AddTeacher";
import AllocateCourse from "./pages/AllocateCourse";
import AddClassRoom from "./pages/AddClassRoom";
import StudentCreate from "./pages/StudentCreate";
import ClassRoomManager from "./pages/ClassRoomManager";
import AllocateClassRoom from "./pages/AllocateClassRoom";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>

          <Route path="/AddSubject" component={AddSubject}></Route>
          <Route path="/AddTeacher" component={AddTeacher}></Route>
          <Route path="/AllocateCourse" component={AllocateCourse}></Route>
          <Route path="/AddClassRoom" component={AddClassRoom}></Route>
          <Route
            path="/AllocateClassRoom"
            component={AllocateClassRoom}
          ></Route>
          <Route path="/ClassRoomManager" component={ClassRoomManager}></Route>

          <Route path="/StudentCreate" component={StudentCreate}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
