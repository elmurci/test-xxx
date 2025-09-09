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
    id: 'monadic',
    name: 'Monadic DNA',
    logo: '/img/logos/monadic.png',
    category: 'Data Storage & AI',
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
    id: 'soarchain',
    name: 'Soarchain',
    logo: '/img/logos/soarchain.png',
    category: 'Data Storage',
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
    id: 'nilgpt',
    name: 'nilGPT',
    logo: '/img/logos/nilgpt.png',
    category: 'AI & Data Storage',
    description: 'Privacy-preserving AI assistant leveraging secure multi-party computation for confidential conversations.',
    website: 'nilgpt.ai',
    status: 'Live',
    metrics: {
      tvl: '$3.5M',
      volume24h: '$210K',
      users: '4.2K'
    }
  },
  {
    id: 'tickr',
    name: 'Tickr',
    logo: '/img/logos/tickr.svg',
    category: 'Data Verification',
    description: 'Decentralized ticketing platform with private ownership verification and fraud prevention.',
    website: 'tickr.io',
    status: 'Live',
    metrics: {
      tvl: '$2.1M',
      volume24h: '$95K',
      users: '1.8K'
    }
  },
  {
    id: 'capx',
    name: 'Capx',
    logo: '/img/logos/empty.png',
    category: 'AI',
    description: 'AI-powered investment platform using private computation for secure portfolio management.',
    website: 'capx.finance',
    status: 'Beta',
    metrics: {
      tvl: '$1.6M',
      volume24h: '$82K',
      users: '720'
    }
  },
  {
    id: 'nubila',
    name: 'Nubila',
    logo: '/img/logos/empty.png',
    category: 'Data Storage & DeSci',
    description: 'Decentralized cloud storage platform for scientific research data with privacy guarantees.',
    website: 'nubila.science',
    status: 'Beta',
    metrics: {
      tvl: '$2.8M',
      volume24h: '$134K',
      users: '1.3K'
    }
  },
  {
    id: 'stadium-science',
    name: 'Stadium Science',
    logo: '/img/logos/stadiumscience.png',
    category: 'Data Storage & DeSci',
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
      case 'Data Storage':
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
    const radius = 150;

    // Define circle centers - positioned so they touch where companies span categories
    const circles = [
      { id: 'AI', cx: 220, cy: 170, r: radius, color: '#93a2ff', label: 'AI' },
      { id: 'Data Storage', cx: 400, cy: 170, r: radius, color: '#5fe9b5', label: 'Data Storage' },
      { id: 'DeSci', cx: 400, cy: 350, r: radius, color: '#f3a8ff', label: 'DeSci' },
      { id: 'Data Verification', cx: 580, cy: 260, r: radius, color: '#ffc593', label: 'Data Verification' }
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

    // Position companies based on their categories
    const companyPositions: Record<string, { x: number; y: number }> = {
      'rainfall': { x: 180, y: 140 }, // AI
      'skillful-ai': { x: 220, y: 200 }, // AI
      'capx': { x: 260, y: 160 }, // AI
      'monadic': { x: 310, y: 170 }, // Data Storage & AI intersection
      'healthblocks': { x: 400, y: 350 }, // DeSci center
      'soarchain': { x: 400, y: 120 }, // Data Storage center
      'nilgpt': { x: 350, y: 140 }, // AI & Data Storage intersection
      'tickr': { x: 580, y: 260 }, // Data Verification center
      'nubila': { x: 430, y: 280 }, // Data Storage & DeSci intersection
      'stadium-science': { x: 370, y: 300 } // Data Storage & DeSci intersection
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
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible mt-32">
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