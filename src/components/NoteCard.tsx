// interface NoteCardProps {}

export const NoteCard = () => {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className='text-sm font-medium text-slate-300'>Add Note</span>
          <p className='text-sm leading-6 text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus distinctio nulla ratione debitis, dolor in aut repudiandae aperiam blanditiis at. Odio eligendi dolores iste aperiam praesentium, illum labore placeat modi.</p>
          <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </button>
  )
}
