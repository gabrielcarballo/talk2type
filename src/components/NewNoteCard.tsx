export const NewNoteCard = () => {
  return (
    <div className="rounded-md bg-slate-700 p-5 space-y-3 overflow-hidden relative">
          <span className='text-sm font-medium text-slate-200'>Add Note</span>
          <p className='text-sm leading-6 text-slate-400'>Start recording to convert to text</p>
          <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </div>
  )
}