import React from 'react';
import { Link } from "react-router-dom";

export default function Header({onReset}) {

  return (
    <header>
      <h1>Cats Quiz</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <a onClick={onReset}>Restart</a>
      </nav>
    </header>
  );
}
