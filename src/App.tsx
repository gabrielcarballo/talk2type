import logo from './assets/logo-nlw.svg';
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { useState } from 'react';

interface Note {
  id: string;
  content: string;
  date: Date;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') as string) : []);
  const [search, setSearch] = useState('');

  const onNoteCreated = (content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      date: new Date()
    }

    const newNotesArray = [newNote, ...notes];
    setNotes(newNotesArray);
    localStorage.setItem('notes', JSON.stringify(newNotesArray));
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onNoteDeleted = (id: string) => {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    localStorage.setItem('notes', JSON.stringify(newNotesArray));
  }
  const filteredNotes = search !== '' ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase())) : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} />
      <form>
        <input
          type="text"
          placeholder='Search on your notes...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />

      </form>
      <div className='h-px bg-slate-700' />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        ))}
      </div>
    </div>
  )
}
