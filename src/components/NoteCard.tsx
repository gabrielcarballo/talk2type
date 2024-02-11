import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'

interface NoteCardProps {
  note:
  {
    id: string;
    noteContent: NoteContent;
    date: Date;
  }
  onNoteDeleted: (id: string) => void;
}

type NoteContent = {
  title: string;
  content: string;
}

export const NoteCard = ({ note, onNoteDeleted }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { addSuffix: true })} </span>
        <p className='text-xl leading-6 text-slate-100 overflow-wrap '>{note.noteContent?.title}</p>
        <p className='text-sm leading-6 text-slate-400 overflow-wrap '>{note.noteContent?.content}</p>
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'>
          <Dialog.Content className='fixed inset-0 md:inset-auto overflow-y-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none'>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className='text-sm font-medium text-slate-300'>{formatDistanceToNow(note.date, { addSuffix: true })}</span>
              <p className='text-2xl leading-6 text-slate-100 overflow-wrap '>{note.noteContent?.title}</p>
              <p className='text-sm leading-6 text-slate-400 overflow-wrap ' >{note.noteContent?.content}</p>
            </div>
            <button
              className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
              type="button">
              <span className="text-red-400 group-hover:underline" onClick={() => onNoteDeleted(note.id)}>Delete this note?</span>
            </button>
            <Dialog.Close className='absolute top-5 right-5 text-slate-300 hover:text-slate-100'>
              <X className='size-5 hover:text-slate-100'/>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
