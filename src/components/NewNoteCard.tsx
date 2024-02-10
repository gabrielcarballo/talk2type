import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export const NewNoteCard = () => {
  return (
    <Dialog.Root>

      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-y-3 text-left overflow-hidden relative hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className='text-sm font-medium text-slate-200'>Add Note</span>
        <p className='text-sm leading-6 text-slate-400'>Start recording to convert to text</p>
        <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'>
          <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none'>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className='text-sm font-medium text-slate-300'>d</span>
              <p className='text-sm leading-6 text-slate-400'>Start <button className='text-lime-400 hover:underline font-medium'>recording a note</button> or <button className='text-lime-400 hover:underline font-medium'>use text</button> just  if you like</p>
            </div>
            <button
              className='w-full bg-lime-400 py-4 text-center text-sm text-slate-300 outline-none font-medium group hover:bg-lime-500'
              type="button">
              <span className="text-lime-950 group-hover:underline">Save note</span>
            </button>
            <Dialog.Close className='absolute top-5 right-5 text-slate-300 hover:text-slate-100'>
              <X className='size-5 hover:text-slate-100' />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}