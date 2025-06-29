
import { Target, BarChart3, FileSpreadsheet, Handshake } from 'lucide-react';

interface ProfessionalNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  analysisCount: number;
  planilhaCount?: number;
  partnersCount?: number;
}

export const ProfessionalNavigation = ({ 
  activeTab, 
  onTabChange, 
  analysisCount, 
  planilhaCount = 0,
  partnersCount = 0
}: ProfessionalNavigationProps) => {
  const tabs = [
    { id: 'results', label: 'Resultados', icon: Target },
    { 
      id: 'analysis', 
      label: 'Análises', 
      icon: BarChart3, 
      count: analysisCount 
    },
    { 
      id: 'planilha', 
      label: 'Planilha', 
      icon: FileSpreadsheet, 
      count: planilhaCount 
    },
    { 
      id: 'partners', 
      label: 'Parceiros', 
      icon: Handshake, 
      count: partnersCount 
    }
  ];

  return (
    <div className="bg-[#0D0D0D] border-b border-neutral-800 sticky top-0 z-40">
      <div className="container mx-auto px-3 sm:px-6">
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-4 lg:px-6 py-4 flex items-center gap-2 font-medium text-sm transition-colors whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-[#AAAAAA] hover:text-white'
                }
              `}
            >
              <tab.icon className="h-4 w-4 flex-shrink-0" />
              <span className="hidden lg:inline">{tab.label}</span>
              {tab.count && tab.count > 0 && (
                <span className="bg-[#FF0000] text-white text-xs px-1.5 py-0.5 rounded-full font-medium ml-1 flex-shrink-0">
                  {tab.count}
                </span>
              )}
              
              {/* Linha vermelha para aba ativa */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000]"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation - Horizontal Scroll */}
        <nav className="sm:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-4 py-3 flex flex-col items-center gap-1 font-medium text-xs transition-colors whitespace-nowrap min-w-[80px]
                  ${activeTab === tab.id 
                    ? 'text-white' 
                    : 'text-[#AAAAAA] hover:text-white'
                  }
                `}
              >
                <div className="relative">
                  <tab.icon className="h-4 w-4" />
                  {tab.count && tab.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-[10px] px-1 py-0.5 rounded-full font-medium min-w-[16px] h-4 flex items-center justify-center">
                      {tab.count > 99 ? '99+' : tab.count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] leading-none">{tab.label}</span>
                
                {/* Linha vermelha para aba ativa */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000]"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
