
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
    <div className="bg-[#0D0D0D] border-b border-neutral-800">
      <div className="container mx-auto px-6">
        <nav className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-6 py-4 flex items-center gap-2 font-medium text-sm transition-colors
                ${activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-[#AAAAAA] hover:text-white'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <span className="bg-[#FF0000] text-white text-xs px-2 py-0.5 rounded-full font-medium ml-1">
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
      </div>
    </div>
  );
};
