
import { Target, BarChart3, FileSpreadsheet, Handshake } from 'lucide-react';

interface EnhancedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  analysisCount: number;
  planilhaCount?: number;
  partnersCount?: number;
}

export const EnhancedNavigation = ({ 
  activeTab, 
  onTabChange, 
  analysisCount, 
  planilhaCount = 0,
  partnersCount = 0
}: EnhancedNavigationProps) => {
  const tabs = [
    { 
      id: 'results', 
      label: 'Resultados', 
      icon: Target,
      description: 'Canais encontrados'
    },
    { 
      id: 'analysis', 
      label: 'Análises', 
      icon: BarChart3, 
      count: analysisCount,
      description: 'Análises detalhadas'
    },
    { 
      id: 'planilha', 
      label: 'Planilha', 
      icon: FileSpreadsheet, 
      count: planilhaCount,
      description: 'Dados exportados'
    },
    { 
      id: 'partners', 
      label: 'Parceiros', 
      icon: Handshake, 
      count: partnersCount,
      description: 'Gestão de parcerias'
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
                relative px-6 py-4 flex flex-col items-center gap-1 font-medium text-sm transition-all duration-300 group
                ${activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-[#AAAAAA] hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-[#FF0000] text-white shadow-lg' 
                    : 'bg-[#1E1E1E] text-[#AAAAAA] group-hover:bg-[#333] group-hover:text-white'
                }`}>
                  <tab.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{tab.label}</span>
                  <span className="text-xs opacity-75">{tab.description}</span>
                </div>
                {tab.count && tab.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-[#FF0000]'
                      : 'bg-[#FF0000] text-white'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
              
              {/* Enhanced active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0000] to-[#CC0000] transition-all duration-300 ${
                activeTab === tab.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}></div>
              
              {/* Subtle hover indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#555] transition-all duration-300 ${
                activeTab !== tab.id ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
              }`}></div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
