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
          
          <footer className="bg-black border-t border-solid border-[#292929] px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="w-4 h-4"
                  alt="Nillion"
                  src="/img/nillion_white_black.jpg"
                />
                <span className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                  © 2025 Nillion. All rights reserved.
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <a 
                  href="https://nillion.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  Website
                </a>
                <a 
                  href="https://docs.nillion.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  Documentation
                </a>
                <a 
                  href="https://github.com/nillion-oss" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="[font-family:'TWK_Everett-Regular',Helvetica] font-normal text-white text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  GitHub
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
