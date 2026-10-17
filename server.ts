import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

// Initialize Google GenAI client (Server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

/**
 * Intelligent Vietnamese heuristic fallback analysis
 * Ensures high reliability even if API key is temporarily unavailable or rate limited.
 */
function heuristicFallbackAnalysis(rawText: string) {
  const text = rawText.toLowerCase();
  let score = 15;
  const redFlags: string[] = [];
  const tricks: string[] = [];
  let matchedType = 'Nội dung thông thường hoặc cần xác minh thêm';
  let verdictTitle = 'Mức độ rủi ro thấp - Cần giữ cảnh giác cơ bản';
  let level: 'CRITICAL' | 'HIGH' | 'SUSPICIOUS' | 'SAFE' = 'SAFE';

  // Check Police/Court impersonation
  if (
    text.includes('công an') ||
    text.includes('viện kiểm sát') ||
    text.includes('tòa án') ||
    text.includes('lệnh bắt') ||
    text.includes('tạm giam') ||
    text.includes('rửa tiền') ||
    text.includes('ma túy') ||
    text.includes('tài khoản an toàn') ||
    text.includes('tài khoản tạm giữ')
  ) {
    score += 70;
    matchedType = 'Mạo danh Cơ quan Công an / Viện Kiểm Sát';
    redFlags.push('Nhắc đến cơ quan pháp luật (Công an, VKS, Tòa án) qua điện thoại/tin nhắn.');
    redFlags.push('Đe dọa bắt tạm giam, khởi tố hoặc liên quan đến án ma túy, rửa tiền.');
    redFlags.push('Yêu cầu giữ bí mật hoặc chuyển tiền vào tài khoản tạm giữ để chứng minh vô tội.');
    tricks.push('Thao túng tâm lý bằng nỗi sợ hãi vòng lao lý và sự hoảng loạn.');
    tricks.push('Cắt đứt liên lạc với người thân để nạn nhân không có cơ hội tỉnh táo suy xét.');
  }

  // Check Job / CTV / Task scam
  if (
    text.includes('cộng tác viên') ||
    text.includes('ctv') ||
    text.includes('shopee') ||
    text.includes('tiktok') ||
    text.includes('nhiệm vụ') ||
    text.includes('hoa hồng') ||
    text.includes('việc nhẹ lương cao') ||
    text.includes('500k') ||
    text.includes('1tr5') ||
    text.includes('telegram')
  ) {
    score += 65;
    matchedType = 'Lừa đảo Tuyển dụng Cộng tác viên / Nhiệm vụ online';
    redFlags.push('Mồi chài công việc online đơn giản với mức hoa hồng cao bất thường (10% - 30%).');
    redFlags.push('Dẫn dụ vào nhóm chat Telegram hoặc nền tảng không rõ ràng.');
    redFlags.push('Yêu cầu tự nạp tiền để "ôm đơn" hoặc tạo số dư thực hiện nhiệm vụ.');
    tricks.push('Đánh vào lòng tham và nhu cầu kiếm tiền nhanh chóng tại nhà.');
    tricks.push('Tạo hiệu ứng tâm lý bầy đàn bằng các tài khoản ảo liên tục khoe nhận tiền.');
  }

  // Check Bank SMS Brandname & Phishing
  if (
    text.includes('vietcombank') ||
    text.includes('techcombank') ||
    text.includes('bidv') ||
    text.includes('mbbank') ||
    text.includes('tài khoản bị khóa') ||
    text.includes('đăng nhập bất thường') ||
    text.includes('xác minh danh tính') ||
    text.includes('otp') ||
    text.includes('smart otp') ||
    text.includes('http') ||
    text.includes('.com')
  ) {
    score += 55;
    if (matchedType === 'Nội dung thông thường hoặc cần xác minh thêm') {
      matchedType = 'Giả mạo Ngân hàng chiếm đoạt mã OTP / Tài khoản';
    }
    redFlags.push('Chứa đường link trang web lạ yêu cầu đăng nhập tài khoản ngân hàng.');
    redFlags.push('Cảnh báo khẩn cấp tài khoản bị khóa hoặc bị trừ tiền để thôi thúc bấm link.');
    redFlags.push('Yêu cầu cung cấp mã OTP hoặc thông tin bảo mật e-Banking.');
    tricks.push('Khai thác tâm lý sợ mất tiền hoặc bị gián đoạn tài khoản giao dịch.');
  }

  // Check Malicious App (.apk, VNeID, Thuế)
  if (
    text.includes('.apk') ||
    text.includes('vneid') ||
    text.includes('dịch vụ công') ||
    text.includes('hoàn thuế') ||
    text.includes('thuế điện tử') ||
    text.includes('cài đặt ứng dụng')
  ) {
    score += 65;
    matchedType = 'Dụ cài ứng dụng chứa mã độc gián điệp (.apk)';
    redFlags.push('Gửi đường link tải file cài đặt trực tiếp có đuôi .apk thay vì tải trên Google Play / App Store.');
    redFlags.push('Mạo danh cơ quan nhà nước (Cán bộ Thuế, Công an phường) ép làm thủ tục trực tuyến.');
    tricks.push('Tạo vỏ bọc thủ tục hành chính số của nhà nước để đánh lừa sự tin cậy.');
  }

  // Check Deepfake / Emergency borrow
  if (
    text.includes('tai nạn') ||
    text.includes('viện phí') ||
    text.includes('cấp cứu') ||
    text.includes('mượn tiền') ||
    text.includes('gọi video') ||
    text.includes('mạng yếu')
  ) {
    score += 50;
    matchedType = 'Nghi vấn Giả mạo người thân / Deepfake mượn tiền gấp';
    redFlags.push('Tình huống mượn tiền cực kỳ khẩn cấp (tai nạn, cấp cứu, nợ nóng).');
    redFlags.push('Số tài khoản nhận tiền không mang tên chính chủ của người thân.');
    tricks.push('Đánh vào tình phụ tử, mẫu tử và lòng trắc ẩn của người nhà.');
  }

  score = Math.min(score, 98);
  if (score >= 80) {
    level = 'CRITICAL';
    verdictTitle = 'NGUY HIỂM CỰC CAO - DẤU HIỆU LỪA ĐẢO RÕ RÀNG (KHẨN CẤP)';
  } else if (score >= 60) {
    level = 'HIGH';
    verdictTitle = 'RỦI RO CAO - NHIỀU ĐIỂM BẤT THƯỜNG ĐẶC TRƯNG CỦA LỪA ĐẢO';
  } else if (score >= 35) {
    level = 'SUSPICIOUS';
    verdictTitle = 'CẢNH BÁO ĐÁNG NGỜ - CẦN KIỂM CHỨNG KỸ TRƯỚC KHI THAO TÁC';
  }

  return {
    riskLevel: level,
    riskScore: score,
    verdictTitle,
    summary: `Nội dung trên có mức độ rủi ro ${score}%. Phát hiện nhiều dấu hiệu trùng khớp với thủ đoạn "${matchedType}". Tuyệt đối không bấm link, không chuyển tiền hay cung cấp bất kỳ mã OTP/thông tin cá nhân nào.`,
    matchedScamType: matchedType,
    redFlags: redFlags.length > 0 ? redFlags : ['Nội dung tin nhắn chưa có đủ bằng chứng khẳng định lừa đảo nhưng vẫn cần thận trọng khi có yêu cầu tiền bạc.'],
    psychologicalTricks: tricks.length > 0 ? tricks : ['Tạo cảm giác tò mò, thúc bách hoặc hấp dẫn về quyền lợi.'],
    recommendedActions: [
      'TUYỆT ĐỐI KHÔNG làm theo hướng dẫn trong tin nhắn (không bấm link, không tải file, không chuyển tiền).',
      'KHÔNG cung cấp mã OTP, số CCCD, mật khẩu ngân hàng cho bất kỳ ai dưới mọi hình thức.',
      'Gọi điện thoại trực tiếp vào số hotline chính thức của tổ chức liên quan để kiểm tra thông tin.',
      'Báo cáo tin nhắn/cuộc gọi lừa đảo đến tổng đài 156 của Bộ Thông tin & Truyền thông (miễn phí).'
    ],
    safeChecklist: [
      'Đã xác minh qua số điện thoại chính thức được công bố trên website cơ quan?',
      'Đã liên hệ với người thân bằng cuộc gọi thông thường để đối chứng?',
      'Chưa từng bấm vào đường link lạ hay cài bất kỳ ứng dụng nào ngoài App Store / Google Play?'
    ],
    analyzedAt: new Date().toISOString()
  };
}

