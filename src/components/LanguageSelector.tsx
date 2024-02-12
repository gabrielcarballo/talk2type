import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from '@/components/ui/select';


interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  return (
    <Select onValueChange={onLanguageChange}>
      <SelectTrigger className='h-6 w-1/5 text-slate-200'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent className='text-slate-200'>
        <SelectGroup>
          <SelectItem className='focus:bg-slate-900' value="pt-BR">Português</SelectItem>
          <SelectSeparator />
          <SelectItem className='focus:bg-slate-900' value="en-US">English</SelectItem>
          <SelectSeparator />
          <SelectItem className='focus:bg-slate-900' value="es-ES">Español</SelectItem>
          <SelectSeparator />
        </SelectGroup>
        <SelectScrollUpButton />
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
};
