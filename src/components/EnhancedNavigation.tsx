
import { Target, BarChart3, FileSpreadsheet, Handshake, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface EnhancedNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  analysisCount: number;
  planilhaCount?: number;
  partnersCount?: number;
  emailCampaignsCount?: number;
}

export const EnhancedNavigation = ({ 
  activeTab, 
  onTabChange, 
  analysisCount, 
  planilhaCount = 0,
  partnersCount = 0,
  emailCampaignsCount = 0
}: EnhancedNavigationProps) => {
  console.log('EnhancedNavigation render:', {
    activeTab,
    analysisCount,
    planilhaCount,
    partnersCount,
    emailCampaignsCount
  });

  // Ensure all counts are numbers and not undefined
  const safeAnalysisCount = analysisCount || 0;
  const safePlanilhaCount = planilhaCount || 0;
  const safePartnersCount = partnersCount || 0;
  const safeEmailCampaignsCount = emailCampaignsCount || 0;

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
      count: safeAnalysisCount,
      description: 'Análises detalhadas'
    },
    { 
      id: 'planilha', 
      label: 'Planilha', 
      icon: FileSpreadsheet, 
      count: safePlanilhaCount,
      description: 'Dados exportados'
    },
    { 
      id: 'email', 
      label: 'Email Marketing', 
      icon: Mail, 
      count: safeEmailCampaignsCount,
      description: 'Campanhas de email'
    },
    { 
      id: 'partners', 
      label: 'Parceiros', 
      icon: Handshake, 
      count: safePartnersCount,
      description: 'Gestão de parcerias'
    }
  ];

  return (
    <div className="bg-background border-b border-border theme-transition">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-6 py-4 flex flex-col items-center gap-1 font-medium text-sm transition-all duration-300 group theme-transition
                  ${activeTab === tab.id 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg transition-all duration-300 theme-transition ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground group-hover:bg-muted/80 group-hover:text-foreground'
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
                        ? 'bg-primary-foreground text-primary'
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </div>
                
                {/* Enhanced active indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ${
                  activeTab === tab.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}></div>
                
                {/* Subtle hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-border transition-all duration-300 ${
                  activeTab !== tab.id ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                }`}></div>
              </button>
            ))}
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
};
