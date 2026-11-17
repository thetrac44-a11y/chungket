require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const AI_MODEL = (process.env.AI_MODEL || 'gemini-2.5-flash').trim();
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_KEY = (process.env.SUPABASE_KEY || '').trim();

const supabase =
  SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1h',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  })
);

// =========================================================
// 1. DỮ LIỆU MẪU CHUẨN CỦA BTC (TỪ Du_lieu_mau_Vibe_Coding_bangA.xlsx)
// =========================================================
function getBtcSampleDataset() {
  return {
    meta: {
      source: 'Du_lieu_mau_Vibe_Coding_bangA.xlsx (Dữ liệu mẫu BTC - Bảng A Kỹ thuật)',
      pointRule: { vndPerPoint: 10000, description: '10.000đ = 1 điểm (làm tròn xuống theo bội số 10.000đ)' },
      tiers: [
        { name: 'Đồng', minPoints: 0, maxPoints: 999, perks: 'Tích điểm tiêu chuẩn 10.000đ = 1 điểm, đổi các voucher cơ bản.' },
        { name: 'Bạc', minPoints: 1000, maxPoints: 4999, perks: 'Ưu tiên đổi Voucher 50.000đ, quà sinh nhật thành viên Bạc.' },
        { name: 'Vàng', minPoints: 5000, maxPoints: null, perks: 'Đặc quyền đổi Quà tặng đặc biệt, ưu tiên phục vụ tại quầy.' }
      ],
      refQrCode: 'KT-004'
    },
    members: [
      { id: 'KT-001', fullName: 'An Nguyễn', phone: '0900001001', initialPoints: 200, points: 250, tier: 'Đồng', status: 'Đang hoạt động', joinedDate: '2026-09-05', qrPayload: 'KT-001', isSample: true },
      { id: 'KT-002', fullName: 'Bình Trần', phone: '0900001002', initialPoints: 1300, points: 1450, tier: 'Bạc', status: 'Đang hoạt động', joinedDate: '2026-08-17', qrPayload: 'KT-002', isSample: true },
      { id: 'KT-003', fullName: 'Chi Lê', phone: '0900001003', initialPoints: 1000, points: 800, tier: 'Đồng', status: 'Đang hoạt động', joinedDate: '2026-07-22', qrPayload: 'KT-003', isSample: true },
      { id: 'KT-004', fullName: 'Dũng Phạm', phone: '0900001004', initialPoints: 3000, points: 3200, tier: 'Bạc', status: 'Đang hoạt động', joinedDate: '2026-06-14', qrPayload: 'KT-004', isSample: true },
      { id: 'KT-005', fullName: 'Hà Võ', phone: '0900001005', initialPoints: 5000, points: 5800, tier: 'Vàng', status: 'Đang hoạt động', joinedDate: '2026-04-09', qrPayload: 'KT-005', isSample: true },
      { id: 'KT-006', fullName: 'Minh Đỗ', phone: '0900001006', initialPoints: 12000, points: 12500, tier: 'Vàng', status: 'Đang hoạt động', joinedDate: '2026-02-28', qrPayload: 'KT-006', isSample: true },
      { id: 'KT-007', fullName: 'Ngọc Bùi', phone: '0900001007', initialPoints: 4000, points: 4700, tier: 'Bạc', status: 'Đang hoạt động', joinedDate: '2026-03-11', qrPayload: 'KT-007', isSample: true },
      { id: 'KT-008', fullName: 'Phúc Hoàng', phone: '0900001008', initialPoints: 0, points: 0, tier: 'Đồng', status: 'Đang hoạt động', joinedDate: '2026-10-10', qrPayload: 'KT-008', isSample: true }
    ],
    rewards: [
      { id: 'KT-VCH-01', name: 'Voucher 20.000đ', description: 'Giảm giá đơn hàng trực tiếp tại quầy', pointsCost: 500, status: 'Đang áp dụng' },
      { id: 'KT-VCH-02', name: 'Voucher 50.000đ', description: 'Giảm giá đơn hàng từ 150.000đ trở lên', pointsCost: 1100, status: 'Đang áp dụng' },
      { id: 'KT-VCH-03', name: 'Quà tặng đặc biệt', description: 'Quà tặng mô phỏng phiên bản giới hạn', pointsCost: 2000, status: 'Đang áp dụng' }
    ],
    transactions: [
      { id: 'KT-LS-001', txCode: 'TX-KT-001', memberId: 'KT-001', type: 'Cộng điểm', amountVnd: 500000, pointsDelta: 50, balanceAfter: 250, createdAt: '2026-10-03 09:15', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-002', txCode: 'TX-KT-002', memberId: 'KT-002', type: 'Cộng điểm', amountVnd: 1500000, pointsDelta: 150, balanceAfter: 1450, createdAt: '2026-10-04 11:40', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-003', txCode: 'TX-KT-003', memberId: 'KT-003', type: 'Đổi điểm', amountVnd: 0, pointsDelta: -200, balanceAfter: 800, createdAt: '2026-10-05 14:05', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-004', txCode: 'TX-KT-004', memberId: 'KT-004', type: 'Cộng điểm', amountVnd: 2000000, pointsDelta: 200, balanceAfter: 3200, createdAt: '2026-10-06 18:20', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-005', txCode: 'TX-KT-005', memberId: 'KT-005', type: 'Cộng điểm', amountVnd: 8000000, pointsDelta: 800, balanceAfter: 5800, createdAt: '2026-10-08 10:30', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-006', txCode: 'TX-KT-006', memberId: 'KT-006', type: 'Cộng điểm', amountVnd: 5000000, pointsDelta: 500, balanceAfter: 12500, createdAt: '2026-10-09 16:10', note: 'Dữ liệu mẫu đã ghi nhận' },
      { id: 'KT-LS-007', txCode: 'TX-KT-007', memberId: 'KT-007', type: 'Cộng điểm', amountVnd: 7000000, pointsDelta: 700, balanceAfter: 4700, createdAt: '2026-10-11 12:55', note: 'Dữ liệu mẫu đã ghi nhận' }
    ],
    vouchersWallet: [
      {
        voucherCode: 'VCH-KT003-2026',
        rewardId: 'KT-VCH-DEMO',
        rewardName: 'Ưu đãi mẫu đầu kỳ (200 điểm)',
        memberId: 'KT-003',
        pointsSpent: 200,
        redeemedAt: '2026-10-05 14:05',
        status: 'Chưa sử dụng',
        txCode: 'TX-KT-003'
      }
    ],
    testCases: [
      { code: 'TC-KT-01', name: 'Cộng điểm mới', memberId: 'KT-008', txOrRewardId: 'TX-NEW-001', amountVnd: 1000000, inputDesc: '10.000đ = 1 điểm', expected: 'Cộng 100 điểm một lần, số dư từ 0 lên 100' },
      { code: 'TC-KT-02', name: 'Nhập lại giao dịch', memberId: 'KT-002', txOrRewardId: 'TX-KT-002', amountVnd: 1500000, inputDesc: 'Mã này đã có trong sổ', expected: 'Báo trùng, không cộng thêm 150 điểm' },
      { code: 'TC-KT-03', name: 'Đổi ưu đãi đủ điểm', memberId: 'KT-005', txOrRewardId: 'KT-VCH-01', amountVnd: 0, inputDesc: 'Đổi 500 điểm', expected: 'Tạo voucher trong ví và số dư từ 5800 còn 5300' },
      { code: 'TC-KT-04', name: 'Đổi ưu đãi thiếu điểm', memberId: 'KT-008', txOrRewardId: 'KT-VCH-01', amountVnd: 0, inputDesc: 'Đổi 500 điểm', expected: 'Từ chối đổi; số dư vẫn là 0' },
      { code: 'TC-KT-05', name: 'Quét QR chuẩn của BTC', memberId: 'KT-004', txOrRewardId: 'KT-004', amountVnd: 0, inputDesc: 'Payload QR: KT-004', expected: 'Đọc đúng KT-004 và mở hồ sơ Dũng Phạm' }
    ]
  };
}

let memoryState = getBtcSampleDataset();

// Đồng bộ trạng thái lên Supabase (nếu có)
async function syncStateToCloud(stateObj) {
  memoryState = stateObj;
  if (!supabase) return;
  try {
    await supabase.from('app_store').upsert({
      key: 'loyalty_state_v1',
      value: stateObj,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Supabase sync warning:', err.message);
  }
}

async function loadStateFromCloud() {
  if (!supabase) return memoryState;
  try {
    const { data, error } = await supabase
      .from('app_store')
      .select('value')
      .eq('key', 'loyalty_state_v1')
      .maybeSingle();
    if (!error && data && data.value && Array.isArray(data.value.members)) {
      memoryState = data.value;
      return memoryState;
    }
  } catch (err) {
    console.warn('Supabase load warning:', err.message);
  }
  return memoryState;
}

// =========================================================
// 2. CÁC ROUTE SEO KỸ THUẬT (robots.txt & sitemap.xml)
// =========================================================
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nAllow: /\nSitemap: https://spyt-chungket.vercel.app/sitemap.xml\n');
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://spyt-chungket.vercel.app/</loc>
    <lastmod>2026-11-17</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// =========================================================
// 3. API DỮ LIỆU & ĐỒNG BỘ CLOUD SQL
// =========================================================
app.get('/api/state', async (req, res) => {
  const state = await loadStateFromCloud();
  res.json({ ok: true, isCloudSql: Boolean(supabase), state });
});

app.post('/api/state/sync', async (req, res) => {
  const incoming = req.body?.state;
  if (!incoming || !Array.isArray(incoming.members)) {
    return res.status(400).json({ ok: false, error: 'Dữ liệu đồng bộ không hợp lệ' });
  }
  await syncStateToCloud(incoming);
  res.json({ ok: true });
});

app.post('/api/state/reset', async (req, res) => {
  const fresh = getBtcSampleDataset();
  await syncStateToCloud(fresh);
  res.json({ ok: true, state: fresh });
});

// =========================================================
// 4. API TRỢ LÝ AI GEMINI TƯ VẤN ĐỔI QUÀ & CHĂM SÓC THÀNH VIÊN
// =========================================================
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { member, rewards, question } = req.body || {};
    const mName = member?.fullName || 'Khách hàng';
    const mPoints = Number(member?.points || 0);
    const mTier = member?.tier || 'Đồng';

    const nextTierInfo =
      mPoints < 1000
        ? `cần tích thêm ${(1000 - mPoints).toLocaleString('vi-VN')} điểm (tương ứng ${(1000 - mPoints) * 10000}đ chi tiêu) để lên hạng Bạc`
        : mPoints < 5000
        ? `cần tích thêm ${(5000 - mPoints).toLocaleString('vi-VN')} điểm (tương ứng ${((5000 - mPoints) * 10000).toLocaleString('vi-VN')}đ chi tiêu) để lên hạng Vàng`
        : 'đã đạt hạng Vàng cao nhất';

    const affordable = (rewards || [])
      .filter((r) => mPoints >= Number(r.pointsCost))
      .map((r) => `${r.name} (${r.pointsCost} điểm)`)
      .join(', ');

    if (GEMINI_API_KEY) {
      const prompt = `Bạn là Trợ lý AI Chăm sóc Thành viên thông minh (mô hình Starbucks Rewards) của Đội SpyT.
Thông tin thành viên hiện tại:
- Mã thành viên: ${member?.id || 'KT-004'} — Họ tên: ${mName}
- Số dư điểm hiện tại: ${mPoints} điểm (Hạng: ${mTier}, ${nextTierInfo}).
- Các ưu đãi đủ điểm đổi ngay: ${affordable || 'Chưa đủ điểm đổi voucher (cần tối thiểu 500 điểm)'}.
- Câu hỏi/Yêu cầu thêm: "${question || 'Tư vấn cách dùng điểm và thăng hạng có lợi nhất cho thành viên này'}"

Hãy trả lời ngắn gọn trong 2-3 câu bằng tiếng Việt tự nhiên, lịch sự, chuyên nghiệp (tuyệt đối KHÔNG dùng icon hay emoji).`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      const aiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3 }
        })
      });
      if (aiRes.ok) {
        const aiData = await aiRes.json();
        const text = aiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text.trim()) {
          return res.json({ ok: true, mode: 'gemini', advice: text.trim() });
        }
      }
    }

    // Fallback thông minh khi offline hoặc vượt quota
    const fallbackAdvice = affordable
      ? `Thành viên ${mName} (${member?.id}) đang có ${mPoints.toLocaleString('vi-VN')} điểm thuộc hạng ${mTier} (${nextTierInfo}). Hiện tại bạn đủ điều kiện đổi ngay: ${affordable} tại mục Đổi Điểm Lấy Ưu Đãi, hoặc giữ lại điểm để cán mốc hạng tiếp theo nhanh hơn.`
      : `Thành viên ${mName} (${member?.id}) hiện có ${mPoints.toLocaleString('vi-VN')} điểm thuộc hạng ${mTier} (${nextTierInfo}). Bạn chỉ cần tích thêm ${Math.max(0, 500 - mPoints)} điểm nữa là có thể đổi ngay Voucher 20.000đ (KT-VCH-01).`;

    return res.json({ ok: true, mode: 'fallback', advice: fallbackAdvice });
  } catch (err) {
    return res.json({
      ok: true,
      mode: 'fallback',
      advice: 'Hệ thống khuyến nghị bạn kiểm tra số dư điểm hiện tại để đổi Voucher 20.000đ (500 điểm), Voucher 50.000đ (1.100 điểm) hoặc Quà tặng đặc biệt (2.000 điểm).'
    });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server SpyT Rewards dang chay tai http://localhost:${PORT}`);
  });
}

module.exports = app;
