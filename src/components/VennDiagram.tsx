import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface Company {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
  status: string;
  metrics: {
    tvl: string;
    volume24h: string;
    users: string;
  };
}

const companies: Company[] = [
  {
    id: 'skillful-ai',
    name: 'Skillful AI',
    logo: '/img/logos/skillfulai.svg',
    category: 'AI',
    description: 'Advanced AI solutions leveraging private computation for secure machine learning and data analysis.',
    website: 'skillful.ai',
    status: 'Live',
    metrics: {
      tvl: '$2.4M',
      volume24h: '$156K',
      users: '1.2K'
    }
  },
  {
    id: 'rainfall',
    name: 'Rainfall',
    logo: '/img/logos/rainfall.png',
    category: 'AI',
    description: 'Privacy-preserving weather prediction and climate modeling using secure multi-party computation.',
    website: 'rainfall.io',
    status: 'Beta',
    metrics: {
      tvl: '$890K',
      volume24h: '$45K',
      users: '340'
    }
  },
  {
    id: 'nebula',
    name: 'Nebula',
    logo: '/img/logos/nebula.svg',
    category: 'Data Ownership',
    description: 'Decentralized data ownership platform enabling users to control and monetize their personal data.',
    website: 'nebula.network',
    status: 'Live',
    metrics: {
      tvl: '$5.2M',
      volume24h: '$280K',
      users: '2.8K'
    }
  },
  {
    id: 'soarchain',
    name: 'Soarchain',
    logo: '/img/logos/soarchain.png',
    category: 'Data Ownership',
    description: 'Blockchain infrastructure for secure data sharing and ownership verification.',
    website: 'soarchain.com',
    status: 'Live',
    metrics: {
      tvl: '$3.1M',
      volume24h: '$120K',
      users: '1.5K'
    }
  },
  {
    id: 'monadic',
    name: 'Monadic DNA',
    logo: '/img/logos/monadic.png',
    category: 'DeSci',
    description: 'Decentralized science platform for secure genomic data analysis and research collaboration.',
    website: 'monadic.dna',
    status: 'Beta',
    metrics: {
      tvl: '$1.8M',
      volume24h: '$67K',
      users: '890'
    }
  },
  {
    id: 'healthblocks',
    name: 'Health Blocks',
    logo: '/img/logos/healthblocks.png',
    category: 'DeSci',
    description: 'Privacy-first healthcare data platform enabling secure medical research and patient data control.',
    website: 'healthblocks.io',
    status: 'Live',
    metrics: {
      tvl: '$4.3M',
      volume24h: '$190K',
      users: '2.1K'
    }
  },
  {
    id: 'stadium-science',
    name: 'Stadium Science',
    logo: '/img/logos/stadiumscience.png',
    category: 'Data Verification',
    description: 'Sports analytics platform using private computation for competitive advantage insights and data verification.',
    website: 'stadiumscience.com',
    status: 'Live',
    metrics: {
      tvl: '$1.2M',
      volume24h: '$78K',
      users: '650'
    }
  }
];

