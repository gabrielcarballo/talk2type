import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (newNote: string) => void;
}

let recognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleStart = () => {
    setShouldShowOnboarding(false);
  }

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.textLength === 0 ? setShouldShowOnboarding(true) : null;
  }

  const handleSavedNote = (e: FormEvent) => {
    e.preventDefault();
    if (shouldShowOnboarding || content === '') return toast.error('You forgot to add your note, SpongeBob!')
    toast.success('Yay! Note saved! 🎉');
    onNoteCreated(content);
    setShouldShowOnboarding(true);
    setContent('');
  }

  const handleStartRecording = () => {
    const isSpeechRecognitionAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    if (!isSpeechRecognitionAvailable) {
      toast.error('Speech recognition is not available in your browser. Please use Chrome or Edge.')
      setIsRecording(false);
      return;
    }
    isRecording ? toast.info('Calm down, bro. It is recording') : toast.info('Recording started! 🎙️');
    setIsRecording(true);
    setShouldShowOnboarding(false);

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription);
    }

    recognition.onerror = (event) => {
      console.error(event.error)
    }
    recognition.start();
  }

  const handleStopRecording = () => {
    setIsRecording(false);
    if (content !== '') toast.info('Recording stopped! 🛑');
    recognition?.stop();
    setShouldShowOnboarding(true);
    setContent(content);

  }
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

            <Dialog.Close className='absolute top-5 right-5 text-slate-300 hover:text-slate-100'>
              <X className='size-5 hover:text-slate-100' />
            </Dialog.Close>
            <form className='flex-1 flex flex-col'>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className='text-sm font-medium text-slate-300'>Add Note</span>
                {shouldShowOnboarding ?
                  <p className='text-sm leading-6 text-slate-400'>Start <button type='button' className='text-lime-400 hover:underline font-medium' onClick={handleStartRecording}>recording a note</button> or <button type='button' className='text-lime-400 hover:underline font-medium' onClick={handleStart}>use text</button> if you like</p> :
                  <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' placeholder='Type your note here...' onChange={handleContent} value={content} />}
              </div>
              {isRecording ? (
                <button
                  className='w-full bg-slate-900 py-4 flex justify-center items-center gap-2 text-center text-sm text-slate-300 outline-none font-medium group hover:text-red-500'
                  type="button"
                  onClick={handleStopRecording}
                >
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="group-hover:underline">
                    Recording... Click to stop</span>
                </button>
              ) : (
                <button
                  className='w-full bg-lime-400 py-4 text-center text-sm text-slate-300 outline-none font-medium group hover:bg-lime-500'
                  type="button"
                  onClick={handleSavedNote}
                >
                  <span className="text-lime-950 group-hover:underline">Save note</span>
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}