// API endpoint for Gemini-powered scam inspection
app.post('/api/analyze-scam', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung tin nhắn hoặc văn bản cần kiểm chứng.' });
    }

    const trimmedText = text.trim().slice(0, 4000);

    // If Gemini client is available, use official @google/genai SDK
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Hãy đóng vai một chuyên gia hàng đầu về An ninh mạng và Điều tra tội phạm công nghệ cao tại Việt Nam (thuộc Cục An toàn thông tin và A05).
Hãy phân tích cặn kẽ đoạn tin nhắn / văn bản sau đây mà một người dân Việt Nam vừa nhận được để đánh giá xem có phải chiêu trò lừa đảo trực tuyến hay không:

--- NỘI DUNG NGHI VẤN ---
${trimmedText}
-------------------------

Yêu cầu phân tích:
1. Đánh giá mức độ rủi ro: CRITICAL (Cực kỳ nguy hiểm, chắc chắn lừa đảo), HIGH (Rủi ro cao), SUSPICIOUS (Đáng ngờ, có bẫy), hoặc SAFE (Nội dung thông thường).
2. Điểm rủi ro từ 0 đến 100.
3. Tiêu đề kết luận rõ ràng, đanh thép bằng tiếng Việt.
4. Tóm tắt nhận định trong 2-3 câu ngắn gọn, dễ hiểu cho cả người lớn tuổi.
5. Xác định tên kịch bản lừa đảo phổ biến tại Việt Nam (ví dụ: Mạo danh Công an dọa bắt giam, Tuyển CTV nhiệm vụ Shopee/Telegram, Giả mạo SMS Brandname ngân hàng, Dụ cài app Dịch vụ công/VNeID giả mạo chứa mã độc .apk, Deepfake người thân cấp cứu mượn tiền, Bẫy tình cảm đầu tư Forex, Lừa đảo thu hồi vốn treo...).
6. Danh sách 2-5 dấu hiệu đáng ngờ (Red Flags) cụ thể trích xuất trực tiếp từ câu chữ trong tin nhắn.
7. Chiêu trò thao túng tâm lý (Psychological tricks) mà kẻ gian áp dụng (như: Đe dọa hoảng loạn, Tạo áp lực thời gian gấp gáp, Thả mồi hoa hồng, Lòng trắc ẩn người thân...).
8. Danh sách 3-5 hành động an toàn người dân NÊN LÀM NGAY LẬP TỨC để bảo vệ bản thân và tài sản.
9. Danh sách checklist 2-4 câu hỏi tự kiểm tra an toàn.

