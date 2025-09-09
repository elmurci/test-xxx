import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 bg-[#ffffff12] border border-solid border-[#292929] rounded-[100px] text-white hover:bg-[#ffffff20] transition-all duration-200"
      >
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-sm whitespace-nowrap">
          {currentLanguage?.name}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black border border-solid border-[#292929] rounded-xl shadow-lg z-[99999] min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[#ffffff12] transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                language === lang.code ? 'bg-[#93a2ff1a] text-[#93a2ff]' : 'text-white'
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-sm">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-[99998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};