import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoggedInPage({ user, setUser, token, setToken, isRegistered, setIsRegistered }) {

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    // prepare the token object (authorization header)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    console.log('Fetching notes...');
    try {
      const response = await axios.get('http://localhost:3001/api/notes', config);

      console.log('Notes fetched successfully');
      console.log(response.data);

      setNotes(response.data);

    } catch (e) {
      console.log('Error fetching notes', e);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const onLogout = () => {

    setUser(null);
    setToken(null);

    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');

    setIsRegistered(true);
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
      fetchNotes();
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
      
      <ul>
        {
          notes.map(note => <li key={note._id}>{note.content}</li>)
        }
      </ul>
    </div>
  )
}

export default LoggedInPage;