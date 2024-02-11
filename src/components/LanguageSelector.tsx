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
      <SelectTrigger>
        <SelectValue placeholder='Language'/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en-US">English</SelectItem>
          <SelectSeparator />
          <SelectItem value="pt-BR">Português</SelectItem>
          <SelectSeparator />
          <SelectItem value="es-ES">Español</SelectItem>
          <SelectSeparator />
        </SelectGroup>
        <SelectScrollUpButton />
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
};
