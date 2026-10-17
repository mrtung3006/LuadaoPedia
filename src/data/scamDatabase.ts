import { ScamScenario, ReferenceSource } from '../types/scam';

export const SCAM_CATEGORIES = [
  'Tất cả hình thức',
  'Mạo danh cơ quan chức năng',
  'Lừa đảo tài chính & ngân hàng',
  'Tuyển dụng & Việc làm trực tuyến',
  'Mã độc & Ứng dụng giả mạo',
  'Deepfake & Giả mạo người thân',
  'Bẫy tình cảm & Đầu tư tài chính',
  'Lừa đảo kép (Thu hồi vốn)'
] as const;

export const SCAM_DATABASE: ScamScenario[] = [
  {
    id: 'mao-danh-cong-an-vks',
    title: 'Giả danh Công an, Viện Kiểm Sát dọa bắt giam và yêu cầu chuyển tiền',
    category: 'Mạo danh cơ quan chức năng',
    severity: 'CRITICAL',
    summary: 'Kẻ lừa đảo đóng giả cán bộ công an hoặc kiểm sát viên, đe dọa nạn nhân liên quan đến đường dây rửa tiền, ma túy và ép chuyển toàn bộ tiền vào "tài khoản an toàn của cơ quan điều tra".',
    description: 'Đối tượng sử dụng công nghệ gọi điện VoIP giả số máy cơ quan công an, thông báo nạn nhân đang có lệnh bắt tạm giam hoặc bị điều tra trong vụ án rửa tiền, buôn bán ma túy xuyên quốc gia. Kẻ lừa đảo gửi các giấy tờ lệnh bắt giả mạo có con dấu đỏ qua Zalo, Telegram. Sau đó, chúng yêu cầu nạn nhân phải tuyệt đối giữ bí mật, không được nói với người nhà, rút hết sổ tiết kiệm hoặc vay mượn để chuyển vào "tài khoản tạm giữ của cơ quan thụ lý" nhằm chứng minh sự trong sạch. Ngay khi tiền vào tài khoản, kẻ lừa đảo lập tức tẩu tán qua nhiều tài khoản ảo và cắt đứt liên lạc.',
    signs: [
      'Cuộc gọi tự xưng là cán bộ Công an, Viện kiểm sát, Tòa án qua điện thoại thông thường hoặc Zalo.',
      'Gửi "Lệnh bắt tạm giam", "Lệnh kê biên tài sản" qua Zalo, Telegram, mạng xã hội.',
      'Đe dọa bắt giam ngay lập tức nếu không làm theo hướng dẫn hoặc tiết lộ cho người thân.',
      'Yêu cầu chuyển tiền vào "Tài khoản an toàn", "Tài khoản giám định", "Tài khoản cá nhân đứng tên lạ".',
      'Yêu cầu nạn nhân ở một mình trong phòng kín, bật chế độ giữ máy liên tục nhiều giờ liền.',
      'Yêu cầu cung cấp mật khẩu ngân hàng, mã OTP hoặc cài phần mềm có biểu tượng huy hiệu công an (thực chất là mã độc).'
    ],
    prevention: [
      'Ghi nhớ quy tắc cốt lõi: Cơ quan Công an, Viện Kiểm sát, Tòa án TUYỆT ĐỐI KHÔNG làm việc qua điện thoại hay gửi văn bản tố tụng qua mạng xã hội (Zalo, Telegram).',
      'Nếu có liên quan đến bất kỳ vụ án nào, cơ quan chức năng sẽ gửi giấy mời hoặc giấy triệu tập trực tiếp qua công an xã/phường nơi bạn cư trú.',
      'Không chuyển bất kỳ khoản tiền nào cho bất kỳ ai tự xưng là cán bộ nhà nước với lý do "xác minh tài chính" hay "tài khoản tạm giữ".',
      'Khi nhận cuộc gọi nghi vấn, bình tĩnh cúp máy ngay lập tức và liên hệ trực tiếp với Công an khu vực gần nhất hoặc gọi tổng đài 113 để xác minh.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Tiếp cận & Dọa dẫm',
        action: 'Kẻ gian gọi điện xưng là cán bộ công an hình sự, đọc chính xác họ tên, số CCCD của nạn nhân để tạo lòng tin, rồi đe dọa nạn nhân dính líu đến đường dây phạm tội đặc biệt nguy hiểm.',
        dangerNote: 'Khai thác tâm lý hoang mang, sợ vướng vào vòng lao lý.'
      },
      {
        step: 2,
        phase: 'Cô lập nạn nhân',
        action: 'Bắt nạn nhân vào phòng đóng kín cửa, yêu cầu không được để ai nghe thấy, dọa rằng người thân có thể là đối tượng đồng phạm nên không được tiết lộ bí mật điều tra.',
        dangerNote: 'Cắt đứt khả năng nạn nhân nhận được lời khuyên can từ người thân.'
      },
      {
        step: 3,
        phase: 'Gửi bằng chứng giả mạo',
        action: 'Kết bạn Zalo/Telegram, gửi hình ảnh lệnh bắt, lệnh kê biên tài sản có quốc huy, con dấu đỏ giả mạo cùng hình ảnh cán bộ mặc quân phục.',
        dangerNote: 'Nhiều người lớn tuổi bị thuyết phục bởi hình ảnh con dấu đỏ.'
      },
      {
        step: 4,
        phase: 'Ép chuyển tiền hoặc chiếm quyền tài khoản',
        action: 'Yêu cầu rút tiền tiết kiệm chuyển sang số tài khoản lạ được gọi là "Hội đồng giám định", hoặc dụ tải app có logo Bộ Công an chứa mã độc nhằm trộm OTP ngân hàng.',
        dangerNote: 'Mất trắng toàn bộ số tiền tiết kiệm trong vòng vài phút.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: "Tôi là Thiếu tá Nguyễn Văn H., Cục Cảnh sát Hình sự C02. Tài khoản ngân hàng của chị Nguyễn Thị M. (58 tuổi, Hà Nội) vừa nhận 2 tỷ đồng từ đường dây rửa tiền ma túy. Yêu cầu chị chuyển 450 triệu đồng vào tài khoản giám định của cơ quan điều tra tại VietinBank mang tên BÙI THỊ LAN để niêm phong xác minh. Nếu sau 2 tiếng không chuyển, lực lượng đặc nhiệm sẽ đến áp giải chị!" -> Hậu quả nạn nhân chuyển 450 triệu và mất trắng.',
    commonChannels: ['Cuộc gọi thoại VoIP quốc tế', 'Zalo', 'Telegram'],
    targetAudience: 'Người cao tuổi, cán bộ hưu trí, người ít tiếp cận tin tức thời sự.',
    victimActionPlan: [
      'Ngay lập tức gọi điện lên đường dây nóng ngân hàng bạn vừa chuyển tiền, yêu cầu KHÓA TÀI KHOẢN KHẨN CẤP và đề nghị hỗ trợ phong tỏa tra soát giao dịch.',
      'Chụp lại toàn bộ lịch sử cuộc gọi, tin nhắn, số tài khoản nhận tiền, tên chủ tài khoản thụ hưởng.',
      'Đến ngay cơ quan Công an phường/xã hoặc Đội Cảnh sát hình sự gần nhất để trình báo và lập biên bản tố giác tội phạm.'
    ],
    viewsCount: 15420,
    updatedDate: '2026-10-15'
  },
  {
    id: 'cai-app-dich-vu-cong-vneid-thue',
    title: 'Giả mạo cán bộ Thuế / Công an dụ cài đặt App Dịch vụ công, VNeID chứa mã độc',
    category: 'Mã độc & Ứng dụng giả mạo',
    severity: 'CRITICAL',
    summary: 'Kẻ gian hướng dẫn nạn nhân tải file APK cài đặt ứng dụng dịch vụ công hoặc thuế điện tử giả mạo, từ đó chiếm quyền trợ năng Accessibility trên điện thoại Android, tự động theo dõi màn hình và chuyển sạch tiền trong tài khoản.',
    description: 'Đối tượng gọi điện tự xưng là cán bộ Chi cục Thuế, cán bộ Công an quản lý hành chính về trật tự xã hội, yêu cầu người dân đồng bộ thông tin căn cước công dân VNeID mức độ 2, cập nhật mã định danh cá nhân hoặc quyết toán giảm trừ thuế thu nhập cá nhân. Lấy lý do "hệ thống Cổng Dịch vụ công quá tải hoặc lỗi trên Google Play", kẻ gian gửi đường link tải trực tiếp (file có đuôi .apk hoặc trang web giả mạo dichvucong-gov-vn.com). Khi nạn nhân cài đặt và cấp quyền Trợ năng (Accessibility Service), kẻ gian từ xa có thể theo dõi bàn phím nhập mật khẩu, tự động đọc mã OTP và chiếm đoạt hoàn toàn tài khoản ngân hàng trên điện thoại kể cả khi nạn nhân không cầm máy.',
    signs: [
      'Người gọi tự xưng cán bộ thuế/công an phường yêu cầu cập nhật thông tin qua điện thoại gấp trong ngày.',
      'Yêu cầu truy cập vào trang web lạ không có đuôi chính thống ".gov.vn" (ví dụ: dichvucong.apk-gov.xyz, thuedientu-gov.com).',
      'Gửi file cài đặt trực tiếp có đuôi ".apk" qua Zalo hoặc trình duyệt web.',
      'Ứng dụng khi cài đòi cấp quyền "Trợ năng" (Accessibility Service), quyền theo dõi màn hình, quyền đọc SMS.',
      'Màn hình điện thoại có hiện tượng tự sáng đèn, tự thao tác, chạy ứng dụng ngân hàng ngầm hoặc bị tối đen không điều khiển được.'
    ],
    prevention: [
      'Tuyệt đối KHÔNG cài đặt ứng dụng từ các đường link lạ gửi qua Zalo, Facebook, SMS hoặc website ngoài Google Play / App Store.',
      'Ứng dụng VNeID chính thức chỉ tải duy nhất từ Google Play (Android) và App Store (iOS) do Bộ Công an phát hành.',
      'Công an và cán bộ Thuế chỉ hỗ trợ làm thủ tục trực tiếp tại trụ sở ủy ban, công an phường hoặc chi cục thuế, không gọi điện ép cài app qua link riêng.',
      'Kiểm tra tên miền cơ quan nhà nước Việt Nam luôn có đuôi bắt buộc là ".gov.vn". Tuyệt đối cảnh giác với đuôi .com, .vn, .xyz, .online.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Gọi điện hỗ trợ thủ tục',
        action: 'Kẻ lừa đảo gọi thông báo CCCD của bạn bị sai thông tin cư trú hoặc chưa kích hoạt mã định danh thuế, dọa nếu không làm ngay sẽ bị khóa tài khoản hoặc phạt hành chính.',
        dangerNote: 'Đánh trúng thời điểm người dân đang làm định danh số hoặc quyết toán thuế.'
      },
      {
        step: 2,
        phase: 'Dẫn dụ tải file APK',
        action: 'Gửi link web giao diện giống 100% Cổng Dịch vụ công Quốc gia, hướng dẫn nạn nhân bấm "Cài đặt ngay" tải file APK về máy.',
        dangerNote: 'Vượt qua cơ chế kiểm duyệt bảo mật của chợ ứng dụng Google Play.'
      },
      {
        step: 3,
        phase: 'Yêu cầu mở quyền Trợ năng',
        action: 'Hướng dẫn nạn nhân vào Cài đặt -> Hỗ trợ -> Bật quyền Accessibility cho ứng dụng giả mạo.',
        dangerNote: 'Quyền Trợ năng cho phép ứng dụng đọc mọi thứ trên màn hình và tự bấm nút.'
      },
      {
        step: 4,
        phase: 'Rút sạch tiền ngầm',
        action: 'Kẻ gian chờ ban đêm hoặc điều khiển màn hình điện thoại tối đen, ngầm mở app ngân hàng, đăng nhập bằng mật khẩu đã ghi lại và chuyển hết tiền ra tài khoản rác.',
        dangerNote: 'Nạn nhân thức dậy vào sáng hôm sau mới bàng hoàng thấy tài khoản về 0 đồng.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Anh Trần Văn T. (Đà Nẵng) nhận cuộc gọi tự xưng Chi cục Thuế yêu cầu cài app "Thuế Điện Tử.apk" để nhận hoàn thuế 4.5 triệu đồng. Sau khi cài và cấp quyền trợ năng, điện thoại anh T. bị đơ màn hình 15 phút. Khi khởi động lại máy, tin nhắn ngân hàng báo tài khoản đã bị chuyển đi 3 lần với tổng số tiền 320 triệu đồng.',
    commonChannels: ['Cuộc gọi điện thoại', 'Zalo gửi link tải file APK'],
    targetAudience: 'Người dùng điện thoại hệ điều hành Android, hộ kinh doanh cá thể, người làm kế toán, người lao động.',
    victimActionPlan: [
      'LẬP TỨC TẮT KẾT NỐI WIFI VÀ DỮ LIỆU DI ĐỘNG 4G/5G hoặc tháo SIM, tắt nguồn điện thoại để cắt quyền điều khiển từ xa của hacker.',
      'Dùng một điện thoại khác gọi ngay cho tổng đài ngân hàng yêu cầu TẠM KHÓA KHẨN CẤP dịch vụ Internet Banking / Mobile Banking.',
      'Mang điện thoại đến trung tâm bảo hành uy tín để khôi phục cài đặt gốc (Factory Reset) loại bỏ hoàn toàn mã độc gián điệp.',
      'Lập hồ sơ trình báo cơ quan công an địa phương.'
    ],
    viewsCount: 22890,
    updatedDate: '2026-10-16'
  },
  {
    id: 'tuyen-dung-ctv-nhiem-vu',
    title: 'Tuyển dụng Cộng tác viên làm nhiệm vụ Shopee/TikTok/Telegram hoa hồng cao',
    category: 'Tuyển dụng & Việc làm trực tuyến',
    severity: 'HIGH',
    summary: 'Mồi chài người tìm việc làm thêm tại nhà với mức hoa hồng 10-30%, ban đầu trả tiền sòng phẳng cho các nhiệm vụ nhỏ vài chục nghìn đồng, sau đó nâng dần tiền nạp lên hàng chục, hàng trăm triệu rồi viện cớ giam tiền.',
    description: 'Nạn nhân nhận được tin nhắn hoặc thấy bài quảng cáo tuyển "Cộng tác viên xử lý đơn hàng online Shopee, Lazada, Tiki", "Xem video TikTok nhận 50.000đ/lượt", "Đọc sách lồng tiếng tại nhà lương 500k/ngày". Khi tham gia, nạn nhân được đưa vào nhóm Telegram có nhiều "chim mồi" liên tục khoe nhận tiền hoa hồng thành công. Ở các nhiệm vụ đầu trị giá 100.000đ - 500.000đ, nạn nhân nạp tiền và được trả lại gốc cộng hoa hồng 20% rất sòng phẳng. Khi nạn nhân đã tin tưởng nạp số tiền lớn (vài chục đến hàng trăm triệu), kẻ gian viện đủ lý do: sai cú pháp nạp, hệ thống treo đơn, đơn hàng combo VIP, điểm tín nhiệm thấp... bắt phải nạp thêm tiền để "cứu vốn". Đến khi nạn nhân cạn kiệt tài chính thì bị đuổi khỏi nhóm.',
    signs: [
      'Công việc "việc nhẹ lương cao", làm tại nhà chỉ cần điện thoại, kiếm 500.000đ - 2.000.000đ/ngày.',
      'Làm CTV nhưng yêu cầu người tham gia phải tự bỏ tiền túi ra nạp trước để "ôm đơn hàng" hoặc "tạo số dư nhiệm vụ".',
      'Được hướng dẫn tham gia nhóm chat Telegram, trong nhóm toàn nick ảo liên tục chụp ảnh sao kê nhận tiền.',
      'Các nhiệm vụ đầu tiên được trả gốc lẫn lãi rất nhanh để tạo lòng tin.',
      'Khi số tiền nạp lớn, hệ thống báo "Lỗi cú pháp", "Chưa hoàn thành nhiệm vụ kép", yêu cầu nạp thêm tiền gấp 2-3 lần để rút tiền cũ.'
    ],
    prevention: [
      'Ghi nhớ nguyên tắc: KHÔNG CÓ CÔNG VIỆC NÀO ĐÒI HỎI BẠN PHẢI NẠP TIỀN ĐỂ ĐƯỢC LÀM VIỆC.',
      'Các sàn thương mại điện tử chính thống (Shopee, Lazada, TikTok Shop) khẳng định không bao giờ tuyển CTV chốt đơn qua tin nhắn Zalo hay Telegram.',
      'Cảnh giác với các nhóm chat Telegram có quá nhiều người tung hô việc kiếm tiền dễ dàng; 99% trong số đó là tài khoản ảo hoặc đồng bọn của kẻ lừa đảo.',
      'Dừng ngay lập tức khi đối phương yêu cầu nạp thêm tiền để giải cứu tiền cũ.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Thả mồi câu hoa hồng',
        action: 'Quảng cáo tuyển việc nhẹ lương cao trên Facebook, tuyển qua tin nhắn WhatsApp, Zalo. Hướng dẫn làm nhiệm vụ thích video TikTok hoặc thả tim sản phẩm Shopee nhận 20.000đ - 50.000đ.',
        dangerNote: 'Khai thác nhu cầu kiếm thêm thu nhập của sinh viên, mẹ bỉm sữa.'
      },
      {
        step: 2,
        phase: 'Tạo uy tín bằng tiền thật',
        action: 'Nạn nhân nạp 200.000đ làm đơn hàng thử nghiệm, kẻ gian chuyển khoản trả lại ngay 240.000đ (lời 40k). Tiếp tục với đơn 1.000.000đ nhận về 1.250.000đ.',
        dangerNote: 'Nạn nhân hoàn toàn mất cảnh giác vì thấy tiền về tài khoản thật.'
      },
      {
        step: 3,
        phase: 'Nâng hạn mức & Giữ chân',
        action: 'Kẻ gian đưa ra gói đơn VIP 20 triệu - 50 triệu - 100 triệu với hoa hồng 30%. Khi nạp xong, hệ thống thông báo "Đơn hàng liên hoàn, phải hoàn thành nốt đơn 150 triệu mới được rút cả gốc lẫn lãi".',
        dangerNote: 'Tâm lý tiếc tiền nạp trước đó khiến nạn nhân đi vay mượn khắp nơi để nạp thêm.'
      },
      {
        step: 4,
        phase: 'Chặn liên lạc & Chiếm đoạt',
        action: 'Khi nạn nhân không còn khả năng vay mượn để nạp tiếp, kẻ gian lập tức xóa nhóm chat Telegram, chặn tài khoản và xóa mọi dấu vết.',
        dangerNote: 'Nạn nhân gánh khoản nợ khổng lồ từ người thân hoặc ứng dụng vay tiền nhanh.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Em Lê Thị H. (sinh viên năm 2 tại TP.HCM) tham gia làm CTV chốt đơn Tiki trên Telegram. Ban đầu nạp 300k được nhận lại 360k. Sau đó em được giao đơn hàng máy tính bảng trị giá 15 triệu, rồi tiếp tục bị ép hoàn thành đơn bổ sung 45 triệu mới được rút. Em đã vay bạn bè và cắm laptop nạp tổng cộng 85 triệu đồng rồi bị kẻ gian đá khỏi nhóm chat.',
    commonChannels: ['Tin nhắn rác Telegram', 'Quảng cáo Facebook/TikTok', 'Zalo tuyển dụng'],
    targetAudience: 'Sinh viên, học sinh, mẹ bỉm sữa ở nhà chăm con, người lao động đang cần tiền khẩn cấp.',
    victimActionPlan: [
      'DỪNG LẠI NGAY LẬP TỨC: Tuyệt đối không tiếp tục nạp thêm bất kỳ một đồng nào dù kẻ gian hứa hẹn sẽ trả lại.',
      'Sao lưu toàn bộ đoạn chat Telegram, chụp màn hình hình ảnh người hướng dẫn, thông tin tài khoản ngân hàng thụ hưởng, biên lai chuyển khoản.',
      'Trình báo ngay sự việc với Cơ quan Công an và Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC) tại website canhbao.ncsc.gov.vn.'
    ],
    viewsCount: 31200,
    updatedDate: '2026-10-14'
  },
  {
    id: 'gia-mao-sms-brandname-ngan-hang',
    title: 'Giả mạo SMS Brandname Ngân hàng thông báo tài khoản bị khóa hoặc trừ tiền',
    category: 'Lừa đảo tài chính & ngân hàng',
    severity: 'CRITICAL',
    summary: 'Tin nhắn lừa đảo chui tọt vào cùng luồng tin nhắn chính thức của ngân hàng nhờ trạm phát sóng BTS giả, thông báo tài khoản đăng nhập ở nơi khác hoặc bị trừ phí lạ, dụ người dùng click link giả mạo để cướp OTP.',
    description: 'Các đối tượng sử dụng thiết bị trạm phát sóng di động giả mạo (Fake BTS) đặt trên ô tô hoặc xe máy chạy quanh các khu vực đông dân cư. Thiết bị này phát sóng chèn sóng của nhà mạng viễn thông, gửi tin nhắn SMS có tên thương hiệu (Brandname) y hệt tên ngân hàng (như Vietcombank, Techcombank, BIDV, MBBank) vào đúng luồng tin nhắn thật mà ngân hàng vẫn gửi biến động số dư. Nội dung tin nhắn cảnh báo: "Tài khoản của quý khách đang đăng nhập trên thiết bị lạ tại Singapore, nếu không phải bạn vui lòng truy cập https://vietcombank-security-service.com để hủy". Trang web giả mạo có giao diện giống hệt trang đăng nhập của ngân hàng. Khi nạn nhân nhập tên đăng nhập, mật khẩu và mã OTP, kẻ gian ngay lập tức chuyển toàn bộ tiền trong tài khoản đi nơi khác.',
    signs: [
      'Tin nhắn hiển thị đúng tên ngân hàng nhưng nội dung chứa đường link website kỳ lạ (không phải tên miền chính thức của ngân hàng).',
      'Đường link chứa các từ ngữ như: hethong-nganhang, security-ebank, xac-thuc-otp, huy-dich-vu...',
      'Tin nhắn mang tính chất khẩn cấp cao: "Nếu không xác minh trong 5 phút tài khoản sẽ bị đóng vĩnh viễn" hoặc "Tài khoản bị trừ 5.000.000đ".',
      'Trang web yêu cầu nhập đồng thời Tên đăng nhập, Mật khẩu VÀ MÃ OTP / MÃ SMART OTP.',
      'Mã OTP gửi về điện thoại có nội dung "Giao dịch chuyển tiền" nhưng nạn nhân lại nghĩ là OTP để "hủy dịch vụ" hoặc "đăng nhập".'
    ],
    prevention: [
      'Ngân hàng KHÔNG BAO GIỜ gửi tin nhắn kèm đường link bắt buộc khách hàng đăng nhập tài khoản hay nhập mã OTP.',
      'Chỉ truy cập website ngân hàng bằng cách tự tay gõ đúng địa chỉ chính thức (ví dụ: vietcombank.com.vn) hoặc mở trực tiếp app Mobile Banking đã cài sẵn.',
      'Luôn đọc kỹ nội dung tin nhắn OTP: Nếu tin nhắn ghi "OTP cho giao dịch chuyển tiền số tiền ... VNĐ", tuyệt đối không nhập vào bất kỳ trang web nào!',
      'Kích hoạt tính năng xác thực sinh trắc học (khuôn mặt/vân tay) và Smart OTP trên ứng dụng ngân hàng.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Phát sóng BTS giả mạo',
        action: 'Kẻ lừa đảo kích hoạt trạm BTS mini, ép điện thoại của nạn nhân bắt sóng 2G giả và nhận tin nhắn có hiển thị SMS Brandname ngân hàng chuẩn xác.',
        dangerNote: 'Tin nhắn nằm lọt vào cùng chuỗi tin nhắn thật khiến nạn nhân tuyệt đối tin tưởng.'
      },
      {
        step: 2,
        phase: 'Tạo cảm giác nguy cấp',
        action: 'Nội dung tin nhắn: "Tài khoản của bạn vừa đăng nhập tại trình duyệt lạ ở nước ngoài, vui lòng xác thực để bảo vệ số dư".',
        dangerNote: 'Kích hoạt tâm lý sợ mất tiền, thôi thúc nạn nhân bấm link ngay lập tức.'
      },
      {
        step: 3,
        phase: 'Bẫy Phishing câu mã OTP',
        action: 'Nạn nhân nhập thông tin đăng nhập vào web giả. Kẻ gian dùng thông tin đó đăng nhập song song vào web ngân hàng thật và kích hoạt chuyển tiền.',
        dangerNote: 'Hệ thống ngân hàng gửi OTP thật về máy nạn nhân, nạn nhân lại điền OTP đó vào trang web giả.'
      },
      {
        step: 4,
        phase: 'Rút tiền chớp nhoáng',
        action: 'Kẻ gian nhận được OTP trên hệ thống máy chủ giả mạo, nhập vào ngân hàng thật và hoàn tất lệnh chuyển tiền trong 10 giây.',
        dangerNote: 'Tiền bị chia nhỏ qua hàng chục tài khoản ảo mua tiền ảo hoặc thẻ cào.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Chị Mai (Cầu Giấy, Hà Nội) nhận được tin nhắn trong luồng Brandname VCB: "Vietcombank tran trong thong bao: Tai khoan cua ban da dang ky dich vu ebank tai thiet bi khac. Neu khong phai quy khach, vui long vao https://vcb-digibank-help.com de huy". Chị Mai bấm vào, đăng nhập và nhập mã OTP. Chỉ 30 giây sau, điện thoại ting ting trừ 180 triệu đồng.',
    commonChannels: ['Tin nhắn SMS điện thoại (qua trạm BTS giả mạo)'],
    targetAudience: 'Tất cả khách hàng sử dụng dịch vụ ngân hàng trực tuyến (Internet Banking/Mobile Banking).',
    victimActionPlan: [
      'GỌI NGAY CHO TỔNG ĐÀI KHẨN CẤP CỦA NGÂN HÀNG (số hotline in ở mặt sau thẻ ATM) yêu cầu khóa ngay tài khoản và khóa dịch vụ Internet Banking.',
      'Đổi ngay mật khẩu email, mật khẩu các ứng dụng ngân hàng khác nếu bạn dùng chung một mật khẩu.',
      'Gửi thông báo phản ánh cuộc gọi/tin nhắn rác và lừa đảo về tổng đài 156 của Bộ Thông tin & Truyền thông (miễn phí).'
    ],
    viewsCount: 28400,
    updatedDate: '2026-10-12'
  },
  {
    id: 'deepfake-video-call-nguoi-than',
    title: 'Sử dụng AI Deepfake giả mạo khuôn mặt và giọng nói người thân vay tiền cấp cứu',
    category: 'Deepfake & Giả mạo người thân',
    severity: 'HIGH',
    summary: 'Kẻ gian chiếm đoạt tài khoản Facebook/Zalo của người thân hoặc bạn bè, sau đó gọi video call chỉ vài giây bằng hình ảnh và giọng nói AI mờ mờ giật giật rồi báo mạng yếu, nhắn tin mượn tiền chuyển khoản viện phí khẩn cấp.',
    description: 'Thủ đoạn tinh vi kết hợp giữa việc hack hoặc chiếm quyền điều khiển tài khoản mạng xã hội và sử dụng công nghệ trí tuệ nhân tạo (Deepfake). Kẻ gian thu thập các video ngắn, hình ảnh, giọng nói mà chủ tài khoản từng đăng tải công khai trên mạng xã hội. Khi nạn nhân cảnh giác yêu cầu gọi video để kiểm tra, đối tượng đồng ý gọi video call qua Messenger hoặc Zalo. Trên màn hình xuất hiện đúng khuôn mặt và phát ra giọng nói của người thân nhưng hình ảnh chập chờn, mờ ảo, khẩu hình miệng không thật khớp, sau 3-5 giây thì ngắt kết nối với lý do "đang ở bệnh viện sóng yếu" hoặc "đang ngoài đường 4G kém". Sau đó, kẻ gian tiếp tục nhắn tin giục giã chuyển tiền gấp vào một số tài khoản mang tên lạ (viện cớ mượn tài khoản của bác sĩ hoặc bạn bè nhận giùm).',
    signs: [
      'Người thân, bạn bè lâu ngày không nói chuyện bỗng dưng nhắn tin hỏi thăm rồi mượn tiền gấp.',
      'Lý do vay mượn thường rất cấp bách: người thân bị tai nạn đang nằm viện cấp cứu, bị giữ tại đồn công an, thanh toán tiền hàng nhập cảnh...',
      'Khi gọi video, thời gian cuộc gọi rất ngắn (dưới 10 giây), hình ảnh giật cục, ánh mắt đờ đẫn, cử động môi không tự nhiên.',
      'Âm thanh cuộc gọi nghẹt, ngắt quãng, có tạp âm giả tạo tiếng còi xe hoặc còi cứu thương.',
      'Số tài khoản nhận tiền KHÔNG PHẢI TÊN NGƯỜI THÂN, mà là tên người lạ với lời giải thích "tài khoản bác sĩ", "tài khoản chủ nợ".'
    ],
    prevention: [
      'Tuyệt đối không chuyển tiền chỉ dựa trên tin nhắn mạng xã hội hay một cuộc gọi video ngắn ngủi mờ ảo.',
      'LẬP TỨC GỌI ĐIỆN THOẠI TRUYỀN THỐNG (qua số điện thoại di động thông thường có lưu trong danh bạ) để kiểm chứng trực tiếp với người đó.',
      'Đặt câu hỏi thử thách kiểm tra danh tính: Hỏi về một kỷ niệm riêng tư chỉ hai người biết (ví dụ: tuần trước hai đứa mình ăn gì, tên con thú cưng nhà bạn là gì...). Kẻ lừa đảo và AI sẽ không thể trả lời được.',
      'Quy ước với người trong gia đình một "từ khóa bí mật an toàn" (Safe Word) để xác thực trong các tình huống yêu cầu chuyển tiền khẩn cấp.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Chiếm đoạt tài khoản & Thu thập dữ liệu AI',
        action: 'Hack Facebook/Zalo của du học sinh, người lao động xa quê hoặc người quen. Tải về các video cũ để nạp vào phần mềm tạo video Deepfake.',
        dangerNote: 'Khai thác mối quan hệ tình cảm tin tưởng giữa người thân trong gia đình.'
      },
      {
        step: 2,
        phase: 'Tạo tình huống hiểm nghèo',
        action: 'Nhắn tin cho bố mẹ hoặc bạn bè: "Con bị tai nạn xe đang cần 50 triệu nộp viện phí mổ gấp, con gửi số tài khoản bác sĩ trưởng khoa đây".',
        dangerNote: 'Cha mẹ nghe tin con gặp nạn sẽ hoảng loạn tột độ, mất hoàn toàn lý trí.'
      },
      {
        step: 3,
        phase: 'Cuộc gọi video Deepfake đánh lừa',
        action: 'Thực hiện cuộc gọi video 5 giây chớp nhoáng phát video AI mặt người thân vẫy tay nói lí nhí "Mẹ chuyển tiền giúp con nhé" rồi cúp máy viện cớ bệnh viện cấm gọi.',
        dangerNote: 'Xóa tan hoàn toàn sự nghi ngờ cuối cùng của nạn nhân.'
      },
      {
        step: 4,
        phase: 'Chiếm đoạt tiền',
        action: 'Nạn nhân vội vã chuyển tiền vào số tài khoản kẻ gian cung cấp. Sau khi nhận được tiền, đối tượng chặn liên lạc hoặc bịa thêm tình tiết để vòi thêm.',
        dangerNote: 'Khi liên lạc được bằng điện thoại bàn thì tiền đã bị rút sạch.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Bà Nga (62 tuổi, Hải Phòng) có con trai đang du học tại Nhật Bản. Facebook của con trai nhắn tin cần 120 triệu đồng nộp học phí gia hạn visa trong chiều nay. Khi bà Nga gọi video, thấy mặt con trai xuất hiện nhưng tín hiệu giật và tắt sau 7 giây, kèm tin nhắn: "Mạng ký túc xá yếu lắm mẹ ơi, mẹ chuyển vào số tài khoản này hộ con nhé". Bà Nga chuyển 120 triệu và sau đó mới biết nick con trai bị chiếm quyền từ hôm qua.',
    commonChannels: ['Facebook Messenger', 'Zalo Video Call', 'Telegram'],
    targetAudience: 'Cha mẹ có con cái đi học xa, người cao tuổi có người thân ở nước ngoài.',
    victimActionPlan: [
      'Gọi điện thoại trực tiếp vào số di động của người thân để thông báo tài khoản mạng xã hội của họ đã bị kẻ gian chiếm quyền.',
      'Liên hệ ngay với ngân hàng thụ lý giao dịch chuyển tiền để yêu cầu hỗ trợ thu hồi hoặc tra soát khẩn cấp.',
      'Chụp lại ảnh màn hình cuộc gọi video, tin nhắn lừa đảo và trình báo cơ quan công an.'
    ],
    viewsCount: 19800,
    updatedDate: '2026-10-10'
  },
  {
    id: 'bay-tinh-cam-dau-tu-forex',
    title: 'Bẫy tình cảm lừa đầu tư sàn Forex / Tiền ảo / Vàng quốc tế (Pig Butchering)',
    category: 'Bẫy tình cảm & Đầu tư tài chính',
    severity: 'HIGH',
    summary: 'Kẻ gian đóng vai trai xinh gái đẹp thành đạt, nhắn tin làm quen tạo dựng mối quan hệ tình cảm yêu đương qua mạng nhiều tháng trời, sau đó rủ rê đầu tư vào ứng dụng tài chính "nội bộ" cam kết lãi suất khủng rồi khóa tài khoản.',
    description: 'Thủ đoạn được gọi là "Nuôi heo rồi mổ thịt" (Pig Butchering Scam). Đối tượng chủ động làm quen qua ứng dụng hẹn hò (Tinder, Bumble) hoặc nhắn nhầm số qua Zalo/Facebook. Chúng xây dựng vỏ bọc một doanh nhân thành đạt, chuyên gia tài chính giàu có, cuộc sống sang chảnh, quan tâm ân cần tới nạn nhân hàng ngày để chiếm trọn niềm tin. Sau khi mối quan hệ tình cảm chín muồi, đối tượng bắt đầu "vô tình" khoe việc kiếm tiền dễ dàng nhờ biết trước thuật toán hoặc có thông tin nội bộ trên sàn giao dịch tiền điện tử / quyền chọn nhị phân. Đối tượng hướng dẫn nạn nhân tạo tài khoản trên một sàn giao dịch do chính nhóm lừa đảo lập trình. Ban đầu nạp ít được rút lời nhanh. Khi nạn nhân dồn hết tiền tiết kiệm, bán nhà hoặc vay mượn hàng tỷ đồng để nạp vào, sàn sẽ khóa chức năng rút tiền với lý do: tài khoản bị nghi ngờ rửa tiền, phải nộp thuế 20%, nộp phí thanh khoản... và cuối cùng đánh sập website.',
    signs: [
      'Người lạ kết bạn có avatar đẹp đẽ, sang chảnh, giới thiệu là Việt kiều, giám đốc, chuyên gia đầu tư độc thân.',
      'Nhắn tin quan tâm tỉ mỉ ngày đêm, hứa hẹn tương lai gắn bó, kết hôn dù chưa bao giờ gặp mặt trực tiếp ngoài đời.',
      'Rủ rê tham gia sàn giao dịch tài chính lạ lẫm với lời hứa "đảm bảo 100% có lãi", "lãi suất 30% - 50%/tháng".',
      'Đường link trang web giao dịch không thể tìm thấy trên các bảng xếp hạng tài chính uy tín quốc tế.',
      'Khi muốn rút tiền về tài khoản ngân hàng, hệ thống báo lỗi và yêu cầu nộp thêm nhiều khoản phí: Phí xác minh, Thuế TNCN, Phí chống rửa tiền.'
    ],
    prevention: [
      'Tuyệt đối cảnh giác với những lời mời chào đầu tư tài chính từ những người chỉ quen biết qua mạng xã hội chưa gặp mặt.',
      'Không có hình thức đầu tư nào hợp pháp tại Việt Nam cam kết sinh lời 20-50%/tháng mà không có rủi ro.',
      'Pháp luật Việt Nam hiện chưa công nhận và bảo hộ các sàn giao dịch tiền điện tử, sàn forex tự phát.',
      'Tìm kiếm hình ảnh đại diện của đối tượng trên Google Image Search để kiểm tra xem có phải ảnh ăn cắp từ hot girl, người mẫu hay không.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Tiếp cận & Thả thính',
        action: 'Kẻ gian đóng vai người thành đạt, lịch lãm, nhắn tin làm quen qua mạng. Dành 1-3 tháng trò chuyện tâm sự, tạo cảm giác là tri kỷ định mệnh.',
        dangerNote: 'Khai thác sự cô đơn, thiếu thốn tình cảm của nạn nhân.'
      },
      {
        step: 2,
        phase: 'Dẫn dắt vào mê cung đầu tư',
        action: 'Đối tượng chia sẻ hình ảnh lợi nhuận giao dịch khủng mỗi tối, rủ nạn nhân chơi thử vài triệu đồng dưới sự chỉ dẫn của mình.',
        dangerNote: 'Hệ thống sàn giả mạo can thiệp hiển thị số dư tăng vọt.'
      },
      {
        step: 3,
        phase: 'Kích thích lòng tham cực độ',
        action: 'Nạn nhân rút thử được 1-2 triệu đồng thật. Kẻ gian thúc giục nạp số tiền lớn để "chớp cơ hội sóng tăng trưởng duy nhất trong năm".',
        dangerNote: 'Nạn nhân dồn toàn bộ tiền dưỡng già, thế chấp sổ đỏ để nạp tiền.'
      },
      {
        step: 4,
        phase: 'Tống tiền phí rút & Biến mất',
        action: 'Khi nạn nhân ấn Rút tiền 2 tỷ, sàn báo lỗi: "Phải nộp 400 triệu tiền thuế TNCN mới được giải ngân". Nộp xong lại đòi thêm phí chống rửa tiền, rồi cắt liên lạc hoàn toàn.',
        dangerNote: 'Mất mát hàng tỷ đồng kèm sang chấn tâm lý nặng nề.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Chị Phương (42 tuổi, Hà Nội) quen một người tự xưng là kỹ sư dầu khí tại Singapore qua mạng. Sau 2 tháng tâm sự như người yêu, người này rủ chị đầu tư sàn giao dịch vàng "GoldFuture-VIP". Chị Phương nạp tổng cộng 1,8 tỷ đồng. Khi thấy tài khoản hiển thị lãi lên 3,2 tỷ, chị làm lệnh rút thì bị sàn yêu cầu nộp thêm 350 triệu tiền phí bảo lãnh. Chị hỏi người yêu thì bị chặn toàn bộ Zalo, Facebook.',
    commonChannels: ['Ứng dụng hẹn hò Tinder/Bumble', 'Facebook', 'Zalo'],
    targetAudience: 'Phụ nữ độc thân, người ly hôn, người trung niên có điều kiện kinh tế nhưng thiếu thốn tình cảm.',
    victimActionPlan: [
      'Ngừng ngay việc chuyển thêm bất kỳ khoản phí thuế hay tiền bảo lãnh nào cho sàn giả mạo.',
      'Lưu trữ toàn bộ tin nhắn, tài khoản ngân hàng thụ hưởng, địa chỉ ví tiền ảo (USDT), link website của sàn.',
      'Liên hệ cơ quan Cảnh sát điều tra tội phạm công nghệ cao để nộp đơn tố giác.'
    ],
    viewsCount: 16700,
    updatedDate: '2026-10-08'
  },
  {
    id: 'lua-dao-thu-hoi-von-treo',
    title: 'Bẫy lừa kép: Dịch vụ "Thu hồi tiền bị lừa đảo", "Hỗ trợ lấy lại tiền treo"',
    category: 'Lừa đảo kép (Thu hồi vốn)',
    severity: 'CRITICAL',
    summary: 'Chiêu trò vô nhân đạo nhắm thẳng vào những nạn nhân vừa bị lừa tiền qua mạng, mạo danh Văn phòng Luật sư uy tín hoặc Cục An ninh mạng cam kết "lấy lại 100% tiền bị lừa", sau đó thu phí hồ sơ, phí bảo hiểm rồi lừa tiếp lần 2.',
    description: 'Sau khi bị lừa tiền trên mạng xã hội, nạn nhân có tâm lý hoang mang, tiếc của và tìm kiếm cách lấy lại tiền. Kẻ gian lập các Fanpage Facebook chạy quảng cáo với tên gọi: "Cục An ninh mạng quốc gia hỗ trợ thu hồi vốn", "Văn phòng Luật sư Nhân văn - Giúp nạn nhân lấy lại tiền treo trên sàn lừa đảo", "Đội IT áo trắng truy tìm dòng tiền". Chúng sử dụng trái phép logo của Bộ Công an, hình ảnh của các luật sư nổi tiếng. Kẻ gian hứa hẹn có thể xâm nhập hệ thống ngân hàng hoặc máy chủ của kẻ lừa đảo để "đóng băng dòng tiền và hoàn trả lại 100% cho nạn nhân". Tuy nhiên, để nhận lại tiền, nạn nhân phải nộp các khoản "phí lập hồ sơ tố tụng", "tiền bảo hiểm liên ngân hàng", "tiền phí bôi trơn hệ thống". Thực chất đây chính là cùng một đường dây lừa đảo hoặc nhóm tội phạm khác đánh vào sự tuyệt vọng của nạn nhân để chiếm đoạt nốt số tiền còn lại.',
    signs: [
      'Trang Fanpage có dấu hiệu mới tạo, chạy quảng cáo cam kết "Lấy lại tiền lừa đảo 100%", "Thu hồi vốn thành công trong 24 giờ".',
      'Mạo danh cán bộ An ninh mạng, Luật sư khẳng định có "công cụ can thiệp dòng tiền ngân hàng".',
      'Yêu cầu nạn nhân cung cấp thông tin tài khoản, số tiền đã mất, biên lai chuyển khoản cũ.',
      'Yêu cầu nạn nhân phải nộp "phí thụ lý", "phí kích hoạt tài khoản giải ngân", "tiền cọc bảo hiểm 10-20% số tiền cần lấy".',
      'Tạo hình ảnh sao kê giả mạo thể hiện số tiền bị lừa đã được chuyển về kho dữ liệu và chỉ chờ nạn nhân nộp phí để nhận lại.'
    ],
    prevention: [
      'Cơ quan Công an và các cơ quan tư pháp Việt Nam KHÔNG BAO GIỜ thu phí hỗ trợ điều tra thu hồi tài sản từ người dân.',
      'KHÔNG MỘT CÁ NHÂN, LUẬT SƯ HAY ĐỘI NHÓM NÀO CÓ THỂ TỰ Ý CAN THIỆP VÀO HỆ THỐNG NGÂN HÀNG ĐỂ "RÚT LẠI TIỀN" ĐÃ CHUYỂN.',
      'Cảnh giác với mọi trang mạng xã hội cam kết "lấy lại tiền lừa đảo", đây 100% là bẫy lừa đảo kép.',
      'Chỉ cơ quan điều tra công an có thẩm quyền theo quy định của Bộ luật Tố tụng Hình sự mới có quyền phong tỏa và xử lý vật chứng theo bản án của Tòa án.'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Quảng cáo nhắm trúng nạn nhân',
        action: 'Chạy quảng cáo Facebook với từ khóa "Hỗ trợ nạn nhân bị lừa đảo mạng", mạo danh Cục An ninh mạng A05 hoặc văn phòng luật sư.',
        dangerNote: 'Tiếp cận người đang trong cơn hoảng loạn, khủng hoảng tâm lý vì vừa mất tài sản.'
      },
      {
        step: 2,
        phase: 'Khẳng định tìm thấy dòng tiền',
        action: 'Yêu cầu gửi sao kê cũ. Sau vài tiếng, đối tượng gửi văn bản đóng dấu giả: "Đã phong tỏa thành công 500 triệu đồng của bạn tại cổng thanh toán quốc tế".',
        dangerNote: 'Thắp lên tia hy vọng giả tạo cho nạn nhân.'
      },
      {
        step: 3,
        phase: 'Yêu cầu đóng phí giải ngân',
        action: 'Yêu cầu nạn nhân đóng 10% (50 triệu đồng) để làm thủ tục xác minh tài khoản nhận tiền và nộp lệ phí tòa án.',
        dangerNote: 'Nạn nhân nghĩ bỏ ra 50 triệu để lấy lại 500 triệu là hợp lý nên tiếp tục đi vay.'
      },
      {
        step: 4,
        phase: 'Lừa nối tiếp lừa',
        action: 'Sau khi nhận 50 triệu, kẻ gian bịa ra lỗi "sai mã giao dịch, cần nộp thêm 70 triệu để mở cổng", cho đến khi nạn nhân phát hiện thì chặn liên lạc.',
        dangerNote: 'Đẩy nạn nhân vào bước đường cùng kiệt quệ tài chính.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Chị Bùi Thị L. (Hà Tĩnh) vừa bị lừa 200 triệu làm nhiệm vụ online. Quá hoảng hốt, chị lên Facebook tìm kiếm thấy trang "Cục An ninh mạng Quốc gia hỗ trợ thu hồi vốn". Đối tượng cam kết sẽ lấy lại đủ 200 triệu trong 4 tiếng với điều kiện chuyển 25 triệu phí hồ sơ kiểm toán. Chị L. vay mượn chuyển 25 triệu và tiếp tục bị kẻ này lừa thêm 35 triệu nữa trước khi bị chặn Facebook.',
    commonChannels: ['Quảng cáo Fanpage Facebook giả mạo', 'Hội nhóm Facebook', 'Kênh Telegram'],
    targetAudience: 'Những người vừa là nạn nhân bị lừa đảo qua mạng trong vòng 1-3 tháng gần đây.',
    victimActionPlan: [
      'TUYỆT ĐỐI KHÔNG tin tưởng bất kỳ dịch vụ "lấy lại tiền lừa đảo" nào trên mạng xã hội.',
      'Báo cáo và chặn ngay lập tức Fanpage hoặc tài khoản mạo danh nói trên.',
      'Đến cơ quan Cảnh sát điều tra Công an quận/huyện trực tiếp nộp đơn tố cáo theo đúng trình tự pháp luật.'
    ],
    viewsCount: 14200,
    updatedDate: '2026-10-14'
  },
  {
    id: 'mao-danh-dien-luc-khoa-sim',
    title: 'Mạo danh Điện lực thông báo cắt điện hoặc Viễn thông dọa khóa SIM sau 2 giờ',
    category: 'Mạo danh cơ quan chức năng',
    severity: 'MEDIUM',
    summary: 'Gọi điện thông báo bạn còn nợ tiền điện hoặc SIM chưa chuẩn hóa thông tin sẽ bị cắt sau 2 giờ, sau đó hướng dẫn bấm phím số hoặc kết bạn Zalo để lừa đảo chiếm đoạt thông tin.',
    description: 'Đối tượng sử dụng hệ thống gọi tự động (robocall) gọi đến số điện thoại người dân với nội dung: "Tổng công ty Điện lực thông báo: Mã khách hàng của bạn đang nợ tiền điện kỳ gần nhất 2.580.000đ. Hệ thống sẽ tiến hành cắt điện sau 2 giờ nữa. Bấm phím 1 để gặp nhân viên hỗ trợ". Tương tự, một kịch bản khác tự xưng "Cục Viễn thông thông báo thuê bao của quý khách sẽ bị khóa 2 chiều sau 2 giờ do chưa chuẩn hóa thông tin thuê bao chính chủ". Khi nạn nhân bấm phím kết nối, kẻ gian yêu cầu đọc họ tên, số CCCD, tài khoản ngân hàng, hoặc hướng dẫn nộp tiền điện vào tài khoản cá nhân của kẻ lừa đảo, hoặc dụ cài phần mềm độc hại.',
    signs: [
      'Cuộc gọi tự động phát đoạn ghi âm dọa cắt điện hoặc khóa SIM trong vòng 2 giờ.',
      'Yêu cầu bấm phím 1, phím 9 để gặp "tổng đài viên".',
      'Yêu cầu chuyển tiền thanh toán nợ vào số tài khoản cá nhân thay vì nộp qua ví điện tử hoặc cổng thanh toán của EVN/nhà mạng.',
      'Hỏi dò thông tin mã OTP, mật khẩu tài khoản ngân hàng để "xác minh không nợ cước".'
    ],
    prevention: [
      'Ngành Điện lực (EVN) và các nhà mạng viễn thông (Viettel, VNPT, MobiFone) KHÔNG BAO GIỜ gọi điện tự động đe dọa cắt điện hoặc khóa sim sau 2 tiếng.',
      'Mọi thông báo tiền điện đều được gửi qua ứng dụng CSKH EVN, email, tin nhắn SMS/Zalo chính thức của điện lực khu vực.',
      'Không làm theo hướng dẫn bấm phím từ các cuộc gọi ghi âm tự động không rõ nguồn gốc.',
      'Gọi trực tiếp tới tổng đài CSKH EVN theo khu vực (Miền Bắc: 19006769, Miền Trung: 19001909, Miền Nam: 19001006, TP.HCM: 1900545454).'
    ],
    scamWorkflow: [
      {
        step: 1,
        phase: 'Cuộc gọi tự động dọa cắt dịch vụ',
        action: 'Máy tính tự động quay số phát thông điệp ghi âm dọa cắt điện / khóa SIM khẩn cấp trong 2 tiếng.',
        dangerNote: 'Đánh vào tâm lý sợ bị gián đoạn sinh hoạt hoặc công việc làm ăn.'
      },
      {
        step: 2,
        phase: 'Nối máy gặp nhân viên giả mạo',
        action: 'Nạn nhân lo sợ bấm phím, gặp kẻ lừa đảo xưng là cán bộ thanh tra điện lực hoặc nhân viên viễn thông.',
        dangerNote: 'Dùng giọng điệu nghiêm khắc, tạo áp lực thời gian.'
      },
      {
        step: 3,
        phase: 'Yêu cầu thanh toán nợ vào tài khoản cá nhân',
        action: 'Báo nạn nhân nợ tiền điện tại một địa chỉ lạ, yêu cầu nộp ngay để tạm hoãn lệnh cắt điện, hoặc dụ cung cấp OTP để "hỗ trợ chuẩn hóa".',
        dangerNote: 'Nhiều người tặc lưỡi chuyển vài triệu để khỏi bị cắt điện.'
      }
    ],
    realWorldSample: 'CẢNH BÁO THỰC TẾ: Chú Hùng (55 tuổi, Nam Định) nhận cuộc gọi tự động báo nợ 3,8 triệu tiền điện và sẽ cắt điện trong 2 tiếng. Chú bấm phím 1, người nghe bảo chú chuyển 3,8 triệu vào tài khoản mang tên "Nguyen Van Thang - Ban Thu Ho EVN" tại ngân hàng Quân Đội. May mắn con trai chú kịp thời can ngăn và kiểm tra app EVNNPC thấy tiền điện tháng này đã thanh toán xong.',
    commonChannels: ['Cuộc gọi tự động Robocall'],
    targetAudience: 'Người dân sinh sống tại các hộ gia đình, chủ cửa hàng kinh doanh, người cao tuổi.',
    victimActionPlan: [
      'Nếu lỡ cung cấp mã OTP ngân hàng, lập tức đăng nhập app ngân hàng chuyển toàn bộ số dư sang tài khoản khác hoặc gọi tổng đài ngân hàng khóa tài khoản.',
      'Báo cáo số điện thoại quấy rối đến đầu số 156.',
      'Kiểm tra lại hóa đơn tiền điện trên ứng dụng EVN chính thức.'
    ],
    viewsCount: 11500,
    updatedDate: '2026-10-05'
  }
];

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'ncsc-vietnam',
    name: 'Cổng Không Gian Mạng Quốc Gia',
    organization: 'Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC) - Cục An toàn thông tin, Bộ Thông tin và Truyền thông',
    description: 'Kênh thông tin chính thức phổ biến cảnh báo an toàn thông tin, nhận diện 24 hình thức lừa đảo trực tuyến phổ biến và tiếp nhận phản ánh dấu hiệu lừa đảo từ người dân.',
    url: 'https://khonggianmang.vn',
    badge: 'Cơ quan Nhà nước'
  },
  {
    id: 'a05-bca',
    name: 'Cổng Thông Tin Cục An Ninh Mạng và PCTP Công Nghệ Cao (A05)',
    organization: 'Bộ Công An Việt Nam',
    description: 'Đơn vị nghiệp vụ nòng cốt của Bộ Công an trong việc đấu tranh, triệt phá các đường dây tội phạm công nghệ cao, lừa đảo chiếm đoạt tài sản trên không gian mạng.',
    url: 'https://bocongan.gov.vn',
    badge: 'Bộ Công An'
  },
  {
    id: 'canhbao-ncsc',
    name: 'Cổng Cảnh Báo An Toàn Thông Tin Việt Nam',
    organization: 'Cục An toàn thông tin - Bộ TTTT',
    description: 'Hệ thống tiếp nhận báo cáo trang web lừa đảo (phishing), số điện thoại quấy rối và điều tra sự cố an toàn thông tin mạng tại Việt Nam.',
    url: 'https://canhbao.ncsc.gov.vn',
    badge: 'Hệ thống Cảnh báo Quốc gia'
  },
  {
    id: 'chong-lua-dao',
    name: 'Dự Án Cộng Đồng Chống Lừa Đảo (Chongluadao.vn)',
    organization: 'Tổ chức phi lợi nhuận bảo vệ người dùng mạng Việt Nam',
    description: 'Cơ sở dữ liệu cộng đồng blacklist các trang web độc hại, tài khoản ngân hàng lừa đảo và tiện ích mở rộng bảo vệ trình duyệt web phổ biến tại Việt Nam.',
    url: 'https://chongluadao.vn',
    badge: 'Cộng đồng An ninh mạng'
  },
  {
    id: 'camnang-btttt',
    name: 'Cẩm Nang Nhận Diện & Phòng Chống Lừa Đảo Trực Tuyến',
    organization: 'Bộ Thông tin và Truyền thông phát hành',
    description: 'Tài liệu hướng dẫn trực quan dành cho toàn dân với nguyên tắc "3 Không - 3 Báo" nhằm nâng cao kỹ năng tự bảo vệ trên môi trường số.',
    url: 'https://mic.gov.vn',
    badge: 'Tài liệu Chính thống'
  },
  {
    id: 'tong-dai-156',
    name: 'Tổng Đài 156 Tiếp Nhận Phản Ánh Cuộc Gọi, Tin Nhắn Rác & Lừa Đảo',
    organization: 'Bộ Thông tin & Truyền thông phối hợp các nhà mạng viễn thông',
    description: 'Đầu số quốc gia tiếp nhận tin nhắn SMS và cuộc gọi phản ánh miễn phí về các chiêu trò lừa đảo qua điện thoại di động.',
    url: 'tel:156',
    badge: 'Tổng đài Miễn phí'
  }
];

export const PRESET_SUSPICIOUS_MESSAGES = [
  {
    title: 'Lệnh bắt tạm giam từ Công an giả mạo',
    category: 'Mạo danh Công an',
    text: 'CỤC CẢNH SÁT HÌNH SỰ THÔNG BÁO: Lệnh bắt tạm giam số 412/LBTG đối với bà Nguyễn Thị Mai, số CCCD 03019800xxxx do liên quan đường dây rửa tiền ma túy 50 tỷ đồng. Yêu cầu có mặt tại Cơ quan CSĐT trước 17h hôm nay hoặc chuyển 300.000.000đ vào tài khoản tạm giữ của ban chuyên án để phong tỏa kiểm tra tính hợp pháp. Liên hệ Thiếu tá Hùng 0912.xxx.xxx qua Zalo ngay!'
  },
  {
    title: 'Tuyển CTV làm nhiệm vụ TikTok/Shopee hoa hồng 30%',
    category: 'Tuyển dụng lừa đảo',
    text: 'Chào bạn! Chúng mình là bộ phận nhân sự Shopee Mall & TikTok Shop. Hiện tại công ty cần tuyển 5 bạn cộng tác viên online làm tại nhà, công việc chỉ cần dùng điện thoại bấm Like và thả tim video. Mỗi ngày kiếm 500k - 1tr5 thanh toán qua tài khoản ngân hàng sau 10 phút. Không cần cọc, chỉ cần tham gia nhóm Telegram này để nhận đơn thử 100k nhận về 150k ngay: https://t.me/shopeevip_nhiemvu'
  },
  {
    title: 'SMS Brandname Ngân hàng báo tài khoản bị khóa',
    category: 'Giả mạo Ngân hàng',
    text: '[Vietcombank] Thong bao: Tai khoan Internet Banking cua quy khach da bi tam khoa do he thong phat hien dang nhap bat thuong tai IP nuoc ngoai. Vui long truy cap lien ket sau de xac minh danh tinh va mo khoa trong vong 30 phut: https://vietcombank-ebanking-support247.com'
  },
  {
    title: 'Mạo danh Chi cục Thuế dụ cài app APK',
    category: 'Cài app mã độc',
    text: 'Thông báo từ Chi cục Thuế: Hồ sơ hoàn thuế thu nhập cá nhân năm 2025 của quý anh/chị đã được phê duyệt số tiền hoàn là 5.600.000đ. Do hệ thống Cổng Dịch vụ công đang bảo trì, vui lòng tải và cài đặt ứng dụng Thuế Điện Tử phiên bản di động theo đường link sau để nhận tiền hoàn: https://dichvucong-thuedientu.apk-gov.vn'
  },
  {
    title: 'Người thân gọi Deepfake mượn tiền cấp cứu',
    category: 'Deepfake người thân',
    text: 'Mẹ ơi con Hùng đây! Con đang đi đường bị va quẹt xe với người ta gãy chân, người ta bắt con bồi thường và nộp viện phí cấp cứu gấp 35 triệu. Tài khoản con bị kẹt, mẹ chuyển gấp vào tài khoản bác sĩ phụ trách khoa cấp cứu này giúp con nhé: STK 190345678888 - NGUYEN VAN TRUNG - Ngân hàng Techcombank. Con vừa gọi video cho mẹ thấy mặt con rồi đấy, mạng yếu con cúp đây mẹ chuyển ngay cứu con!'
  }
];

export const SCAM_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Khi nhận được cuộc gọi từ người tự xưng là cán bộ Công an yêu cầu chuyển tiền vào "Tài khoản an toàn" để chứng minh vô tội, bạn nên làm gì?',
    options: [
      'Lập tức ra ngân hàng rút tiền chuyển ngay để không bị bắt',
      'Cúp máy ngay lập tức, không chuyển tiền, và ra cơ quan công an địa phương xác minh',
      'Hỏi mật khẩu của họ để kiểm tra',
      'Chuyển trước 50% số tiền để giữ chân họ'
    ],
    correctIndex: 1,
    explanation: 'Cơ quan Công an, Viện Kiểm sát, Tòa án TUYỆT ĐỐI KHÔNG làm việc qua điện thoại và KHÔNG BAO GIỜ yêu cầu chuyển tiền vào tài khoản cá nhân hay tài khoản tạm giữ nào.'
  },
  {
    id: 2,
    question: 'Một tin nhắn SMS có tiêu đề hiển thị đúng tên ngân hàng của bạn kèm đường link "https://vietcombank-help-xacthuc.com" bảo bạn đăng nhập để tránh bị khóa tài khoản. Điều này có an toàn không?',
    options: [
      'An toàn, vì tin nhắn nằm đúng trong luồng SMS ngân hàng gửi biến động số dư',
      'Rất nguy hiểm! Đây là thủ đoạn dùng trạm phát sóng giả BTS để lừa người dùng bấm vào web giả mạo câu OTP',
      'An toàn nếu trang web có biểu tượng ổ khóa màu xanh',
      'Đăng nhập thử tài khoản phụ để kiểm tra'
    ],
    correctIndex: 1,
    explanation: 'Kẻ gian sử dụng thiết bị BTS giả mạo để chèn tin nhắn giả vào luồng thương hiệu ngân hàng. Ngân hàng không bao giờ gửi tin nhắn kèm link bắt đăng nhập.'
  },
  {
    id: 3,
    question: 'Nguyên tắc vàng "3 Không" trong phòng chống lừa đảo trực tuyến tại Việt Nam là gì?',
    options: [
      'Không nghe máy, Không đọc tin nhắn, Không dùng mạng xã hội',
      'Không tải file lạ, Không nạp tiền làm nhiệm vụ, Không đi ra ngoài',
      'Không sợ hãi, Không tham lam, Không chuyển tiền/cung cấp OTP cho người lạ',
      'Không kết bạn, Không bấm like, Không bình luận'
    ],
    correctIndex: 2,
    explanation: 'Nguyên tắc "3 Không": Không hoang mang lo sợ khi bị đe dọa; Không tham lam quà tặng hay hoa hồng bất thường; Không chuyển tiền hoặc cung cấp OTP, mật khẩu cho bất kỳ ai.'
  }
];
