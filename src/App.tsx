/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HotAlertBanner } from './components/HotAlertBanner';
import { EmergencyModal } from './components/EmergencyModal';
import { HomeScreen } from './views/HomeScreen';
import { DetailScreen } from './views/DetailScreen';
import { AiCheckerScreen } from './views/AiCheckerScreen';
import { AboutScreen } from './views/AboutScreen';
import { QuizView } from './views/QuizView';
import { SCAM_DATABASE } from './data/scamDatabase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'ai-checker' | 'about' | 'quiz'>('home');
  const [selectedScamId, setSelectedScamId] = useState<string | null>(null);
  const [aiPrefillText, setAiPrefillText] = useState<string>('');
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isElderMode, setIsElderMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('luadao_elder_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Save Elder Mode preference
  useEffect(() => {
    try {
      localStorage.setItem('luadao_elder_mode', String(isElderMode));
    } catch {
      // Ignore
    }
  }, [isElderMode]);

  // Navigate to Detail Screen
  const handleSelectScam = (scamId: string) => {
    setSelectedScamId(scamId);
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Scam list
  const handleBackToScamList = () => {
    setSelectedScamId(null);
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to AI Checker with prefilled suspicious text
  const handleCheckWithAi = (sampleText: string) => {
    setAiPrefillText(sampleText);
    setCurrentTab('ai-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch tabs
  const handleNavigateTab = (tab: 'home' | 'ai-checker' | 'about' | 'quiz') => {
    setCurrentTab(tab);
    if (tab !== 'home') {
      setSelectedScamId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedScam = selectedScamId
    ? SCAM_DATABASE.find((s) => s.id === selectedScamId)
    : null;

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-100/60 font-sans text-slate-900 transition-colors ${
        isElderMode ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Hot Alert Bar */}
      <HotAlertBanner
        onSelectScam={handleSelectScam}
        isElderMode={isElderMode}
      />

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigateTab}
        isElderMode={isElderMode}
        onToggleElderMode={() => setIsElderMode(!isElderMode)}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          selectedScam ? (
            <DetailScreen
              scam={selectedScam}
              onBack={handleBackToScamList}
              onCheckWithAi={handleCheckWithAi}
              onOpenSos={() => setIsSosOpen(true)}
              isElderMode={isElderMode}
            />
          ) : (
            <HomeScreen
              onSelectScam={handleSelectScam}
              onCheckWithAi={handleCheckWithAi}
              onOpenQuiz={() => handleNavigateTab('quiz')}
              onOpenSos={() => setIsSosOpen(true)}
              isElderMode={isElderMode}
            />
          )
        )}

        {currentTab === 'ai-checker' && (
          <AiCheckerScreen
            initialText={aiPrefillText}
            onOpenSos={() => setIsSosOpen(true)}
            isElderMode={isElderMode}
          />
        )}

        {currentTab === 'about' && (
          <AboutScreen
            isElderMode={isElderMode}
            onNavigateHome={() => handleNavigateTab('home')}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            isElderMode={isElderMode}
            onNavigateHome={() => handleNavigateTab('home')}
            onNavigateAi={() => handleNavigateTab('ai-checker')}
          />
        )}
      </main>

      {/* Emergency SOS Modal */}
      <EmergencyModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        isElderMode={isElderMode}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigateTab}
        onOpenSos={() => setIsSosOpen(true)}
        isElderMode={isElderMode}
      />
    </div>
  );
}
