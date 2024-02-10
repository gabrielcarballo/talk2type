import logo from './assets/logo-nlw.svg';
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';

const note = {
  content: 'texto 1',
  date: new Date()
}
const note2 = {
  content: 'texto 2',
  date: new Date()
}

export function App() {
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
        <NewNoteCard />
        <NoteCard note={note}/>
        <NoteCard note={note2}/>
      </div>
    </div>
  )
}