Trả về kết quả bằng định dạng JSON chuẩn theo Schema.`,
          config: {
            systemInstruction: 'Bạn là chuyên gia an ninh mạng bảo vệ người dân Việt Nam trước các thủ đoạn lừa đảo công nghệ cao. Bạn luôn phân tích sắc bén, cảnh báo rõ ràng, ngôn ngữ chuẩn tiếng Việt, dễ hiểu, tận tâm và thực tế.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                riskLevel: {
                  type: Type.STRING,
                  description: 'CRITICAL, HIGH, SUSPICIOUS, hoặc SAFE',
                },
                riskScore: {
                  type: Type.INTEGER,
                  description: 'Điểm số rủi ro từ 0 đến 100',
                },
                verdictTitle: {
                  type: Type.STRING,
                  description: 'Tiêu đề kết luận ngắn gọn, gây chú ý',
                },
                summary: {
                  type: Type.STRING,
                  description: 'Tóm tắt nhận định dễ hiểu',
                },
                matchedScamType: {
                  type: Type.STRING,
                  description: 'Tên kịch bản lừa đảo trùng khớp',
                },
                redFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Danh sách các dấu hiệu đáng ngờ',
                },
                psychologicalTricks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Các đòn tâm lý kẻ gian sử dụng',
                },
                recommendedActions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Các bước xử lý an toàn khẩn cấp',
                },
                safeChecklist: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Checklist tự kiểm tra an toàn',
                },
              },
              required: [
                'riskLevel',
                'riskScore',
                'verdictTitle',
                'summary',
                'redFlags',
                'recommendedActions',
              ],
            },
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({
          ...parsed,
          analyzedAt: new Date().toISOString(),
          poweredBy: 'Gemini 3.8 Flash Engine (Server-side)',
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to heuristic analysis:', geminiError?.message || geminiError);
        const fallback = heuristicFallbackAnalysis(trimmedText);
        return res.json({
          ...fallback,
          poweredBy: 'Hệ thống Phân tích Quy tắc An ninh mạng (Dự phòng)',
        });
      }
    } else {
      // Fallback if no GEMINI_API_KEY injected
      const fallback = heuristicFallbackAnalysis(trimmedText);
      return res.json({
        ...fallback,
        poweredBy: 'Hệ thống Phân tích Quy tắc An ninh mạng NCSC',
      });
    }
  } catch (err: any) {
    console.error('Scam analysis endpoint error:', err);
    return res.status(500).json({ error: 'Có lỗi xảy ra trong quá trình phân tích nội dung. Vui lòng thử lại.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'LuadaoPedia',
    geminiConfigured: !!apiKey,
    timestamp: new Date().toISOString(),
  });
});

async function main() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LuadaoPedia Full-stack Server running at http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
});
