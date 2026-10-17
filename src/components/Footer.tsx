import React from 'react';
import { ShieldAlert, Heart, ExternalLink, GraduationCap, Users, Award, Phone } from 'lucide-react';
import { REFERENCE_SOURCES } from '../data/scamDatabase';

interface FooterProps {
  onNavigate: (tab: 'home' | 'ai-checker' | 'about' | 'quiz') => void;
  onOpenSos: () => void;
  isElderMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSos, isElderMode }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: App Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                LuadaoPedia
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Thư viện tra cứu bách khoa các chiêu trò lừa đảo qua mạng tại Việt Nam. Nâng cao cảnh giác cộng đồng, phổ biến kiến thức phòng vệ số và ứng dụng Trí tuệ nhân tạo Gemini bảo vệ người dân.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Dự án giáo dục cộng đồng - 100% Phi lợi nhuận</span>
            </div>
          </div>

          {/* Col 2: Academic Info (Yêu cầu 7) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              Thông tin Đồ án & Tác giả
            </h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-2 text-xs">
              <div>
                <span className="text-slate-400">Ứng dụng: </span>
                <span className="font-semibold text-white">LuadaoPedia (Việt Nam)</span>
              </div>
              <div>
                <span className="text-slate-400">Họ và tên SV: </span>
                <span className="font-semibold text-amber-300">Nguyễn Văn Toàn</span>
              </div>
              <div>
                <span className="text-slate-400">Mã sinh viên: </span>
                <span className="font-mono font-bold text-white">SV2024-K66 (B21DCCN001)</span>
              </div>
              <div>
                <span className="text-slate-400">Nhóm thực hiện: </span>
                <span className="font-semibold text-white">CyberSafe Team (An toàn số)</span>
              </div>
              <div>
                <span className="text-slate-400">Mục tiêu: </span>
                <span className="text-slate-300">Phổ cập kỹ năng phòng ngừa lừa đảo công nghệ cao</span>
              </div>
            </div>
          </div>

          {/* Col 3: Key Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Khám phá Nhanh
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Thư viện 8 kịch bản phổ biến
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-checker')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Trợ lý AI kiểm chứng tin nhắn</span>
                  <span className="text-[10px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800">Hot</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Trắc nghiệm Cảnh giác số
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Trang Giới thiệu & Nguồn tham khảo
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSos}
                  className="text-red-400 hover:text-red-300 font-bold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Tổng đài cứu trợ khẩn cấp 156
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official References (Yêu cầu 8) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Nguồn Tham Khảo Chính Thống
            </h4>
            <ul className="space-y-2 text-xs">
              {REFERENCE_SOURCES.slice(0, 4).map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between text-slate-400 hover:text-white transition-colors"
                  >
                    <span className="line-clamp-1">{source.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 LuadaoPedia - Thư viện Chiêu trò Lừa đảo Trực tuyến Việt Nam. Xây dựng vì an toàn cộng đồng.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Bảo mật thông tin: Không lưu trữ nội dung nhạy cảm của người dùng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
