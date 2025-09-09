import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { EcosystemSection } from "./EcosystemSection";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { DatabaseIcon, FileTextIcon, UsersIcon, Info } from "lucide-react";
import { nodeData } from "../../../../data";
import { WorldMap } from "../../../../components/WorldMap";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
import { VennDiagram } from "../../../../components/VennDiagram";
import { useState } from "react";

const timeRangeOptions = [
  { value: "7D", key: "time.7d" },
  { value: "30D", key: "time.30d" },
  { value: "ALL", key: "time.all" },
];
const chartLabels = ["Aug 8", "Aug 10", "Aug 13", "Aug 15"];
const statisticsData = [
  {
    id: 1,
    icon: UsersIcon,
    value: "9.7K",
    label: "Users",
    color: "#93a2ff",
    bgColor: "bg-[#93a2ff]",
    disclaimer: ["Approximate number.", "Data not always available."],
  },
  {
    id: 2,
    icon: FileTextIcon,
    value: "458.6M",
    label: "Total Documents",
    color: "#5fe9b5",
    bgColor: "bg-[#5fe9b5]",
    period: "7D",
    growth: "+10.9M",
  },
  {
    id: 3,
    icon: DatabaseIcon,
    value: "214.32 GB",
    label: "Total Storage",
    color: "#ffc593",
    bgColor: "bg-[#ffc593]",
    period: "7D",
    growth: "+9.20 GB",
  },
];
const fes = nodeData.fes;
const internalApps = nodeData.apps;

const allNodesData = [...nodeData.nodes].sort((a, b) => {
  const nameA = (a.node_type === "nilchain" ? a.moniker : a.organization) || "";
  const nameB = (b.node_type === "nilchain" ? b.moniker : b.organization) || "";
  return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
});

interface NodeDetailsSectionProps {
  activeTab: string;
  searchQuery: string;
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string) => void;
}

