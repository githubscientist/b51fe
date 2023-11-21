import React, { useState } from 'react';
import axios from 'axios';

function LoggedInPage({ user, setUser, token, setToken }) {

  const [newNote, setNewNote] = useState('');

    const onLogout = () => {

        setUser(null);
        setToken(null);
    }
  
  const addNote = async (e) => {
    e.preventDefault();

    // prepare the token object (authorization header)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const newNoteObject = {
      content: newNote
    }

    console.log('Adding note...');
    try {
      const response = await axios.post('http://localhost:3001/api/notes', newNoteObject, config);
      console.log('Note added successfully');
      console.log(response.data);
      setNewNote('');
    } catch (e) {
      console.log('Error adding note', e);
    }
  }

  return (
      <div>
        <p>Welcome, {user.name}! <button onClick={onLogout}>logout</button></p>
      
      <form onSubmit={addNote}>
        <input 
          type='text'
          placeholder='enter a new note...'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          required
        />
        <button type='submit'>save</button>
        </form>
    </div>
  )
}

export default LoggedInPage;