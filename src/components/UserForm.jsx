import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    window.history.pushState({}, '', '/quiz');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your name" 
          onChange={(e) => setInputName(e.target.value)} 
          value={inputName}
          required
        />
        <button type="submit">Ready!</button>
      </form>
  );
}
