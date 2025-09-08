import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../../../../components/ui/input";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { LanguageSelector } from "../../../../components/LanguageSelector";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

interface NodeListSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const NodeListSection = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }: NodeListSectionProps): JSX.Element => {
  const { t } = useLanguage();

  // Execute logic whenever activeTab changes
  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
    
    // Add your custom logic here
    // For example:
    // - Clear search when switching tabs
    // - Load different data
    // - Update analytics
    // - Reset filters
    
    // Example: Clear search when switching to Ecosystem tab
    if (activeTab === 'Ecosystem') {
      setSearchQuery('');
    }
    
  }, [activeTab, setSearchQuery]);

  const navigationTabs = [
    { label: "All Nodes", key: "nav.allNodes" },
    { label: "nilDB", key: "nav.nilDB" },
    { label: "nilAI", key: "nav.nilAI" },
    { label: "Validators", key: "nav.validators" },
    { label: "Ecosystem", key: "nav.ecosystem" },
  ];

  return (
    <section className="flex items-end justify-between pl-6 pr-4 py-4 relative self-stretch w-full flex-[0_0_auto] z-[1]">
      <div className="flex flex-col w-[523.54px] items-start gap-6 relative">
        <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
          <nav className="inline-flex items-center gap-4 pl-px pr-0 py-0 relative flex-[0_0_auto]">
            <img
              className="relative w-[13.08px] h-[13.57px]"
              alt="Nillion"
              src="/img/nillion_white_black.jpg"
            />

            <img
              className="w-px h-[13px] relative object-cover"
              alt="Line"
              src="data:image/svg+xml,%3Csvg width='1' height='13' viewBox='0 0 1 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0.5' y1='0' x2='0.5' y2='13' stroke='%23ffffff' stroke-opacity='0.2'/%3E%3C/svg%3E"
            />

            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <h1 className="relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base tracking-[-0.32px] leading-[20.8px] whitespace-nowrap">
                {t('nav.dashboard')}
              </h1>
            </div>
          </nav>

          <p className="relative w-fit opacity-60 [font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px] whitespace-nowrap">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <nav className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
          {navigationTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className="inline-flex items-center gap-1 relative flex-[0_0_auto] cursor-pointer"
            >
              <span
                className={`relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm tracking-[0] leading-[18.2px] whitespace-nowrap ${activeTab !== tab.label ? "opacity-60" : ""}`}
              >
                {t(tab.key)}
              </span>

              <div
                className={`absolute h-px top-[33px] left-0 bg-[#93a2ff] ${activeTab === tab.label ? "opacity-100" : "opacity-0"}`}
                style={{
                  width:
                    tab.label === "All Nodes"
                      ? "67px"
                      : tab.label === "nilDB"
                        ? "37px"
                        : tab.label === "nilAI"
                          ? "31px"
                          : tab.label === "Validators"
                            ? "69px"
                            : "75px",
                }}
              />
            </button>
          ))}
        </nav>
      </div>

      <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
        <div className="flex w-[350px] gap-3 px-3 py-2 bg-[#ffffff12] border border-solid border-[#292929] items-center relative rounded-[100px]">
          <SearchIcon className="relative w-4 h-4 text-white opacity-40" />

          <Input
            className="relative w-fit mt-[-1.00px] opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={t('dashboard.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <LanguageSelector />
      </div>
    </section>
  );
};
