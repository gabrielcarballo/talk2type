import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { useState } from 'react';

interface Note {
  id: string;
  noteContent: NoteCardProps;
  date: Date;
}

type NoteCardProps = {
  title: string;
  content: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes') as string) : []);
  const [search, setSearch] = useState('');

  const onNoteCreated = (noteContent: NoteCardProps) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      noteContent,
      date: new Date()
    }
    console.log(newNote);
    const newNotesArray = [newNote, ...notes];
    console.log(newNotesArray);
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
  const filteredNotes = search !== '' ? notes.filter((note) => note.noteContent.content.toLowerCase().includes(search.toLowerCase())) : notes;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
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
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  )
}
