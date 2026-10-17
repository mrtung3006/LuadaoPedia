import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Send, ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, Flame, RefreshCw, Clipboard, Trash2, ArrowRight, PhoneCall, HelpCircle } from 'lucide-react';
import { PRESET_SUSPICIOUS_MESSAGES } from '../data/scamDatabase';
import { AiAnalysisResult } from '../types/scam';

interface AiCheckerScreenProps {
  initialText?: string;
  onOpenSos: () => void;
  isElderMode: boolean;
}

export const AiCheckerScreen: React.FC<AiCheckerScreenProps> = ({
  initialText = '',
  onOpenSos,
  isElderMode,
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
    }
  }, [initialText]);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = (textToAnalyze ?? inputText).trim();
    if (!text) {
      setError('Vui lòng dán hoặc nhập nội dung tin nhắn bạn nghi ngờ vào ô trống.');
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Máy chủ gặp sự cố khi phân tích. Vui lòng thử lại.');
      }

      const data: AiAnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err?.message || 'Không thể kết nối đến máy chủ phân tích. Vui lòng kiểm tra lại kết nối mạng.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (presetText: string) => {
    setInputText(presetText);
    setError(null);
    handleAnalyze(presetText);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setInputText(clipText);
        setError(null);
      }
    } catch (e) {
      // Clipboard API might be restricted by browser
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  const getRiskCardStyles = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-50 border-red-500',
          textColor: 'text-red-950',
          badgeBg: 'bg-red-600 text-white',
          badgeText: 'NGUY HIỂM CỰC CAO (KHẨN CẤP)',
          icon: Flame,
          barColor: 'bg-red-600',
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-50 border-orange-500',
          textColor: 'text-orange-950',
          badgeBg: 'bg-orange-600 text-white',
          badgeText: 'RỦI RO CAO',
          icon: AlertTriangle,
          barColor: 'bg-orange-600',
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-50 border-amber-500',
          textColor: 'text-amber-950',
          badgeBg: 'bg-amber-600 text-white',
          badgeText: 'ĐÁNG NGỜ - CẦN THẬN TRỌNG',
          icon: ShieldAlert,
          barColor: 'bg-amber-600',
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-500',
          textColor: 'text-emerald-950',
          badgeBg: 'bg-emerald-600 text-white',
          badgeText: 'AN TOÀN - ÍT RỦI RO',
          icon: CheckCircle2,
          barColor: 'bg-emerald-600',
        };
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
          <span>Trợ lý Trí tuệ Nhân tạo Gemini 3.8 Flash Engine</span>
        </div>

        <h1
          className={`font-black text-slate-900 leading-tight ${
            isElderMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          Trợ lý AI Kiểm chứng Tin nhắn Nghi vấn
        </h1>

        <p
          className={`text-slate-600 max-w-2xl mx-auto leading-relaxed ${
            isElderMode ? 'text-lg font-medium text-slate-700' : 'text-sm sm:text-base'
          }`}
        >
          Nhập hoặc dán nội dung tin nhắn Zalo, SMS, cuộc gọi thoại hay email mà bạn vừa nhận được. Mô hình AI sẽ bóc tách các dấu hiệu gian lận và đưa ra lời khuyên bảo vệ tài sản tức thì.
        </p>
      </div>

      {/* Preset Quick-Test Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
          <span>Hoặc thử nhanh với các mẫu tin nhắn lừa đảo phổ biến:</span>
          <span className="text-slate-400">1 chạm phân tích ngay</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRESET_SUSPICIOUS_MESSAGES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset.text)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors whitespace-nowrap shadow-xs hover:border-amber-400"
            >
              ⚡ {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="scam-text-input"
            className={`font-black text-slate-900 flex items-center gap-2 ${
              isElderMode ? 'text-lg' : 'text-base'
            }`}
          >
            <Bot className="w-5 h-5 text-amber-600" />
            <span>Nội dung tin nhắn / cuộc gọi cần kiểm chứng:</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              type="button"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Dán (Paste)</span>
            </button>
            {inputText && (
              <button
                onClick={handleClear}
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="scam-text-input"
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ví dụ: CÔNG AN THÔNG BÁO bạn có lệnh bắt tạm giam... / Tuyển cộng tác viên đơn hàng Shopee hoa hồng 30%... / Vietcombank thông báo tài khoản bị khóa, bấm vào link sau..."
            className={`w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 placeholder-slate-400 transition-all ${
              isElderMode ? 'text-lg font-medium' : 'text-base'
            }`}
          />
          <div className="text-right text-xs text-slate-400 mt-1">
            {inputText.length} / 4000 ký tự
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            🔒 Bảo mật tuyệt đối: Quá trình phân tích thực hiện an toàn qua server proxy, không lưu trữ thông tin cá nhân.
          </p>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              loading || !inputText.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-700 hover:to-orange-700 text-white shadow-orange-500/20 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Gemini đang phân tích...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Phân tích rủi ro ngay</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-pulse">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Bot className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Đang đối soát dữ liệu với mô hình Gemini AI...</h3>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống đang quét các mẫu câu thao túng tâm lý, từ khóa tài chính và dấu hiệu mạo danh.
            </p>
          </div>
        </div>
      )}

      {/* Analysis Result Display */}
      {result && !loading && (
        <div
          className={`rounded-3xl border-2 p-6 sm:p-8 space-y-6 shadow-md transition-all ${
            getRiskCardStyles(result.riskLevel).bg
          }`}
        >
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-5">
            <div className="space-y-1">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  getRiskCardStyles(result.riskLevel).badgeBg
                }`}
              >
                {React.createElement(getRiskCardStyles(result.riskLevel).icon, {
                  className: 'w-4 h-4',
                })}
                {getRiskCardStyles(result.riskLevel).badgeText}
              </span>
              <h2
                className={`font-black pt-2 ${
                  getRiskCardStyles(result.riskLevel).textColor
                } ${isElderMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}
              >
                {result.verdictTitle}
              </h2>
            </div>

            {/* Risk Gauge Metric */}
            <div className="bg-white p-4 rounded-2xl border border-black/10 text-center shrink-0 min-w-36 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase block">Thang điểm rủi ro:</span>
              <div className="text-3xl font-black text-slate-900 mt-0.5">
                {result.riskScore}
                <span className="text-base text-slate-500"> / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full ${getRiskCardStyles(result.riskLevel).barColor}`}
                  style={{ width: `${result.riskScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-white/80 p-5 rounded-2xl border border-black/10 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Đánh giá từ chuyên gia an ninh:</span>
            </h3>
            <p
              className={`text-slate-800 leading-relaxed font-normal ${
                isElderMode ? 'text-lg font-medium' : 'text-base'
              }`}
            >
              {result.summary}
            </p>
            {result.matchedScamType && (
              <div className="pt-2 text-xs font-bold text-slate-700">
                <span>Dạng thủ đoạn trùng khớp: </span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {result.matchedScamType}
                </span>
              </div>
            )}
          </div>

          {/* Red Flags & Tricks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Red flags */}
            <div className="bg-white p-5 rounded-2xl border border-black/10 space-y-3">
              <h4 className="font-black text-red-600 text-sm uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Các dấu hiệu đáng ngờ (Red Flags):</span>
              </h4>
              <ul className="space-y-2">
                {result.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Psychological tricks */}
            <div className="bg-white p-5 rounded-2xl border border-black/10 space-y-3">
              <h4 className="font-black text-amber-700 text-sm uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Đòn thao túng tâm lý phát hiện:</span>
              </h4>
              <ul className="space-y-2">
                {result.psychologicalTricks && result.psychologicalTricks.length > 0 ? (
                  result.psychologicalTricks.map((trick, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                      <span>{trick}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-500">Không phát hiện đòn thao túng tâm lý rõ ràng.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white p-5 rounded-2xl border border-black/10 space-y-3">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Lời khuyên hành động an toàn ngay lúc này:</span>
            </h4>
            <div className="space-y-2">
              {result.recommendedActions.map((action, i) => (
                <div key={i} className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className={`text-slate-900 ${isElderMode ? 'text-base font-semibold' : 'text-sm font-medium'}`}>
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions & SOS button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => handleAnalyze()}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Phân tích lại văn bản này</span>
            </button>

            <button
              onClick={onOpenSos}
              className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cần cứu hộ khẩn cấp? Mở đường dây nóng SOS 156</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
