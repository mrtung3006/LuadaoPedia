import React, { useState } from 'react';
import { ShieldAlert, Bot, BookOpen, Info, HelpCircle, PhoneCall, Menu, X, Sparkles, Eye } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'ai-checker' | 'about' | 'quiz';
  onNavigate: (tab: 'home' | 'ai-checker' | 'about' | 'quiz') => void;
  isElderMode: boolean;
  onToggleElderMode: () => void;
  onOpenSos: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  isElderMode,
  onToggleElderMode,
  onOpenSos
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'home' as const,
      label: 'Thư viện Kịch bản',
      icon: BookOpen,
      badge: '8 kịch bản'
    },
    {
      id: 'ai-checker' as const,
      label: 'Trợ lý AI Kiểm chứng',
      icon: Bot,
      highlight: true,
      badge: 'Gemini AI'
    },
    {
      id: 'quiz' as const,
      label: 'Trắc nghiệm Cảnh giác',
      icon: HelpCircle,
    },
    {
      id: 'about' as const,
      label: 'Giới thiệu & Nguồn',
      icon: Info,
    }
  ];

  const handleSelect = (tab: 'home' | 'ai-checker' | 'about' | 'quiz') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            onClick={() => handleSelect('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-black tracking-tight bg-gradient-to-r from-red-700 via-orange-600 to-amber-600 bg-clip-text text-transparent ${isElderMode ? 'text-2xl' : 'text-xl'}`}>
                  LuadaoPedia
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                  Việt Nam
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Thư viện chiêu trò lừa đảo trực tuyến
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
                    isElderMode ? 'text-base' : 'text-sm'
                  } ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-md font-bold ${
                        isActive
                          ? 'bg-amber-400 text-slate-900'
                          : item.highlight
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Elder Mode Toggle */}
            <button
              onClick={onToggleElderMode}
              title={isElderMode ? 'Tắt chế độ chữ to' : 'Bật chế độ chữ to cho người lớn tuổi'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-all border text-xs sm:text-sm ${
                isElderMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-inner'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isElderMode ? 'Chữ to: ĐANG BẬT' : 'Chế độ chữ to'}
              </span>
              <span className="sm:hidden">Chữ to</span>
            </button>

            {/* SOS Button */}
            <button
              onClick={onOpenSos}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 active:scale-95 transition-all"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>SOS 156</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1.5 animate-in slide-in-from-top duration-150">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                        isActive ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
