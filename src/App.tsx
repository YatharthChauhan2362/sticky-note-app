import React, { useState } from 'react';

interface Note {
  id: number;
  text: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleAddNote = () => {
    const newNoteObject: Note = {
      id: notes.length + 1,
      text: newNote,
    };
    setNotes([...notes, newNoteObject]);
    setNewNote('');
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleSaveEdit = () => {
    if (editingNote) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editingNote.id) {
          return { ...note, text: newNote };
        }
        return note;
      });
      setNotes(updatedNotes);
      setEditingNote(null);
      setNewNote('');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sticky Note App</h1>
      <div className="flex flex-wrap justify-center mb-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-yellow-200 w-64 h-64 rounded-lg p-4 m-2 shadow-md relative"
          >
            {editingNote && editingNote.id === note.id ? (
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full h-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="break-words">{note.text}</p>
            )}
            <div className="absolute bottom-2 right-2 flex">
              <button
                onClick={() => handleEditNote(note)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add new note"
        />
        {editingNote ? (
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          >
            Save Edit
          </button>
        ) : (
          <button
            onClick={handleAddNote}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          >
            Add Note
          </button>
        )}
      </div>
      <footer className="text-gray-600 text-sm">
        &copy; 2023 Yatri Cloud
      </footer>
    </div>
  );
}

export default App;