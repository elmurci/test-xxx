import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { nodeData } from "../../../../data";

const ecosystemProjects = nodeData.fes;

interface EcosystemSectionProps {
  searchQuery: string;
  selectedNodeId: string | null;
  setSelectedNodeId: (nodeId: string) => void;
}

export const EcosystemSection = ({ searchQuery, selectedNodeId, setSelectedNodeId }: EcosystemSectionProps): JSX.Element => {
  // Filter projects based on search query
  const filteredProjects = ecosystemProjects.filter((project) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.website.toLowerCase().includes(query)
    );
  });

  // Find selected project by ID, or fall back to first project if none selected
  const selectedProject = selectedNodeId 
    ? ecosystemProjects.find((project) => project._id === selectedNodeId) || filteredProjects[0]
    : filteredProjects[0];

  return (
    <div className="flex items-start relative flex-1 self-stretch w-full grow z-0">
      {/* Left Panel - Project Grid */}
      <div className="flex flex-col items-start pt-6 pb-0 px-0 flex-1 self-stretch grow mt-[-1.00px] mb-[-1.00px] ml-[-1.00px] bg-black border-[#292929] relative border border-solid">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-2 gap-4 p-6 relative self-stretch w-full">
            {filteredProjects.length === 0 ? (
              <div className="col-span-2 flex items-center justify-center py-8">
                <div className="text-white opacity-60 [font-family:'TWK_Everett-Light',Helvetica] font-light text-sm">
                  No projects found matching "{searchQuery}"
                </div>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all duration-200 bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden hover:bg-[#ffffff12] hover:border-[#ffffff20] ${
                    selectedProject?._id === project._id 
                      ? "bg-[#93a2ff1a] border-[#93a2ff66] ring-1 ring-[#93a2ff33]" 
                      : ""
                  }`}
                  onClick={() => setSelectedNodeId(project._id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg border border-solid border-[#ffffff1a] bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${project.logo})` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-sm truncate">
                            {project.name}
                          </h3>
                          <Badge
                            className={`inline-flex items-center justify-center gap-1 px-1.5 py-0.5 ${project.statusBg} rounded border-solid border ${project.categoryBorder} h-auto flex-shrink-0`}
                          >
                            <div className={`${project.statusColor} [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs whitespace-nowrap`}>
                              {project.status}
                            </div>
                          </Badge>
                        </div>
                        <Badge
                          className={`inline-flex items-center justify-center gap-1 px-1.5 py-0.5 ${project.categoryBg} rounded border-solid border ${project.categoryBorder} h-auto mb-2`}
                        >
                          <div className={`${project.categoryColor} [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs whitespace-nowrap`}>
                            {project.category}
                          </div>
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs leading-[16px] opacity-70 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white opacity-50">TVL</div>
                          <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white">{project.metrics.tvl}</div>
                        </div>
                        <div>
                          <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white opacity-50">24h Vol</div>
                          <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white">{project.metrics.volume24h}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white opacity-50">Users</div>
                        <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white">{project.metrics.users}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Project Details */}
      <aside className="flex flex-col w-[602px] items-start relative self-stretch mt-[-1.00px] mb-[-1.00px] mr-[-1.00px] bg-black border border-solid border-[#292929]">
        {selectedProject && (
          <>
            <header className="flex items-start justify-between px-4 py-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-start gap-3">
                <div
                  className="w-16 h-16 rounded-xl border border-solid border-[#ffffff1a] bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${selectedProject.logo})` }}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                      {selectedProject.name}
                    </h2>
                    <Badge
                      className={`inline-flex items-center justify-center gap-1 px-2 py-1 ${selectedProject.statusBg} rounded border-solid border ${selectedProject.categoryBorder} h-auto`}
                    >
                      <div className={`${selectedProject.statusColor} [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs`}>
                        {selectedProject.status}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`inline-flex items-center justify-center gap-1 px-2 py-1 ${selectedProject.categoryBg} rounded border-solid border ${selectedProject.categoryBorder} h-auto`}
                    >
                      <div className={`${selectedProject.categoryColor} [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs`}>
                        {selectedProject.category}
                      </div>
                    </Badge>
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-60">
                      {selectedProject.website}
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex flex-col items-start gap-6 pt-0 pb-6 px-4 relative flex-1 self-stretch w-full grow">
              <div className="flex flex-col gap-4 relative self-stretch w-full">
                <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-lg">
                  About
                </h3>
                <p className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm leading-[20px] opacity-80">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 relative self-stretch w-full">
                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      Total Value Locked
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                      {selectedProject.metrics.tvl}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      24h Volume
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                      {selectedProject.metrics.volume24h}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                      Active Users
                    </div>
                    <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl">
                      {selectedProject.metrics.users}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#ffffff08] border border-solid border-[#292929] rounded-xl overflow-hidden relative self-stretch w-full">
                <CardContent className="p-4">
                  <h4 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-sm mb-3">
                    Activity Overview
                  </h4>
                  <div className="h-32 flex items-center justify-center border border-dashed border-[#ffffff20] rounded-lg">
                    <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm opacity-50">
                      Activity Chart Placeholder
                    </div>
                  </div>
                </CardContent>
              </Card>
            </main>
          </>
        )}
      </aside>
    </div>
  );
};