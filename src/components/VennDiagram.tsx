import React, { useState } from 'react';
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
    category: 'AI & Data',
    description: 'Sports analytics platform using private computation for competitive advantage insights.',
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

  const getCompanyPosition = (companyId: string) => {
    const positions: Record<string, { left: string; top: string }> = {
      'skillful-ai': { left: '25%', top: '20%' },
      'rainfall': { left: '35%', top: '35%' },
      'nebula': { left: '15%', top: '60%' },
      'soarchain': { left: '30%', top: '70%' },
      'monadic': { left: '70%', top: '60%' },
      'healthblocks': { left: '75%', top: '35%' },
      'stadium-science': { left: '50%', top: '50%' }
    };
    return positions[companyId] || { left: '50%', top: '50%' };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return '#93a2ff';
      case 'Data Ownership':
        return '#5fe9b5';
      case 'DeSci':
        return '#f3a8ff';
      case 'AI & Data':
        return '#ffc593';
      default:
        return '#ffffff';
    }
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      {/* Venn Diagram Circles */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        {/* AI Circle */}
        <circle
          cx="300"
          cy="200"
          r="120"
          fill="rgba(147, 162, 255, 0.1)"
          stroke="rgba(147, 162, 255, 0.4)"
          strokeWidth="2"
        />
        <text
          x="300"
          y="120"
          textAnchor="middle"
          fill="#93a2ff"
          fontSize="16"
          fontWeight="500"
          fontFamily="TWK_Everett-Medium, Helvetica"
        >
          AI
        </text>

        {/* Data Ownership Circle */}
        <circle
          cx="200"
          cy="350"
          r="120"
          fill="rgba(95, 233, 181, 0.1)"
          stroke="rgba(95, 233, 181, 0.4)"
          strokeWidth="2"
        />
        <text
          x="120"
          y="420"
          textAnchor="middle"
          fill="#5fe9b5"
          fontSize="16"
          fontWeight="500"
          fontFamily="TWK_Everett-Medium, Helvetica"
        >
          Data Ownership
        </text>

        {/* DeSci Circle */}
        <circle
          cx="500"
          cy="350"
          r="120"
          fill="rgba(243, 168, 255, 0.1)"
          stroke="rgba(243, 168, 255, 0.4)"
          strokeWidth="2"
        />
        <text
          x="580"
          y="420"
          textAnchor="middle"
          fill="#f3a8ff"
          fontSize="16"
          fontWeight="500"
          fontFamily="TWK_Everett-Medium, Helvetica"
        >
          DeSci
        </text>
      </svg>

      {/* Company Circles */}
      {companies.map((company) => {
        const position = getCompanyPosition(company.id);
        const color = getCategoryColor(company.category);
        
        return (
          <div
            key={company.id}
            className="absolute w-16 h-16 rounded-full border-2 bg-black flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 z-10"
            style={{
              left: position.left,
              top: position.top,
              transform: 'translate(-50%, -50%)',
              borderColor: color,
              boxShadow: `0 0 20px ${color}33`
            }}
            onClick={() => setSelectedCompany(company)}
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        );
      })}

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