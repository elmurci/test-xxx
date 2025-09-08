import React from "react";
import { useState } from "react";
import { NodeDetailsSection } from "./sections/NodeDetailsSection/NodeDetailsSection";
import { NodeListSection } from "./sections/NodeListSection/NodeListSection";

export const Dashboard = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("All Nodes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <div className="bg-black min-h-screen w-full flex justify-center">
      <div className="bg-black w-full max-w-[1440px] min-h-screen">
        <div className="flex flex-col w-full min-h-screen">
          <NodeListSection 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <NodeDetailsSection 
            activeTab={activeTab}
            searchQuery={searchQuery}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
          />
        </div>
      </div>
    </div>
  );
};
