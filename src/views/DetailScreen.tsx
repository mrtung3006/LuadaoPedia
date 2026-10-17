import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, AlertTriangle, Flame, CheckSquare, Square, Bot, PhoneCall, ShieldCheck, Share2, Copy, Check, Eye } from 'lucide-react';
import { ScamScenario, ScamSeverity } from '../types/scam';

interface DetailScreenProps {
  scam: ScamScenario;
  onBack: () => void;
  onCheckWithAi: (sampleText: string) => void;
  onOpenSos: () => void;
  isElderMode: boolean;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  scam,
  onBack,
  onCheckWithAi,
  onOpenSos,
  isElderMode,
}) => {
  // Interactive checklist state for user self-testing
  const [checkedSigns, setCheckedSigns] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleSign = (index: number) => {
    setCheckedSigns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const checkedCount = Object.values(checkedSigns).filter(Boolean).length;
  const totalSigns = scam.signs.length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityBadge = (severity: ScamSeverity) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-red-100 text-red-800 border border-red-300">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            MỨC ĐỘ: CỰC KỲ NGUY HIỂM (KHẨN CẤP)
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-black bg-orange-100 text-orange-800 border border-orange-300">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            MỨC ĐỘ: RỦI RO CAO
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            MỨC ĐỘ: TRUNG BÌNH
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 transition-colors shadow-xs text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Thư viện</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-semibold border border-slate-200 transition-colors text-xs sm:text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép link' : 'Chia sẻ kịch bản'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-slate-100 text-slate-800">
            {scam.category}
          </span>
          {getSeverityBadge(scam.severity)}
          <span className="text-xs text-slate-400 font-medium ml-auto">
            Cập nhật: {scam.updatedDate || '2026-10-16'}
          </span>
        </div>

        <h1
          className={`font-black text-slate-900 leading-tight ${
            isElderMode ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl lg:text-3xl'
          }`}
        >
          {scam.title}
        </h1>

        <p
          className={`text-slate-600 leading-relaxed font-normal ${
            isElderMode ? 'text-lg sm:text-xl font-medium text-slate-700' : 'text-base sm:text-lg'
          }`}
        >
          {scam.description}
        </p>

        {/* Target Audience & Common Channels */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="font-bold text-slate-700 block mb-1">Đối tượng kẻ gian thường nhắm tới:</span>
            <span className="text-slate-600 font-medium">{scam.targetAudience}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <span className="font-bold text-slate-700 block mb-1">Kênh liên lạc thường dùng:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {scam.commonChannels.map((channel, i) => (
                <span key={i} className="px-2 py-0.5 bg-white text-slate-700 font-semibold rounded border border-slate-200 text-xs">
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Scenario Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className={`font-black text-slate-900 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            Kịch bản diễn ra từng bước (Quy trình kẻ gian giăng bẫy)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Hiểu rõ quy trình giúp bạn nhận biết ngay khi đối tượng vừa thực hiện bước đầu tiên
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {scam.scamWorkflow.map((item) => (
            <div key={item.step} className="relative flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0 z-10 shadow-sm">
                {item.step}
              </div>
              <div className="flex-1 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className={`font-black text-slate-900 ${isElderMode ? 'text-lg' : 'text-base'}`}>
                    Bước {item.step}: {item.phase}
                  </h3>
                </div>
                <p className={`text-slate-700 leading-relaxed ${isElderMode ? 'text-base font-medium' : 'text-sm'}`}>
                  {item.action}
                </p>
                {item.dangerNote && (
                  <div className="mt-2 text-xs font-semibold text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span><strong>Điểm hiểm ác:</strong> {item.dangerNote}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Signs Checklist */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl border-2 border-red-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`font-black text-red-950 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              Checklist Dấu hiệu nhận biết đáng ngờ
            </h2>
            <p className="text-sm text-red-800 mt-1">
              Hãy tích vào các ô nếu bạn hoặc người thân đang gặp phải tình huống tương tự:
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-red-300 text-right shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase block">Trùng khớp:</span>
            <span className="text-lg font-black text-red-600">
              {checkedCount} / {totalSigns} dấu hiệu
            </span>
          </div>
        </div>

        {/* Dynamic warning banner if user checks signs */}
        {checkedCount > 0 && (
          <div className="bg-red-600 text-white p-4 rounded-2xl shadow-md flex items-start gap-3 animate-fade-in">
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-amber-300 animate-bounce" />
            <div>
              <p className="font-extrabold text-base">
                CẢNH BÁO NGUY HIỂM: TÌNH HUỐNG CỦA BẠN TRÙNG KHỚP {checkedCount} DẤU HIỆU LỪA ĐẢO!
              </p>
              <p className="text-xs sm:text-sm text-red-100 mt-1">
                Tuyệt đối không chuyển tiền, không bấm link, không cung cấp OTP hay mật khẩu. Hãy cúp máy ngay và hỏi ý kiến người thân hoặc công an!
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2.5">
          {scam.signs.map((sign, idx) => {
            const isChecked = !!checkedSigns[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleSign(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'bg-red-100/80 border-red-400 text-red-950 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-red-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <p className={`font-medium flex-1 ${isElderMode ? 'text-base sm:text-lg' : 'text-sm'}`}>
                  {sign}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-world Example Box with Quick AI check button */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Eye className="w-4 h-4" />
            <span>VÍ DỤ VỤ ÁN THỰC TẾ & MẪU TIN NHẮN TỪNG XẢY RA:</span>
          </div>
          <button
            onClick={() => onCheckWithAi(scam.realWorldSample)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition-transform active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Nạp tin nhắn này vào AI phân tích</span>
          </button>
        </div>

        <blockquote className="border-l-4 border-amber-400 pl-4 py-2 text-slate-300 italic text-sm sm:text-base leading-relaxed bg-white/5 rounded-r-xl">
          "{scam.realWorldSample}"
        </blockquote>
      </div>

      {/* Prevention Guidelines */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className={`font-black text-slate-900 flex items-center gap-2 ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            Cách phòng tránh triệt để (Không bao giờ sập bẫy)
          </h2>
        </div>

        <ul className="space-y-3">
          {scam.prevention.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </span>
              <p className={`text-slate-800 ${isElderMode ? 'text-base font-semibold' : 'text-sm font-medium'}`}>
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* What to do if already scammed (Emergency Action Plan) */}
      <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`font-black text-red-950 ${isElderMode ? 'text-2xl' : 'text-xl'}`}>
                HƯỚNG DẪN XỬ LÝ KHẨN CẤP KHI ĐÃ SẬP BẪY
              </h2>
              <p className="text-xs text-red-700">Hãy bình tĩnh thực hiện theo các bước sau ngay lập tức:</p>
            </div>
          </div>

          <button
            onClick={onOpenSos}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Gọi Hotline cứu hộ ngay</span>
          </button>
        </div>

        <div className="space-y-2.5 pt-2">
          {scam.victimActionPlan.map((action, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-red-200">
              <span className="font-bold text-red-600 text-sm shrink-0 mt-0.5">Bước {idx + 1}:</span>
              <p className={`text-slate-900 ${isElderMode ? 'text-base font-semibold' : 'text-sm font-medium'}`}>
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-colors text-center"
        >
          ← Quay lại danh sách kịch bản
        </button>

        <button
          onClick={() => onCheckWithAi(scam.realWorldSample)}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Bot className="w-4 h-4" />
          <span>Kiểm chứng tin nhắn của bạn với Trợ lý AI</span>
        </button>
      </div>
    </div>
  );
};
