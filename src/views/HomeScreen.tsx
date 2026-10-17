import React, { useState, useMemo } from 'react';
import { Search, ShieldAlert, AlertTriangle, ArrowRight, Bot, ShieldCheck, Flame, BookOpen, CheckCircle, HelpCircle, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { SCAM_DATABASE, SCAM_CATEGORIES } from '../data/scamDatabase';
import { ScamScenario, ScamSeverity } from '../types/scam';

interface HomeScreenProps {
  onSelectScam: (scamId: string) => void;
  onCheckWithAi: (sampleText: string) => void;
  onOpenQuiz: () => void;
  onOpenSos: () => void;
  isElderMode: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectScam,
  onCheckWithAi,
  onOpenQuiz,
  onOpenSos,
  isElderMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả hình thức');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  // Filtered scenarios
  const filteredScams = useMemo(() => {
    return SCAM_DATABASE.filter((scam) => {
      const matchCategory =
        selectedCategory === 'Tất cả hình thức' || scam.category === selectedCategory;
      const matchSeverity =
        selectedSeverity === 'ALL' || scam.severity === selectedSeverity;

      const lowerSearch = searchTerm.toLowerCase().trim();
      const matchSearch =
        !lowerSearch ||
        scam.title.toLowerCase().includes(lowerSearch) ||
        scam.description.toLowerCase().includes(lowerSearch) ||
        scam.signs.some((s) => s.toLowerCase().includes(lowerSearch)) ||
        scam.summary.toLowerCase().includes(lowerSearch);

      return matchCategory && matchSeverity && matchSearch;
    });
  }, [searchTerm, selectedCategory, selectedSeverity]);

  const getSeverityBadge = (severity: ScamSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-300">
            <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            CỰC KỲ NGUY HIỂM
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-orange-100 text-orange-800 border border-orange-300">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
            RỦI RO CAO
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            TRUNG BÌNH
          </span>
        );
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-700">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-200 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Bách khoa toàn thư nhận diện & phòng vệ số toàn dân</span>
          </div>

          <h1
            className={`font-black tracking-tight leading-tight text-white ${
              isElderMode ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            Nhận diện chiêu trò lừa đảo qua mạng{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Chính xác & Kịp thời
            </span>
          </h1>

          <p
            className={`text-slate-300 leading-relaxed ${
              isElderMode ? 'text-lg sm:text-xl font-medium' : 'text-sm sm:text-base'
            }`}
          >
            Trang bị kiến thức tự bảo vệ bản thân và gia đình trước các thủ đoạn lừa đảo công nghệ cao tinh vi: mạo danh công an, hack mã OTP, việc làm ảo, deepfake và mã độc gián điệp.
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => onCheckWithAi('')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Kiểm chứng tin nhắn với Gemini AI</span>
            </button>
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Làm bài trắc nghiệm cảnh giác (3 câu)</span>
            </button>
            <button
              onClick={onOpenSos}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-200 font-bold text-sm border border-red-500/30 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Đường dây nóng SOS</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">8+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Kịch bản chi tiết</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Tiếng Việt có dấu</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-rose-400">24/7</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Trợ lý AI phân tích</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">156</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Hotline báo cáo miễn phí</div>
          </div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo từ khóa (Ví dụ: công an, tài khoản ngân hàng, tuyển ctv, link lạ, vneid, otp...)"
            className={`w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-800 placeholder-slate-400 transition-all ${
              isElderMode ? 'text-lg font-medium' : 'text-base'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Categories Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Phân loại hình thức lừa đảo:</span>
            <span>Hiển thị {filteredScams.length} kịch bản</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SCAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all text-xs sm:text-sm ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <span className="text-xs font-bold text-slate-500">Mức độ nguy hiểm:</span>
          {[
            { id: 'ALL', label: 'Tất cả mức độ' },
            { id: 'CRITICAL', label: 'Cực kỳ nguy hiểm' },
            { id: 'HIGH', label: 'Rủi ro cao' },
            { id: 'MEDIUM', label: 'Trung bình' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSeverity(item.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedSeverity === item.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Scenarios Grid */}
      <section className="space-y-4">
        {filteredScams.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Không tìm thấy kịch bản phù hợp</h3>
            <p className="text-sm text-slate-500 mt-1">
              Vui lòng thử tìm với từ khóa khác hoặc đặt lại bộ lọc phân loại.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tất cả hình thức');
                setSelectedSeverity('ALL');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScams.map((scam) => (
              <div
                key={scam.id}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Top card bar */}
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {scam.category}
                    </span>
                    {getSeverityBadge(scam.severity)}
                  </div>

                  <div>
                    <h3
                      onClick={() => onSelectScam(scam.id)}
                      className={`font-black text-slate-900 group-hover:text-red-600 cursor-pointer transition-colors leading-snug ${
                        isElderMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {scam.title}
                    </h3>
                    <p
                      className={`text-slate-600 mt-2.5 line-clamp-3 leading-relaxed ${
                        isElderMode ? 'text-base font-medium' : 'text-sm'
                      }`}
                    >
                      {scam.summary}
                    </p>
                  </div>

                  {/* Highlights of signs */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Dấu hiệu nhận biết điển hình:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {scam.signs.slice(0, 2).map((sign, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onCheckWithAi(scam.realWorldSample)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                    title="Nạp tin nhắn thực tế của kịch bản này vào Trợ lý AI để phân tích"
                  >
                    <Bot className="w-4 h-4 text-amber-500" />
                    <span>Thử nghiệm với AI</span>
                  </button>

                  <button
                    onClick={() => onSelectScam(scam.id)}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-slate-900 hover:text-red-600 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>Xem kịch bản chi tiết</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Elder-friendly "3 KHÔNG - 3 BÁO" Golden Principles Guide */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            !
          </div>
          <div>
            <h2
              className={`font-black text-amber-950 ${
                isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
            >
              CẨM NANG VÀNG: NGUYÊN TẮC "3 KHÔNG - 3 BÁO"
            </h2>
            <p className="text-xs sm:text-sm text-amber-800 font-medium">
              Khuyến nghị ghi nhớ cốt lõi từ Bộ Thông tin và Truyền thông & Bộ Công an
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3 KHÔNG */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3">
            <h3 className="font-black text-red-600 text-lg flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 text-xs flex items-center justify-center font-bold">
                ✕
              </span>
              NGUYÊN TẮC "3 KHÔNG"
            </h3>
            <ul className={`space-y-3 text-slate-800 ${isElderMode ? 'text-base font-semibold' : 'text-sm'}`}>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-red-600">1.</span>
                <span>
                  <strong>KHÔNG HOẢNG SỢ & KHÔNG THAM LAM:</strong> Không tin vào lời đe dọa bắt giam qua điện thoại hay những lời hứa việc nhẹ lương cao, hoa hồng khủng.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-red-600">2.</span>
                <span>
                  <strong>KHÔNG BẤM LINK LẠ & KHÔNG CÀI APP NGOÀI:</strong> Tuyệt đối không bấm vào đường link gửi qua SMS/Zalo, không cài ứng dụng có đuôi file .apk.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-red-600">3.</span>
                <span>
                  <strong>KHÔNG CHUYỂN TIỀN & KHÔNG CUNG CẤP OTP:</strong> Không chuyển tiền cho "tài khoản an toàn", không bao giờ đọc mã OTP hay mật khẩu ngân hàng cho bất kỳ ai.
                </span>
              </li>
            </ul>
          </div>

          {/* 3 BÁO */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs space-y-3">
            <h3 className="font-black text-emerald-700 text-lg flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                ✓
              </span>
              NGUYÊN TẮC "3 BÁO"
            </h3>
            <ul className={`space-y-3 text-slate-800 ${isElderMode ? 'text-base font-semibold' : 'text-sm'}`}>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-600">1.</span>
                <span>
                  <strong>BÁO CHO NGƯỜI THÂN & BẠN BÈ:</strong> Khi gặp bất kỳ tình huống nghi vấn đòi tiền nào, hãy lập tức hỏi ý kiến người thân trong nhà để được tư vấn.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-600">2.</span>
                <span>
                  <strong>BÁO CHO NGÂN HÀNG KHÓA TÀI KHOẢN:</strong> Nếu lỡ cung cấp thông tin hoặc chuyển tiền, gọi ngay hotline ngân hàng để khóa tài khoản khẩn cấp.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-bold text-emerald-600">3.</span>
                <span>
                  <strong>BÁO CƠ QUAN CÔNG AN & TỔNG ĐÀI 156:</strong> Gọi 156 phản ánh cuộc gọi lừa đảo và đến Công an phường/xã gần nhất tố giác tội phạm.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
