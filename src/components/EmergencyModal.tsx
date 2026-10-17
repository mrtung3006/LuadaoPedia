import React from 'react';
import { PhoneCall, ShieldAlert, X, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isElderMode: boolean;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, isElderMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className={`font-extrabold ${isElderMode ? 'text-2xl' : 'text-xl'}`}>
                SOS: ĐƯỜNG DÂY NÓNG & CỨU HỘ KHẨN CẤP
              </h3>
              <p className="text-red-100 text-sm">Hỗ trợ nạn nhân lừa đảo và tiếp nhận tố giác tội phạm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Urgent Warning */}
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 text-base">
                  Vừa chuyển tiền hoặc lỡ nhập mã OTP cho kẻ gian?
                </h4>
                <p className="text-red-700 text-sm mt-1">
                  Hãy hành động trong "15 phút vàng"! Thời gian càng nhanh, khả năng ngân hàng phong tỏa kịp số tiền chuyển đi càng cao.
                </p>
              </div>
            </div>
          </div>

          {/* Hotline Grid */}
          <div>
            <h4 className={`font-bold text-slate-800 mb-3 ${isElderMode ? 'text-xl' : 'text-base'}`}>
              Các đầu số Hotline phản ánh và cứu hộ chính thức:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="tel:156"
                className="flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
                    Miễn phí cước
                  </span>
                  <div className="text-2xl font-black text-amber-900 mt-1 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                    156
                  </div>
                  <p className="text-xs text-amber-800 mt-1 font-medium">
                    Tổng đài phản ánh cuộc gọi, tin nhắn rác & lừa đảo (Bộ TTTT)
                  </p>
                </div>
              </a>

              <a
                href="tel:113"
                className="flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-200/60 px-2 py-0.5 rounded">
                    Khẩn cấp 24/7
                  </span>
                  <div className="text-2xl font-black text-red-900 mt-1 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                    113
                  </div>
                  <p className="text-xs text-red-800 mt-1 font-medium">
                    Cảnh sát phản ứng nhanh - Công an toàn quốc
                  </p>
                </div>
              </a>

              <a
                href="tel:0692343636"
                className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-200/60 px-2 py-0.5 rounded">
                    Cơ quan điều tra
                  </span>
                  <div className="text-xl font-black text-blue-900 mt-1 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    069.234.3636
                  </div>
                  <p className="text-xs text-blue-800 mt-1 font-medium">
                    Cục Cảnh sát Hình sự (C02 - Bộ Công an)
                  </p>
                </div>
              </a>

              <a
                href="https://canhbao.ncsc.gov.vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded">
                    Báo cáo trực tuyến
                  </span>
                  <div className="text-lg font-black text-emerald-900 mt-1 flex items-center gap-2">
                    <span>canhbao.ncsc.gov.vn</span>
                    <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-emerald-800 mt-1 font-medium">
                    Cổng tiếp nhận báo cáo trang web/số điện thoại lừa đảo (NCSC)
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* 4 Emergency Steps */}
          <div>
            <h4 className={`font-bold text-slate-800 mb-3 ${isElderMode ? 'text-xl' : 'text-base'}`}>
              Quy trình 4 bước xử lý khẩn cấp khi bạn vừa dính bẫy:
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    GỌI TỔNG ĐÀI NGÂN HÀNG YÊU CẦU KHÓA TÀI KHOẢN VÀ THẺ NGAY
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Số hotline ngân hàng luôn in ở mặt sau thẻ ATM của bạn. Yêu cầu phong tỏa giao dịch chuyển đi để ngăn đối tượng rút tiền.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    NGẮT INTERNET (WIFI, 4G), THÁO SIM VÀ TẮT NGUỒN NẾU ĐÃ CÀI APP LẠ
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Nếu bạn đã tải file .apk hay ứng dụng theo link kẻ gian gửi, việc tắt mạng sẽ ngay lập tức cắt đứt quyền điều khiển từ xa của hacker.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    CHỤP LẠI TẤT CẢ CHỨNG CỨ GIAO DỊCH VÀ TIN NHẮN
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Lưu lại biên lai chuyển khoản (có số tài khoản người nhận, tên người nhận, ngân hàng), chụp lại đoạn chat, số điện thoại kẻ lừa đảo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    ĐẾN NGAY CÔNG AN PHƯỜNG/XÃ HOẶC QUẬN/HUYỆN TRÌNH BÁO
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Nộp đơn tố giác tội phạm kèm chứng cứ. Tuyệt đối KHÔNG tìm đến các dịch vụ "lấy lại tiền lừa đảo" trên mạng vì đó là bẫy lừa kép!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Đã nắm rõ & Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
