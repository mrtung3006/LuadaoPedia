import React from 'react';
import { AlertCircle, ChevronRight, ShieldCheck } from 'lucide-react';

interface HotAlertBannerProps {
  onSelectScam: (scamId: string) => void;
  isElderMode: boolean;
}

export const HotAlertBanner: React.FC<HotAlertBannerProps> = ({ onSelectScam, isElderMode }) => {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-red-600 uppercase tracking-wide shrink-0 animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              Cảnh báo nóng 2026
            </span>
            <p className={`font-medium line-clamp-1 ${isElderMode ? 'text-base font-bold' : 'text-sm'}`}>
              Cảnh giác chiêu trò gọi video Deepfake và mạo danh cán bộ Thuế / Công an dụ cài file .apk chiếm quyền điện thoại!
            </p>
          </div>
          <button
            onClick={() => onSelectScam('cai-app-dich-vu-cong-vneid-thue')}
            className="inline-flex items-center gap-1 text-xs font-bold bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-lg transition-colors shrink-0 text-white"
          >
            <span>Xem cách nhận diện ngay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