export const NodeDetailsSection = ({ activeTab, searchQuery, selectedNodeId, setSelectedNodeId }: NodeDetailsSectionProps): JSX.Element => {
  const [timeRange, setTimeRange] = useState("7D");
  const { t } = useLanguage();
  
  // If Ecosystem tab is active, render a completely new page
  if (activeTab === "Ecosystem") {
    return (
      <div>
        <section className="flex items-start gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] z-[2]">
        <div className="flex-1 grow rounded-2xl flex flex-col items-start relative">
          <header className="inline-flex items-center justify-center gap-2.5 pt-2 pb-4 px-2 relative flex-[0_0_auto]">
            <h2 className="relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-2xl tracking-[-0.48px] leading-[31.2px] whitespace-nowrap">
              Nillion Ecosystem
            </h2>
          </header>

          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
            className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-[#ffffff12] rounded-[100px] overflow-hidden border border-solid border-[#292929] h-auto"
          >
            {timeRangeOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className={`inline-flex justify-center gap-2.5 px-4 py-1 flex-[0_0_auto] items-center relative rounded-[100px] h-auto ${
                  timeRange === option.value
                    ? "bg-white text-black data-[state=on]:bg-white data-[state=on]:text-black"
                    : "bg-transparent text-white data-[state=on]:bg-transparent data-[state=on]:text-white"
                }`}
              >
                <span className="relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
                  {t(option.key)}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto] mt-4">
            <Card className="flex items-center gap-6 p-4 relative flex-1 grow bg-[#ffffff12] rounded-xl border border-solid border-[#ffffff1a]">
              <CardContent className="flex items-center gap-6 p-0 w-full">
                <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xl tracking-[-0.40px] leading-[26px] whitespace-nowrap">
                    {fes.length}
                  </div>

                  <div className="relative w-fit [font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px] whitespace-nowrap">
                    FEs
                  </div>
                </div>

                <div className="inline-flex items-center relative flex-[0_0_auto]">
                  {fes.map((fe, index) => (
                    <Avatar
                      key={index}
                      className="relative w-6 h-6 -ml-1.5 first:ml-0 rounded-[100px] border border-solid border-[#ffffff33]"
                    >
                      <AvatarImage
                        src={fe.logo}
                        alt={fe.organization}
                        className="object-cover"
                      />
                    </Avatar>
                  ))}

                  <div className="relative w-6 h-6 -ml-1.5 rounded-[100px] overflow-hidden border border-solid border-[#121212] bg-[linear-gradient(0deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.2)_100%),linear-gradient(0deg,rgba(18,18,18,1)_0%,rgba(18,18,18,1)_100%)]">
                    <div className="absolute h-4 top-[3px] left-1 [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xs text-center tracking-[0] leading-[15.6px] whitespace-nowrap">
                      +5
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex items-center gap-6 p-4 relative flex-1 grow bg-[#ffffff12] rounded-xl border border-solid border-[#ffffff1a]">
              <CardContent className="flex items-center gap-6 p-0 w-full">
                <div className="flex flex-col items-start gap-1 relative flex-1 grow">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xl tracking-[-0.40px] leading-[26px] whitespace-nowrap">
                    {internalApps.length}
                  </div>

                  <div className="relative w-fit [font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px] whitespace-nowrap">
                    Apps
                  </div>
                </div>

                <div className="inline-flex items-center relative flex-[0_0_auto]">
                  {internalApps.map((app, index) => (
                    <Avatar
                      key={index}
                      className="relative w-6 h-6 -ml-1.5 first:ml-0 rounded-[100px] border border-solid border-[#ffffff33]"
                    >
                      <AvatarImage
                        src={app.logo}
                        alt={app.organization}
                        className="object-cover"
                      />
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-start gap-4 pt-0 pb-4 px-4 relative flex-1 self-stretch w-full grow z-[1]">
              {statisticsData.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={stat.id}
                    className="flex flex-col items-center justify-center gap-6 px-10 py-6 relative flex-1 self-stretch grow bg-[#ffffff12] rounded-2xl overflow-hidden border border-solid border-[#ffffff1a]"
                  >
                    <div
                      className={`absolute w-[916px] h-[916px] top-[-760px] left-[-229px] ${stat.bgColor} rounded-[458px] blur-[150px] opacity-20`}
                    />
        
                    <CardContent className="flex flex-col items-center justify-between relative flex-1 self-stretch w-full grow p-0 overflow-visible">
                      <div className="relative w-48 h-[133.96px] mt-[-24.00px] flex items-center justify-center">
                        <IconComponent
                          size={96}
                          style={{ color: stat.color }}
                          className="w-24 h-24"
                        />
                        {stat.disclaimer && (
                          <div className="absolute -top-2 -right-2 group">
                            <Info size={16} className="text-white opacity-40 hover:opacity-100 cursor-help" />
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black border border-white rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999]">
                              {stat.disclaimer.join(' ')}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
        
                      <div className="gap-1 self-stretch w-full flex-[0_0_auto] flex flex-col items-start relative">
                        <div
                          className="relative self-stretch mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-[40px] text-center tracking-[-0.80px] leading-[52px]"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>
        
                        <div className="relative self-stretch [font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm text-center tracking-[0] leading-[18.2px]">
                          {stat.label}
                        </div>
                      </div>
        
                      <div className="inline-flex flex-col items-center gap-1 relative flex-[0_0_auto]">
                        {stat.disclaimer ? (
                          <>
                            <div className="relative w-fit mt-[-1.00px] opacity-50 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
                              {stat.disclaimer[0]}
                            </div>
                            <div className="relative w-fit opacity-50 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
                              {stat.disclaimer[1]}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="relative w-fit mt-[-1.00px] opacity-50 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
                              {stat.period}
                            </div>
                            <div className="relative w-fit [font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xs tracking-[0] leading-[15.6px] whitespace-nowrap">
                              {stat.growth}
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
      </section>
      <section className="px-4 pb-6 overflow-visible">
        <div className="flex flex-col gap-6 overflow-visible">
          <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
            Ecosystem Overview
          </h3>
          
          <div className="flex items-center justify-center min-h-[400px] bg-[#ffffff08] rounded-2xl border border-solid border-[#ffffff1a] p-8 overflow-visible">
            <VennDiagram />
          </div>
        </div>
      </section>
      </div>
    );
  }

  // For other tabs, return null or empty content for now
  return null;
};