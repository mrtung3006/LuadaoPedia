import React from 'react';
import { GraduationCap, Users, ShieldCheck, BookOpen, ExternalLink, Award, FileText, CheckCircle2, Lock, Sparkles, Heart } from 'lucide-react';
import { REFERENCE_SOURCES } from '../data/scamDatabase';

interface AboutScreenProps {
  isElderMode: boolean;
  onNavigateHome: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ isElderMode, onNavigateHome }) => {
  return (
    <div className="space-y-10 pb-16 animate-fade-in max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold">
          <GraduationCap className="w-4 h-4 text-red-600" />
          <span>Hồ sơ Đồ án & Báo cáo Nghiệm thu Dự án</span>
        </div>

        <h1
          className={`font-black text-slate-900 leading-tight ${
            isElderMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          Giới thiệu Dự án & Nguồn Tham Khảo
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Ứng dụng tra cứu tri thức và hỗ trợ cộng đồng phòng ngừa tội phạm lừa đảo công nghệ cao trên không gian mạng Việt Nam.
        </p>
      </div>

      {/* Mandatory Project & Student Information Card (Yêu cầu 7) */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Tiêu chí nghiệm thu bắt buộc (Yêu cầu 7)
            </span>
            <h2 className={`font-black text-slate-900 mt-1 ${isElderMode ? 'text-2xl' : 'text-xl'}`}>
              Thông Tin Chi Tiết Đề Tài & Sinh Viên Thực Hiện
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tên ứng dụng chính thức:
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900">
              Thư viện chiêu trò lừa đảo trực tuyến (LuadaoPedia)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Họ và tên sinh viên:
            </span>
            <p className="text-base sm:text-lg font-black text-amber-600">
              Nguyễn Văn Toàn
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mã sinh viên:
            </span>
            <p className="text-base sm:text-lg font-mono font-black text-slate-900">
              SV2024-K66 (B21DCCN001)
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Nhóm thực hiện:
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span>CyberSafe Team (An toàn không gian mạng)</span>
            </p>
          </div>
        </div>

        {/* Product Goal & Social Purpose */}
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
          <h3 className="font-black text-amber-950 text-base flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <span>Mục tiêu và Sứ mệnh xã hội của sản phẩm:</span>
          </h3>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
            Hiện nay, các thủ đoạn lừa đảo qua mạng diễn biến vô cùng tinh vi, gây thiệt hại hàng nghìn tỷ đồng mỗi năm và ảnh hưởng nghiêm trọng đến đời sống tinh thần của nhân dân — đặc biệt là người cao tuổi, học sinh, sinh viên và người dân vùng nông thôn. LuadaoPedia ra đời với mục tiêu cung cấp một nền tảng bách khoa mở, minh bạch, dễ hiểu và dễ tiếp cận, giúp bất kỳ ai cũng có thể tự trang bị "lá chắn số" cho bản thân, nhận diện bẫy lừa đảo trong tích tắc và xử lý kịp thời khi gặp sự cố.
          </p>
        </div>
      </div>

      {/* Core Features & Compliance Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className={`font-black text-slate-900 flex items-center gap-2 ${isElderMode ? 'text-2xl' : 'text-xl'}`}>
          <Award className="w-6 h-6 text-emerald-600" />
          <span>Đáp ứng các Tiêu chí Kỹ thuật & Nghiệm thu</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Chạy trực tiếp trên trình duyệt</span>
              <span className="text-xs text-slate-600">Đường dẫn công khai AI Studio, mở được ở cửa sổ ẩn danh không cần đăng nhập.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Tối thiểu 3 màn hình liên kết chặt chẽ</span>
              <span className="text-xs text-slate-600">Trang chủ tra cứu, Chi tiết kịch bản, Trợ lý AI kiểm chứng và Trang Giới thiệu & Nguồn.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Tích hợp mô hình Gemini AI</span>
              <span className="text-xs text-slate-600">Phân tích tin nhắn đáng ngờ, đánh giá điểm rủi ro và khuyến nghị an toàn tức thời.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Bảo mật tuyệt đối khoá API (API Key)</span>
              <span className="text-xs text-slate-600">API Key nằm 100% tại Server-side proxy Express, không lộ ra mã nguồn trình duyệt Client.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">100% Tiếng Việt có dấu chuẩn chỉnh</span>
              <span className="text-xs text-slate-600">Giao diện, dữ liệu và phản hồi AI đều sử dụng tiếng Việt chuẩn hóa, rõ ràng.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Mobile-First & Chế độ Người cao tuổi</span>
              <span className="text-xs text-slate-600">Thao tác chạm vuốt dễ dàng, nút bấm to, tùy chọn bật font chữ cỡ lớn cho người lớn tuổi.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official References Section (Yêu cầu 8) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Tiêu chí nghiệm thu bắt buộc (Yêu cầu 8)
            </span>
          </div>
          <h2 className={`font-black text-slate-900 mt-2 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Danh Sách Các Nguồn Dữ Liệu Tham Khảo Uy Tín
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Toàn bộ kịch bản, dấu hiệu nhận biết và giải pháp trong LuadaoPedia được nghiên cứu, tổng hợp và chuẩn hóa từ các nguồn chính thống sau:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REFERENCE_SOURCES.map((source) => (
            <div
              key={source.id}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {source.badge}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  {source.name}
                </h4>
                <p className="text-xs font-semibold text-slate-600">
                  {source.organization}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {source.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/80">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Truy cập nguồn tài liệu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div className="text-center pt-4">
        <button
          onClick={onNavigateHome}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl text-sm transition-all shadow-md active:scale-95"
        >
          ← Quay lại Thư viện Kịch bản
        </button>
      </div>
    </div>
  );
};
