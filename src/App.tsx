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
  const [notes, setNotes] = useState<Note[]>([]);

  const onNoteCreated = (newNote: string) => {
    setNotes([{ id: crypto.randomUUID(), content: newNote, date: new Date() }, ...notes, ]);
  }
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} />
      <form>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
        />

      </form>
      <div className='h-px bg-slate-700' />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated}/>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
