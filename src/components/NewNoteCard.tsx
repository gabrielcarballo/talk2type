import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'
import { LanguageSelector } from './LanguageSelector';

interface NewNoteCardProps {
  onNoteCreated: (newNote: NoteCardProps) => void;
}

type NoteCardProps = {
  title: string;
  content: string;
  language: LanguageOptions;
}

type LanguageOptions = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE';

let recognition: SpeechRecognition | null = null;

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const initialContent: NoteCardProps = { title: '', content: '', language: 'pt-BR' };

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [noteContent, setNoteContent] = useState<NoteCardProps>(initialContent);
  const [isRecording, setIsRecording] = useState(false);


  const handleStart = () => {
    setShouldShowOnboarding(false);
  }

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent({ ...noteContent, content: e.target.value });
    e.target.textLength === 0 ? setShouldShowOnboarding(true) : null;
  }

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent({ ...noteContent, title: e.target.value });
  }

  const handleSavedNote = (e: FormEvent) => {
    e.preventDefault();
    if (shouldShowOnboarding || noteContent.content === '') return toast.error('You forgot to add your note, SpongeBob!')
    toast.success('Yay! Note saved! 🎉');
    onNoteCreated(noteContent);
    setShouldShowOnboarding(true);
    setNoteContent(initialContent);
  }

  const resetNotes = () => {
    setShouldShowOnboarding(true);
    setNoteContent(initialContent);
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
    recognition.lang = noteContent.language;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setNoteContent({ ...noteContent, content: transcription });
    }

    recognition.onerror = (event) => {
      console.error(event.error)
    }
    recognition.start();
  }

  const handleStopRecording = () => {
    setIsRecording(false);
    if (noteContent.content !== '') toast.info('Recording stopped! 🛑');
    recognition?.stop();
    setNoteContent({ ...noteContent, content: noteContent.content });

  }

  const handleLanguageChange = (language: string) => {
    setNoteContent({ ...noteContent, language: language as LanguageOptions });
    console.log(noteContent.language);
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
          <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none'>

            <Dialog.Close className='absolute top-5 right-5 text-slate-300 hover:text-slate-100'>
              <X className='size-5 hover:text-slate-100' onClick={resetNotes} />
            </Dialog.Close>
            <form className='flex-1 flex flex-col'>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className='text-sm font-medium text-slate-300'>Add Note</span>
                {shouldShowOnboarding ?
                <div>
                  <p className='text-sm leading-6 text-slate-400'>Start <button type='button' className='text-lime-400 hover:underline font-medium' onClick={handleStartRecording}>recording a note</button> or <button type='button' className='text-lime-400 hover:underline font-medium' onClick={handleStart}>use text</button> if you like</p>
                  <LanguageSelector onLanguageChange={handleLanguageChange}/>
                </div> :
                  <>
                    <textarea placeholder='Add Title' value={noteContent.title} onChange={handleTitleChange} className='text-2xl leading-6 text-slate-100 bg-transparent h-auto flex  resize-none outline-none' />
                    <textarea autoFocus className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' placeholder='Type your note here...' onChange={handleContent} value={noteContent.content} />
                  </>}
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