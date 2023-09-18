import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";
import MenuBook from '@mui/icons-material/MenuBook';

function Button() {
  return (
    <Link to="">
      <button className="btn"><MenuBook/></button>
    </Link>
  );
}

export default Button;