export const VennDiagram: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return '#93a2ff';
      case 'Data Ownership':
        return '#5fe9b5';
      case 'DeSci':
        return '#f3a8ff';
      case 'Data Verification':
        return '#ffc593';
      default:
        return '#ffffff';
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const radius = 120;

    // Define circle centers for proper Venn diagram
    const circles = [
      { id: 'AI', cx: 280, cy: 200, r: radius, color: '#93a2ff', label: 'AI' },
      { id: 'Data Ownership', cx: 520, cy: 200, r: radius, color: '#5fe9b5', label: 'Data Ownership' },
      { id: 'DeSci', cx: 320, cy: 350, r: radius, color: '#f3a8ff', label: 'DeSci' },
      { id: 'Data Verification', cx: 480, cy: 350, r: radius, color: '#ffc593', label: 'Data Verification' }
    ];

    // Create gradient definitions
    const defs = svg.append('defs');
    circles.forEach(circle => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${circle.id.replace(' ', '-')}`)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '50%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', circle.color)
        .attr('stop-opacity', 0.2);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', circle.color)
        .attr('stop-opacity', 0.05);
    });

    // Draw circles
    circles.forEach(circle => {
      svg.append('circle')
        .attr('cx', circle.cx)
        .attr('cy', circle.cy)
        .attr('r', circle.r)
        .attr('fill', `url(#gradient-${circle.id.replace(' ', '-')})`)
        .attr('stroke', circle.color)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.6);

      // Add labels
      svg.append('text')
        .attr('x', circle.cx)
        .attr('y', circle.cy - circle.r - 20)
        .attr('text-anchor', 'middle')
        .attr('fill', circle.color)
        .attr('font-size', '16px')
        .attr('font-weight', '500')
        .attr('font-family', 'TWK_Everett-Medium, Helvetica')
        .text(circle.label);
    });

    // Position companies within their circles
    const companyPositions: Record<string, { x: number; y: number }> = {
      'skillful-ai': { x: 250, y: 180 },
      'rainfall': { x: 310, y: 220 },
      'nebula': { x: 490, y: 180 },
      'soarchain': { x: 550, y: 220 },
      'monadic': { x: 290, y: 380 },
      'healthblocks': { x: 350, y: 320 },
      'stadium-science': { x: 510, y: 380 }
    };

    // Add company circles
    companies.forEach(company => {
      const pos = companyPositions[company.id];
      const color = getCategoryColor(company.category);

      const companyGroup = svg.append('g')
        .attr('class', 'company-circle')
        .style('cursor', 'pointer')
        .on('click', () => setSelectedCompany(company))
        .on('mouseover', function() {
          d3.select(this).select('circle')
            .transition()
            .duration(200)
            .attr('r', 35)
            .attr('stroke-width', 3);
        })
        .on('mouseout', function() {
          d3.select(this).select('circle')
            .transition()
            .duration(200)
            .attr('r', 30)
            .attr('stroke-width', 2);
        });

      // Company circle background
      companyGroup.append('circle')
        .attr('cx', pos.x)
        .attr('cy', pos.y)
        .attr('r', 30)
        .attr('fill', '#000000')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .style('filter', `drop-shadow(0 0 10px ${color}33)`);

      // Company logo (using foreignObject to embed HTML img)
      companyGroup.append('foreignObject')
        .attr('x', pos.x - 20)
        .attr('y', pos.y - 20)
        .attr('width', 40)
        .attr('height', 40)
        .append('xhtml:div')
        .style('width', '40px')
        .style('height', '40px')
        .style('border-radius', '50%')
        .style('overflow', 'hidden')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .append('xhtml:img')
        .attr('src', company.logo)
        .attr('alt', company.name)
        .style('width', '32px')
        .style('height', '32px')
        .style('object-fit', 'cover')
        .style('border-radius', '50%');
    });

  }, []);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      <svg
        ref={svgRef}
        width="800"
        height="600"
        viewBox="0 0 800 600"
        className="w-full h-full"
      />

      {/* Popup Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <Card className="bg-black border border-solid border-[#292929] rounded-xl max-w-md w-full mx-4 overflow-visible">
            <CardContent className="p-6 overflow-visible">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-xl border border-solid border-[#ffffff1a] bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedCompany.logo})` }}
                  />
                  <div>
                    <h3 className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-xl mb-1">
                      {selectedCompany.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className="inline-flex items-center justify-center gap-1 px-2 py-1 bg-[#ffffff12] rounded border-solid border border-[#ffffff20] h-auto"
                      >
                        <div className="text-white [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs">
                          {selectedCompany.category}
                        </div>
                      </Badge>
                      <Badge
                        className="inline-flex items-center justify-center gap-1 px-2 py-1 bg-[#5fe9b512] rounded border-solid border border-[#5fe9b520] h-auto"
                      >
                        <div className="text-[#5fe9b5] [font-family:'TWK_Everett-Regular',Helvetica] font-normal text-xs">
                          {selectedCompany.status}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-white opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-sm leading-[20px] opacity-80 mb-4">
                {selectedCompany.description}
              </p>

              <div className="text-white opacity-60 text-xs mb-4">
                {selectedCompany.website}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                    TVL
                  </div>
                  <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-sm">
                    {selectedCompany.metrics.tvl}
                  </div>
                </div>
                <div className="text-center">
                  <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                    24h Vol
                  </div>
                  <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-sm">
                    {selectedCompany.metrics.volume24h}
                  </div>
                </div>
                <div className="text-center">
                  <div className="[font-family:'TWK_Everett-Light',Helvetica] font-light text-white text-xs opacity-60 mb-1">
                    Users
                  </div>
                  <div className="[font-family:'TWK_Everett-Medium',Helvetica] font-medium text-white text-sm">
                    {selectedCompany.metrics.users}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};