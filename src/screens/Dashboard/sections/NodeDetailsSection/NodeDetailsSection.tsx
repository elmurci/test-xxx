import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { EcosystemSection } from "./EcosystemSection";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { DatabaseIcon, FileTextIcon, UsersIcon } from "lucide-react";
import { nodeData } from "../../../../data";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";
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
        
                    <CardContent className="flex flex-col items-center justify-between relative flex-1 self-stretch w-full grow p-0">
                      <div className="relative w-48 h-[133.96px] mt-[-24.00px] flex items-center justify-center">
                        <IconComponent
                          size={96}
                          style={{ color: stat.color }}
                          className="w-24 h-24"
                        />
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
      </div>
    );
  }

  const getNodeData = () => {
    switch (activeTab) {
      case "nilDB":
        return getFilteredNodeDataByType("nildb");
      case "nilAI":
        return getFilteredNodeDataByType("nilcc");
      case "Validators":
        return getFilteredNodeDataByType("nilchain");
      case "Ecosystem":
        return ecosystemData;
      default:
        return allNodesData;
    }
  };

  const getFilteredNodeDataByType = (nodeType: string) => {
    return allNodesData.filter((node) => node.node_type.toLowerCase() === nodeType.toLowerCase());
  }

  const nodeData = getNodeData();
  
  // Filter nodes based on search query
  const filteredNodeData = nodeData.filter((node) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      node._id.toLowerCase().includes(query) ||
      node.location.toLowerCase().includes(query) ||
      node.operator.toLowerCase().includes(query) ||
      node.type.toLowerCase().includes(query)
    );
  });
  
  // Find selected node by ID, or fall back to first node if none selected
  const selectedNode = selectedNodeId 
    ? nodeData.find((node) => node._id === selectedNodeId) || filteredNodeData[0]
    : filteredNodeData[0];

  const getProductTypeBorder = (nodeType: string) => {
    switch (nodeType) {
      case 'nildb':
        return 'border-[#5fe9b566]';
      case 'nilcc':
        return 'border-[#f3a8ff66]';
      case 'nilchain':
        return 'border-[#ffc593]';
      default:
        return 'border-[#292929]';
    }
  };
  const getProductTypeColor = (nodeType: string) => {
    switch (nodeType) {
      case 'nildb':
        return 'text-[#5fe9b5]';
      case 'nilcc':
        return 'text-[#f3a8ff]';
      case 'nilchain':
        return 'text-[#ffc593]';
      default:
        return 'text-[#ffffff]';
    }
  };
  return (
    <div className="flex items-start relative flex-1 self-stretch w-full grow z-0">
      {/* Left Panel - Node Table */}
      <div className="items-start pt-6 pb-0 px-0 flex-1 self-stretch grow mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] bg-black border-[#292929] relative border border-solid">
        <table className="w-full border-collapse table-auto border-0 m-0 p-0">
          <thead>
          <tr>
              <th className="opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px] text-left pl-6 py-3">
                {t('table.nodeName')}
              </th>
              <th className="relative opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px]">
                {t('table.location')}
              </th>
              <th className="relative flex-1 opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px]">
                {t('table.cloud')}
              </th>
              <th className="relative flex-1 opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px]">
                {t('table.liveSince')}
              </th>
              <th className="relative w-[80px] opacity-40 [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-xs tracking-[0] leading-[15.6px]">
                {t('table.type')}
              </th>
            </tr>
          </thead>

              {filteredNodeData.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-white opacity-60 [font-family:'TWK_Everett-Light',Helvetica] font-light text-sm">
                    {t('search.noResults')} "{searchQuery}"
                  </div>
                </div>
              ) : (
                  <tbody>
                    {filteredNodeData.map((node, index) => (
                      <tr
                        key={node._id}
                        className={`cursor-pointer transition-all duration-200 border-b border-[#292929] last:border-b-0 ${
                          selectedNode?._id === node._id
                            ? "bg-[#93a2ff1a] border-l-2 border-l-[#93a2ff] hover:bg-[#93a2ff25]"
                            : "hover:bg-[#ffffff08]"
                        }`}
                        onClick={() => setSelectedNodeId(node._id)}
                      >
                        <td className="pl-6 py-3">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-7 h-7 rounded-full border border-solid border-[#ffffff1a] bg-cover bg-center overflow-hidden"
                              style={{ backgroundImage: `url(${node.logo})` }}
                            />
                            <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px] truncate">
                              {node.node_type === "nilchain" ? node.moniker : node.organization}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px]">
                            {node.city}, {node.country}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px]">
                            {node.cloud}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px] text-center">
                            {node.live_since ? new Date(node.live_since).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : ''}
                          </div>
                        </td>
                        <td className="py-3 text-center px-3">
                          <Badge
                            className={`items-center py-0.5 rounded border-solid ${getProductTypeBorder(node.node_type)} border h-auto`}
                          >
                            <div
                              className={`${getProductTypeColor(node.node_type)} [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs tracking-[0] leading-[15.6px] whitespace-nowrap text-center`}
                            >
                              {node.node_type}
                            </div>
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              )}

           </table>
        </div>

      {/* Right Panel - Node Details */}
      <aside className="flex flex-col w-[602px] items-start relative self-stretch mt-[-1.00px] mb-[-1.00px] mr-[-1.00px] bg-black border border-solid border-[#292929]">
        {selectedNode && (
          <>
          <header className="flex items-end justify-between px-4 py-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex w-[219.5px] items-center gap-2 relative">
              <h2 className="w-fit mt-[-1.00px] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-lg tracking-[-0.36px] leading-[23.4px] whitespace-nowrap relative text-white">
                {selectedNode?.moniker || selectedNode?.organization}
              </h2>
              <Badge
                className={`inline-flex items-center justify-center gap-2.5 px-1 py-0.5 flex-[0_0_auto] ${selectedNode?.typeBg} rounded border-solid ${selectedNode?.typeBorder} relative border h-auto`}
              >
                <div
                  className={`${selectedNode?.typeColor} relative w-fit [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs tracking-[0] leading-[15.6px] whitespace-nowrap`}
                >
                  {selectedNode?.type}
                </div>
              </Badge>
            </div>
            <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
              <div className="w-fit whitespace-nowrap relative [font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm tracking-[0] leading-[18.2px]">
                {selectedNode?.operator}
              </div>
              <div
                className="w-6 h-6 relative rounded-[100px] border border-solid border-[#ffffff1a] bg-cover bg-[50%_50%] overflow-hidden"
                style={{ backgroundImage: `url(${selectedNode?.operatorImage})` }}
              />
            </div>
          </header>

          <main className="flex flex-col items-start gap-4 pt-0 pb-4 px-0 relative flex-1 self-stretch w-full grow">
            {/* Node Status and Metrics */}
            <div className="flex flex-col gap-4 px-4 relative self-stretch w-full">
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60">
                        Status
                      </div>
                      <div className="w-2 h-2 bg-[#5fe9b5] rounded-full"></div>
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                      Online
                    </div>
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-[#5fe9b5] text-xs mt-1">
                      99.8% uptime
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-4">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-2">
                      Response Time
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                      12ms
                    </div>
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mt-1">
                      avg last 24h
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-3 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      CPU Usage
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                      23%
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-3 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      Memory
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                      4.2GB
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-3 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      Storage
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                      128GB
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="bg-[#292929] mx-4" />

            {/* Geographic Location */}
            <div className="flex flex-col gap-4 px-4 relative self-stretch w-full">
              <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                Geographic Location
              </h3>
              
              <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative w-full h-48 bg-[#0a0a0a] rounded-lg overflow-hidden">
                    {/* Proper World Map SVG */}
                    <svg
                      viewBox="0 0 1000 500"
                      className="w-full h-full"
                    >
                      {/* United States */}
                      <path
                        d="M158 206l-1-2-1-1-2-1h-2l-2 1-1 1v2l1 2 2 1h2l2-1 1-2zm-10-15l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-5-3l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-8 2l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-6 8l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-3 5l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-2 7l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm-1 8l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm0 9l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm1 10l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm3 11l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm5 12l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm8 13l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm11 14l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm15 15l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm19 16l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm24 17l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm29 18l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm35 19l-1-1h-1l-1 1v1l1 1h1l1-1v-1zm41 20l-1-1h-1l-1 1v1l1 1h1l1-1v-1z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Canada */}
                      <path
                        d="M158 120l50-10 60-5 70 0 80 5 90 10 85 15 75 20 60 25 40 30 15 35-5 40-25 45-45 50-65 55-85 60-105 65h-125l-145-5-165-10-185-15-205-20-225-25-245-30z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Brazil */}
                      <path
                        d="M280 320l40-20 50-15 60-10 70-5 80 0 90 5 85 10 75 15 60 20 40 25 15 30-5 35-25 40-45 45-65 50-85 55h-105l-125-5-145-10z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Europe */}
                      <path
                        d="M480 150l30-10 40-5 50 0 60 5 70 10 65 15 55 20 40 25 20 30 0 35-20 40-40 45-60 50h-80l-100-5-120-10-140-15z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Africa */}
                      <path
                        d="M480 220l20-15 30-10 40-5 50 0 60 5 70 10 65 15 55 20 40 25 20 30 0 35-5 40-15 45-25 50-35 55-45 60-55 65-65 70h-75l-85-5-95-10-105-15-115-20z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Asia */}
                      <path
                        d="M600 100l60-20 80-15 100-10 120-5 140 0 160 5 180 10 200 15 220 20 240 25 220 30 180 35 140 40 100 45 60 50 20 55-20 60-60 65-100 70-140 75-180 80h-220l-240-5-260-10-280-15-300-20z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Australia */}
                      <path
                        d="M750 350l40-15 50-10 60-5 70 0 80 5 75 10 65 15 50 20 30 25 10 30-10 35-30 40-50 45h-65l-75-5-80-10-70-15-60-20-50-25-40-30z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* Russia */}
                      <path
                        d="M600 80l80-15 120-10 160-5 200 0 240 5 280 10 320 15 360 20 400 25 380 30 320 35 260 40 200 45 140 50 80 55 20 60-20 65-80 70-140 75h-200l-260-5-320-10-360-15-400-20z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* China */}
                      <path
                        d="M700 180l60-15 80-10 100-5 120 0 140 5 160 10 140 15 120 20 100 25 80 30 60 35 40 40 20 45 0 50-20 55-40 60-60 65h-80l-100-5-120-10-140-15-160-20z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                      {/* India */}
                      <path
                        d="M650 240l40-15 50-10 60-5 70 0 80 5 75 10 65 15 50 20 30 25 10 30-5 35-15 40-25 45-35 50h-45l-55-5-65-10-75-15z"
                        fill="#ffffff"
                        opacity="0.2"
                      />
                    </svg>

                    {/* Node Location Marker */}
                    {selectedNode?.coordinates && selectedNode.coordinates.length === 2 && (
                      <div
                        className="absolute w-3 h-3 bg-[#93a2ff] rounded-full border-2 border-white shadow-lg animate-pulse"
                        style={{
                          left: `${Math.max(5, Math.min(95, ((selectedNode.coordinates[0] + 180) / 360) * 100))}%`,
                          top: `${Math.max(5, Math.min(95, ((90 - selectedNode.coordinates[1]) / 180) * 100))}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="absolute inset-0 bg-[#93a2ff] rounded-full animate-ping opacity-75"></div>
                      </div>
                    )}

                    {/* Fallback marker for nodes without coordinates */}
                    {(!selectedNode?.coordinates || selectedNode.coordinates.length !== 2) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white opacity-50 text-sm">
                          Location data not available
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Details */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                        City
                      </span>
                      <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm">
                        {selectedNode?.city}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                        Country
                      </span>
                      <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm">
                        {selectedNode?.country}
                      </span>
                    </div>
                    {selectedNode?.coordinates && selectedNode.coordinates.length === 2 && (
                      <div className="flex justify-between items-center">
                        <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                          Coordinates
                        </span>
                        <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm font-mono">
                          {selectedNode.coordinates[1].toFixed(4)}, {selectedNode.coordinates[0].toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="bg-[#292929] mx-4" />

            {/* Node Information */}
            <div className="flex flex-col gap-4 px-4 relative self-stretch w-full">
              <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                Node Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                    Node ID
                  </span>
                  <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm font-mono">
                    {selectedNode?.node_id?.substring(0, 16)}...
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                    IP Address
                  </span>
                  <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm font-mono">
                    {selectedNode?.ip !== "XXXX" ? selectedNode?.ip : "Hidden"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                    ASN
                  </span>
                  <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm">
                    {selectedNode?.asn !== "XXXX" ? selectedNode?.asn : "Hidden"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                    Last Seen
                  </span>
                  <span className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm">
                    {selectedNode?.last_seen ? new Date(selectedNode.last_seen).toLocaleString() : 'N/A'}
                  </span>
                </div>

                {selectedNode?.url && (
                  <div className="flex justify-between items-center">
                    <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                      Endpoint
                    </span>
                    <a 
                      href={selectedNode.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-[#93a2ff] text-sm hover:underline"
                    >
                      {selectedNode.url.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {selectedNode?.node_type === 'nildb' && (
              <>
                <Separator className="bg-[#292929] mx-4" />
                
                {/* Database Specific Metrics */}
                <div className="flex flex-col gap-4 px-4 relative self-stretch w-full">
                  <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                    Database Metrics
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                      <CardContent className="p-4 text-center">
                        <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                          Documents Stored
                        </div>
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                          12.4K
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                      <CardContent className="p-4 text-center">
                        <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                          Query Rate
                        </div>
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                          156/min
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}

            {selectedNode?.node_type === 'nilchain' && (
              <>
                <Separator className="bg-[#292929] mx-4" />
                
                {/* Validator Specific Metrics */}
                <div className="flex flex-col gap-4 px-4 relative self-stretch w-full">
                  <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-base">
                    Validator Metrics
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                      <CardContent className="p-4 text-center">
                        <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                          Blocks Validated
                        </div>
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                          8,942
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                      <CardContent className="p-4 text-center">
                        <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                          Stake Amount
                        </div>
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                          50K NIL
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </main>
          <div className="relative self-stretch w-full h-px" />
          </>
        )}
      </aside>
    </div>
  );
};