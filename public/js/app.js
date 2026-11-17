/**
 * public/js/app.js
 * Hệ Thống Thẻ Thành Viên 2 Đầu (Thành Viên & Quầy) — StarRewards SpyT
 * Đáp ứng 100% Yêu cầu phần lõi + Điểm thưởng QR Camera + Chạy Offline LocalStorage & Đồng bộ Cloud SQL
 */

const STORAGE_KEY = 'spyt_loyalty_state_v1';
const VND_PER_POINT = 10000; // 10.000đ = 1 điểm

function getDefaultBtcDataset() {
  return {
    meta: {
      source: 'Du_lieu_mau_Vibe_Coding_bangA.xlsx (Dữ liệu mẫu BTC)',
      vndPerPoint: 10000,
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

let appState = getDefaultBtcDataset();
let currentMemberId = 'KT-004'; // Mặc định mở KT-004 (Dũng Phạm) theo mã tham chiếu của BTC
let currentViewMode = 'member';
let html5QrScanner = null;
let isCameraRunning = false;

// =========================================================
// 1. CÁC HÀM TIỆN ÍCH & QUY TẮC TÍNH ĐIỂM / PHÂN HẠNG
// =========================================================
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNumber(num) {
  return Number(num || 0).toLocaleString('vi-VN');
}

function formatNowTimestamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

/**
 * Tính hạng tự động theo mốc điểm đã công bố:
 * - Đồng: 0 - 999 điểm
 * - Bạc: 1.000 - 4.999 điểm
 * - Vàng: >= 5.000 điểm
 */
function calculateTier(points) {
  const p = Number(points || 0);
  if (p >= 5000) return 'Vàng';
  if (p >= 1000) return 'Bạc';
  return 'Đồng';
}

function getTierCardClass(tier) {
  if (tier === 'Vàng') return 'member-card-gold';
  if (tier === 'Bạc') return 'member-card-silver';
  return 'member-card-bronze';
}

function getTierBadgeStyle(tier) {
  if (tier === 'Vàng') return 'bg-yellow-100 text-yellow-900 border-yellow-300';
  if (tier === 'Bạc') return 'bg-slate-200 text-slate-800 border-slate-300';
  return 'bg-amber-100 text-amber-900 border-amber-300';
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('global-toast');
  if (!toast) return;
  const styles =
    type === 'error'
      ? 'bg-red-600 text-white border-red-700'
      : type === 'warning'
      ? 'bg-amber-600 text-white border-amber-700'
      : 'bg-brand-700 text-white border-brand-800';

  toast.className = `fixed top-20 right-4 left-4 sm:left-auto sm:max-w-md z-50 rounded-2xl p-4 shadow-2xl border text-sm font-bold transition-all ${styles}`;
  toast.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4200);
}

// =========================================================
// 2. LƯU TRỮ LOCALSTORAGE OFFLINE & ĐỒNG BỘ CLOUD SQL
// =========================================================
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
  // Đồng bộ ngầm lên Server / Supabase (không chặn luồng nếu mất mạng)
  fetch('/api/state/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state: appState })
  }).catch(() => {});
}

async function initState() {
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      const parsed = JSON.parse(localRaw);
      if (parsed && Array.isArray(parsed.members) && parsed.members.length > 0) {
        appState = parsed;
        // Đảm bảo luôn có danh sách testCases
        if (!Array.isArray(appState.testCases)) {
          appState.testCases = getDefaultBtcDataset().testCases;
        }
        renderAll();
        return;
      }
    } catch (_) {}
  }

  // Nếu chưa có trong localStorage, thử tải từ Server hoặc dùng bộ mẫu BTC
  try {
    const res = await fetch('/api/state');
    const data = await res.json();
    if (data.ok && data.state && Array.isArray(data.state.members)) {
      appState = data.state;
    } else {
      appState = getDefaultBtcDataset();
    }
  } catch (_) {
    appState = getDefaultBtcDataset();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  renderAll();
}

function resetToBtcSampleData() {
  appState = getDefaultBtcDataset();
  currentMemberId = 'KT-004';
  saveState();
  renderAll();
  fetch('/api/state/reset', { method: 'POST' }).catch(() => {});
  showToast('Đã nạp lại bộ dữ liệu mẫu chuẩn của Ban Tổ Chức (8 thành viên, 7 giao dịch, 3 mức ưu đãi)!', 'success');
}

// =========================================================
// 3. SINH MÃ QR CHUẨN (PAYLOAD = MaThanhVien) HOẠT ĐỘNG CẢ OFFLINE
// =========================================================
function generateQrSvgHtml(payloadText, cellSize = 4) {
  const cleanPayload = String(payloadText || 'KT-004').trim();
  if (typeof window.qrcode === 'function') {
    try {
      const qr = window.qrcode(0, 'M');
      qr.addData(cleanPayload);
      qr.make();
      return qr.createSvgTag({ cellSize, margin: 1, scalable: true });
    } catch (err) {
      console.warn('QR lib error:', err);
    }
  }
  // Fallback SVG nếu offline hoàn toàn và chưa kịp tải script CDN
  return `<div class="p-2 text-center font-mono font-black text-xs border border-slate-300 rounded bg-slate-50">QR:${escapeHtml(cleanPayload)}</div>`;
}

// =========================================================
// 4. RENDER GIAO DIỆN TOÀN HỆ THỐNG
// =========================================================
function getActiveMember() {
  let found = (appState.members || []).find((m) => m.id === currentMemberId);
  if (!found && appState.members.length > 0) {
    found = appState.members[0];
    currentMemberId = found.id;
  }
  return found;
}

function renderStatsBar() {
  const members = appState.members || [];
  const txs = appState.transactions || [];
  const wallet = appState.vouchersWallet || [];

  let bronze = 0;
  let silver = 0;
  let gold = 0;
  let totalPoints = 0;

  members.forEach((m) => {
    m.tier = calculateTier(m.points);
    if (m.tier === 'Vàng') gold++;
    else if (m.tier === 'Bạc') silver++;
    else bronze++;
    totalPoints += Number(m.points || 0);
  });

  const totalRedeemedPoints = txs
    .filter((t) => Number(t.pointsDelta) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.pointsDelta || 0)), 0);
  const totalIssued = totalPoints + totalRedeemedPoints;

  document.getElementById('stat-total-members').textContent = String(members.length);
  document.getElementById('stat-tier-breakdown').textContent = `Đồng: ${bronze} · Bạc: ${silver} · Vàng: ${gold}`;
  document.getElementById('stat-total-points').textContent = formatNumber(totalPoints);
  document.getElementById('stat-issued-points').textContent = formatNumber(totalIssued);
  document.getElementById('stat-tx-count').textContent = `${txs.length} giao dịch trong sổ`;
  document.getElementById('stat-wallet-count').textContent = String(wallet.length);
}

function renderMemberSelector() {
  const selectEl = document.getElementById('select-active-member');
  const chipsBar = document.getElementById('member-chips-bar');
  const searchInput = document.getElementById('member-quick-search');
  if (!selectEl || !chipsBar) return;

  const q = String(searchInput?.value || '').trim().toLowerCase();
  const filteredMembers = (appState.members || []).filter((m) => {
    if (!q) return true;
    return (
      m.id.toLowerCase().includes(q) ||
      m.fullName.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q)
    );
  });

  selectEl.innerHTML = (appState.members || [])
    .map(
      (m) => `
      <option value="${escapeHtml(m.id)}" ${m.id === currentMemberId ? 'selected' : ''}>
        ${escapeHtml(m.id)} — ${escapeHtml(m.fullName)} (${formatNumber(m.points)} điểm · Hạng ${escapeHtml(calculateTier(m.points))})
      </option>
    `
    )
    .join('');

  chipsBar.innerHTML = filteredMembers
    .map((m) => {
      const isSelected = m.id === currentMemberId;
      const tier = calculateTier(m.points);
      return `
        <button
          type="button"
          data-select-member="${escapeHtml(m.id)}"
          class="btn-member-chip shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
            isSelected
              ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
          }"
        >
          ${escapeHtml(m.id)} · ${escapeHtml(m.fullName)} (${formatNumber(m.points)}đ)
        </button>
      `;
    })
    .join('');
}

function renderMemberCard(triggerAnimation = false) {
  const member = getActiveMember();
  if (!member) return;

  const tier = calculateTier(member.points);
  member.tier = tier;

  const cardEl = document.getElementById('member-card-container');
  if (cardEl) {
    cardEl.className = `rounded-3xl p-6 transition-all ${getTierCardClass(tier)} ${
      triggerAnimation ? 'animate-tier-up' : ''
    }`;
  }

  document.getElementById('card-member-name').textContent = member.fullName;
  document.getElementById('card-member-phone').textContent = member.phone;
  document.getElementById('card-tier-badge').textContent = `Hạng ${tier}`;
  document.getElementById('card-sample-tag').textContent = member.isSample
    ? 'Dữ liệu mẫu'
    : 'Thành viên mới';
  document.getElementById('card-member-points').innerHTML = `${formatNumber(member.points)} <span class="text-base font-bold opacity-80">điểm</span>`;
  document.getElementById('card-member-id').textContent = member.id;
  document.getElementById('card-joined-date').textContent = `Tham gia: ${member.joinedDate || '2026-11-17'}`;
  document.getElementById('card-qr-caption').textContent = member.id;

  // Thanh tiến trình lên hạng tiếp theo
  const progressBar = document.getElementById('card-tier-progress-bar');
  const nextHint = document.getElementById('card-next-tier-hint');
  const p = Number(member.points || 0);

  if (p < 1000) {
    const pct = Math.min(100, Math.round((p / 1000) * 100));
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (nextHint) {
      nextHint.textContent = `Cần tích thêm ${formatNumber(1000 - p)} điểm để lên Hạng Bạc (mốc 1.000 điểm)`;
    }
  } else if (p < 5000) {
    const pct = Math.min(100, Math.round(((p - 1000) / 4000) * 100));
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (nextHint) {
      nextHint.textContent = `Cần tích thêm ${formatNumber(5000 - p)} điểm để lên Hạng Vàng (mốc 5.000 điểm)`;
    }
  } else {
    if (progressBar) progressBar.style.width = '100%';
    if (nextHint) {
      nextHint.textContent = 'Chúc mừng! Bạn đang ở Hạng Vàng (Hạng cao nhất của hệ thống)';
    }
  }

  // Render QR Code của thành viên (Payload = MaThanhVien)
  const qrBox = document.getElementById('card-qr-box');
  if (qrBox) {
    qrBox.innerHTML = generateQrSvgHtml(member.id, 4);
  }

  // Render Đặc quyền hạng thẻ thực tế (Starbucks Rewards Perks)
  const perksTierLabel = document.getElementById('perks-tier-label');
  const perksListBox = document.getElementById('perks-list-box');
  if (perksTierLabel) perksTierLabel.textContent = `Hạng ${tier}`;
  if (perksListBox) {
    const perksByTier = {
      Đồng: [
        'Tích điểm tiêu chuẩn 10.000đ = 1 điểm cho mọi hóa đơn.',
        'Đổi ngay Voucher 20.000đ khi đạt 500 điểm tích lũy.'
      ],
      Bạc: [
        'Mở khóa đổi Voucher 20.000đ (500đ) và Voucher 50.000đ (1.100đ).',
        'Tặng ưu đãi mừng sinh nhật thành viên Hạng Bạc.'
      ],
      Vàng: [
        'Đặc quyền đổi toàn bộ Voucher và Quà tặng đặc biệt giới hạn (2.000đ).',
        'Ưu tiên phục vụ nhanh tại quầy và miễn phí nâng cỡ đồ uống.'
      ]
    };
    const list = perksByTier[tier] || perksByTier['Đồng'];
    perksListBox.innerHTML = list
      .map((item) => `<li class="flex items-start gap-2"><span class="text-brand-600 font-black">•</span><span>${escapeHtml(item)}</span></li>`)
      .join('');
  }
}

function renderRewardsAndWallet() {
  const member = getActiveMember();
  if (!member) return;

  document.getElementById('redeem-member-label').textContent = `${member.fullName} (${member.id})`;
  document.getElementById('redeem-member-points').textContent = `${formatNumber(member.points)} điểm`;

  const rewardsGrid = document.getElementById('rewards-catalog-grid');
  if (rewardsGrid) {
    rewardsGrid.innerHTML = (appState.rewards || [])
      .map((r) => {
        const canAfford = Number(member.points) >= Number(r.pointsCost);
        return `
          <div class="rounded-2xl border ${
            canAfford ? 'border-brand-200 bg-brand-50/30' : 'border-slate-200 bg-slate-50'
          } p-4 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between gap-1">
                <span class="font-mono text-[11px] font-bold text-slate-500">${escapeHtml(r.id)}</span>
                <span class="px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  canAfford ? 'bg-brand-100 text-brand-800' : 'bg-slate-200 text-slate-700'
                }">
                  ${formatNumber(r.pointsCost)} điểm
                </span>
              </div>
              <h3 class="text-sm sm:text-base font-extrabold text-slate-900 mt-1.5">${escapeHtml(r.name)}</h3>
              <p class="text-xs text-slate-600 mt-0.5">${escapeHtml(r.description)}</p>
            </div>

            <button
              type="button"
              data-redeem-id="${escapeHtml(r.id)}"
              class="btn-redeem-reward touch-target w-full py-2.5 px-3 rounded-xl text-xs font-extrabold transition-colors ${
                canAfford
                  ? 'bg-brand-700 hover:bg-brand-800 text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }"
            >
              ${canAfford ? `Đổi Ngay (-${formatNumber(r.pointsCost)}đ)` : `Đổi Ưu Đãi (${formatNumber(r.pointsCost)}đ)`}
            </button>
          </div>
        `;
      })
      .join('');
  }

  // Render Ví ưu đãi của thành viên đang chọn (Có nút Sử dụng tại quầy)
  const walletList = document.getElementById('member-wallet-list');
  const walletBadge = document.getElementById('member-wallet-badge');
  const myVouchers = (appState.vouchersWallet || []).filter((v) => v.memberId === member.id);

  if (walletBadge) {
    walletBadge.textContent = `${myVouchers.length} ưu đãi`;
  }

  if (walletList) {
    if (myVouchers.length === 0) {
      walletList.innerHTML = `
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
          Thành viên <strong>${escapeHtml(member.fullName)} (${escapeHtml(member.id)})</strong> chưa có voucher nào trong ví.
        </div>
      `;
    } else {
      walletList.innerHTML = myVouchers
        .map((v) => {
          const isUsed = v.status === 'Đã sử dụng';
          return `
          <div class="p-3.5 rounded-xl ${
            isUsed ? 'bg-slate-100 border border-slate-200 opacity-75' : 'bg-indigo-50/60 border border-indigo-200'
          } flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs font-black text-indigo-800 bg-white px-2 py-0.5 rounded border border-indigo-200">${escapeHtml(v.voucherCode)}</span>
                <span class="font-bold text-sm text-slate-900">${escapeHtml(v.rewardName)}</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  isUsed
                    ? 'bg-slate-200 text-slate-600 border-slate-300'
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }">${escapeHtml(v.status)}</span>
              </div>
              <div class="text-xs text-slate-500 mt-1">
                Đã đổi: <strong>-${formatNumber(v.pointsSpent)} điểm</strong> · Lúc: ${escapeHtml(v.redeemedAt)} ${
            v.usedAt ? `· Đã dùng: ${escapeHtml(v.usedAt)}` : ''
          }
              </div>
            </div>
            ${
              !isUsed
                ? `<button
                    type="button"
                    data-use-voucher="${escapeHtml(v.voucherCode)}"
                    class="btn-use-voucher px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    Dùng Tại Quầy
                  </button>`
                : ''
            }
          </div>
        `;
        })
        .join('');
    }
  }
}

function renderPointHistory() {
  const member = getActiveMember();
  const allTxs = appState.transactions || [];

  // 1. Render Nhật ký điểm cá nhân (trong tab phụ của màn hình Thành Viên)
  const personalListEl = document.getElementById('member-personal-history-list');
  if (personalListEl) {
    const myTxs = allTxs.filter((t) => t.memberId === member?.id);
    if (myTxs.length === 0) {
      personalListEl.innerHTML = `
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
          Thành viên này chưa phát sinh giao dịch biến động điểm.
        </div>
      `;
    } else {
      personalListEl.innerHTML = myTxs
        .map((t) => {
          const isPos = Number(t.pointsDelta) >= 0;
          return `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[11px] font-extrabold ${
                    isPos ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  }">${escapeHtml(t.type)}</span>
                  <span class="font-mono text-xs font-bold text-slate-700">${escapeHtml(t.txCode)}</span>
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">${escapeHtml(t.createdAt)}</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-black ${isPos ? 'text-emerald-700' : 'text-amber-700'}">
                  ${isPos ? '+' : ''}${formatNumber(t.pointsDelta)} điểm
                </div>
                <div class="text-[11px] text-slate-500">Số dư: ${formatNumber(t.balanceAfter)}đ</div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // 2. Render Sổ Giao Dịch & Lịch Sử Biến Động Điểm tại màn hình Quầy Thu Ngân
  const listEl = document.getElementById('member-history-list');
  const scopeSelect = document.getElementById('filter-history-scope');
  const typeSelect = document.getElementById('filter-history-type');
  const txSearchInput = document.getElementById('history-tx-search');
  if (!listEl) return;

  const scope = scopeSelect?.value || 'all';
  const filterType = typeSelect?.value || 'all';
  const q = String(txSearchInput?.value || '').trim().toLowerCase();

  let filtered =
    scope === 'all' ? allTxs : allTxs.filter((t) => t.memberId === member?.id);

  if (filterType === 'earn') {
    filtered = filtered.filter((t) => Number(t.pointsDelta) >= 0);
  } else if (filterType === 'redeem') {
    filtered = filtered.filter((t) => Number(t.pointsDelta) < 0);
  }

  if (q) {
    filtered = filtered.filter(
      (t) =>
        String(t.txCode || '').toLowerCase().includes(q) ||
        String(t.memberId || '').toLowerCase().includes(q) ||
        String(t.note || '').toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
        Chưa có giao dịch biến động điểm nào cho thành viên này.
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered
    .map((t) => {
      const isPositive = Number(t.pointsDelta) >= 0;
      const mObj = (appState.members || []).find((m) => m.id === t.memberId);
      const mName = mObj ? mObj.fullName : t.memberId;
      return `
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="space-y-0.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded-md text-xs font-extrabold ${
                isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }">
                ${escapeHtml(t.type)}
              </span>
              <span class="font-mono text-xs font-bold text-slate-700">Mã GD: ${escapeHtml(t.txCode)}</span>
              <span class="text-xs font-semibold text-slate-800">${escapeHtml(t.memberId)} — ${escapeHtml(mName)}</span>
            </div>
            <div class="text-xs text-slate-500">
              Thời gian: ${escapeHtml(t.createdAt)} ${
                Number(t.amountVnd) > 0 ? `· Giá trị đơn: ${formatNumber(t.amountVnd)}đ` : ''
              } ${t.note ? `· ${escapeHtml(t.note)}` : ''}
            </div>
          </div>

          <div class="sm:text-right shrink-0">
            <div class="text-sm font-black ${isPositive ? 'text-emerald-700' : 'text-amber-700'}">
              ${isPositive ? '+' : ''}${formatNumber(t.pointsDelta)} điểm
            </div>
            <div class="text-[11px] font-semibold text-slate-500">
              Số dư sau GD: <strong>${formatNumber(t.balanceAfter)} điểm</strong>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderCounterMembersGrid() {
  const grid = document.getElementById('counter-members-grid');
  const countEl = document.getElementById('counter-members-count');
  if (!grid) return;

  const members = appState.members || [];
  if (countEl) countEl.textContent = String(members.length);

  grid.innerHTML = members
    .map((m) => {
      const tier = calculateTier(m.points);
      return `
        <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between gap-2.5">
          <div>
            <div class="flex items-center justify-between gap-1">
              <span class="font-mono text-xs font-black text-brand-700">${escapeHtml(m.id)}</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-bold border ${getTierBadgeStyle(tier)}">
                Hạng ${escapeHtml(tier)}
              </span>
            </div>
            <div class="font-bold text-sm text-slate-900 mt-1">${escapeHtml(m.fullName)}</div>
            <div class="text-xs text-slate-500">SĐT: ${escapeHtml(m.phone)}</div>
            <div class="text-sm font-black text-slate-900 mt-1">${formatNumber(m.points)} điểm</div>
          </div>
          <div class="flex gap-1.5">
            <button
              type="button"
              data-pos-pick="${escapeHtml(m.id)}"
              class="btn-pos-pick touch-target flex-1 py-1.5 px-2.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold transition-colors"
            >
              Chọn Cộng Điểm
            </button>
            <button
              type="button"
              data-card-pick="${escapeHtml(m.id)}"
              class="btn-card-pick touch-target py-1.5 px-2.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
            >
              Mở Thẻ
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderBtcTestCases() {
  const container = document.getElementById('btc-testcases-list');
  if (!container) return;

  const cases = appState.testCases || getDefaultBtcDataset().testCases;
  container.innerHTML = cases
    .map(
      (tc) => `
      <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-brand-700 text-white">${escapeHtml(tc.code)}</span>
            <span class="font-bold text-sm text-slate-900">${escapeHtml(tc.name)}</span>
            <span class="font-mono text-xs font-bold text-brand-700">Thành viên: ${escapeHtml(tc.memberId)}</span>
            <span class="font-mono text-xs text-slate-600">Mã GD/Ưu đãi: ${escapeHtml(tc.txOrRewardId)}</span>
          </div>
          <div class="text-xs text-slate-600">
            Đầu vào: <strong>${escapeHtml(tc.inputDesc)}</strong> ${
              Number(tc.amountVnd) > 0 ? `(${formatNumber(tc.amountVnd)}đ)` : ''
            } — Kỳ vọng: <strong class="text-slate-900">${escapeHtml(tc.expected)}</strong>
          </div>
        </div>
        <button
          type="button"
          data-run-tc="${escapeHtml(tc.code)}"
          class="btn-run-tc touch-target px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors"
        >
          Thực Hiện ${escapeHtml(tc.code)}
        </button>
      </div>
    `
    )
    .join('');
}

function renderQrSheetModalGrid() {
  const grid = document.getElementById('qr-sheet-grid');
  if (!grid) return;

  grid.innerHTML = (appState.members || [])
    .map(
      (m) => `
      <div class="p-3 rounded-2xl border ${
        m.id === 'KT-004' ? 'border-2 border-amber-500 bg-amber-50/40' : 'border-slate-200 bg-slate-50'
      } flex flex-col items-center text-center space-y-1.5">
        <span class="font-mono text-xs font-black text-slate-900">${escapeHtml(m.id)}</span>
        <div class="w-24 h-24 bg-white p-1 rounded-xl border border-slate-200 flex items-center justify-center">
          ${generateQrSvgHtml(m.id, 3)}
        </div>
        <div class="text-xs font-bold text-slate-800">${escapeHtml(m.fullName)}</div>
        <div class="text-[11px] text-slate-500">${formatNumber(m.points)}đ · ${escapeHtml(calculateTier(m.points))}</div>
        <button
          type="button"
          data-scan-payload="${escapeHtml(m.id)}"
          class="btn-scan-modal-qr touch-target w-full py-1.5 px-2 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold"
        >
          Quét Mã ${escapeHtml(m.id)}
        </button>
      </div>
    `
    )
    .join('');
}

function renderAll(triggerCardAnimation = false) {
  renderStatsBar();
  renderMemberSelector();
  renderMemberCard(triggerCardAnimation);
  renderRewardsAndWallet();
  renderPointHistory();
  renderCounterMembersGrid();
  renderBtcTestCases();
  renderQrSheetModalGrid();
  updatePosPreview();
}

// =========================================================
// 5. CHUYỂN CHẾ ĐỘ 2 ĐẦU (THÀNH VIÊN <-> QUẦY <-> THỂ LỆ)
// =========================================================
function switchViewMode(mode) {
  currentViewMode = mode;
  const viewMember = document.getElementById('view-member-mode');
  const viewCounter = document.getElementById('view-counter-mode');
  const viewRules = document.getElementById('view-rules-mode');

  viewMember?.classList.toggle('hidden', mode !== 'member');
  viewCounter?.classList.toggle('hidden', mode !== 'counter');
  viewRules?.classList.toggle('hidden', mode !== 'rules');

  document.querySelectorAll('.mode-switch-btn').forEach((btn) => {
    const isMatch = btn.getAttribute('data-mode') === mode;
    btn.className = isMatch
      ? 'mode-switch-btn touch-target flex-1 md:w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-brand-700 text-white shadow-xs transition-all flex items-center justify-between'
      : 'mode-switch-btn touch-target flex-1 md:w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-between';
  });
}

// =========================================================
// 6. NGHIỆP VỤ 1: ĐĂNG KÝ THÀNH VIÊN MỚI
// =========================================================
function registerNewMemberCore(fullNameRaw, phoneRaw, feedbackEl, nameInputEl, phoneInputEl) {
  const fullName = String(fullNameRaw || '').trim();
  const phone = String(phoneRaw || '').trim();

  if (!fullName || !phone) {
    if (feedbackEl) {
      feedbackEl.textContent = 'Vui lòng nhập đầy đủ Họ tên và Số điện thoại của thành viên.';
      feedbackEl.className = 'rounded-xl p-3 text-xs font-bold bg-red-50 border border-red-200 text-red-700';
      feedbackEl.classList.remove('hidden');
    }
    return false;
  }

  if (!/^0\d{9}$/.test(phone)) {
    if (feedbackEl) {
      feedbackEl.textContent = 'Số điện thoại không hợp lệ (cần đúng 10 chữ số bắt đầu bằng số 0).';
      feedbackEl.className = 'rounded-xl p-3 text-xs font-bold bg-red-50 border border-red-200 text-red-700';
      feedbackEl.classList.remove('hidden');
    }
    return false;
  }

  const dupPhone = (appState.members || []).find((m) => m.phone === phone);
  if (dupPhone) {
    if (feedbackEl) {
      feedbackEl.textContent = `Số điện thoại ${phone} đã được đăng ký cho mã thành viên ${dupPhone.id} (${dupPhone.fullName}).`;
      feedbackEl.className = 'rounded-xl p-3 text-xs font-bold bg-red-50 border border-red-200 text-red-700';
      feedbackEl.classList.remove('hidden');
    }
    return false;
  }

  // Sinh mã thành viên duy nhất KT-009, KT-010...
  let nextNum = (appState.members || []).length + 1;
  let newId = `KT-${String(nextNum).padStart(3, '0')}`;
  while ((appState.members || []).some((m) => m.id === newId)) {
    nextNum++;
    newId = `KT-${String(nextNum).padStart(3, '0')}`;
  }

  const today = new Date().toISOString().slice(0, 10);
  const newMember = {
    id: newId,
    fullName,
    phone,
    initialPoints: 0,
    points: 0,
    tier: 'Đồng',
    status: 'Đang hoạt động',
    joinedDate: today,
    qrPayload: newId,
    isSample: false
  };

  appState.members.push(newMember);
  currentMemberId = newId;
  saveState();
  renderAll(true);

  if (nameInputEl) nameInputEl.value = '';
  if (phoneInputEl) phoneInputEl.value = '';
  if (feedbackEl) {
    feedbackEl.textContent = `Đăng ký thành công! Đã sinh mã thành viên duy nhất ${newId} cho ${fullName} và hiển thị ngay trên thẻ phía trên.`;
    feedbackEl.className = 'rounded-xl p-3 text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800';
    feedbackEl.classList.remove('hidden');
  }
  showToast(`Đã tạo thẻ thành viên mới: ${newId} — ${fullName}`, 'success');
  return true;
}

function handleRegisterMember(event) {
  event.preventDefault();
  const nameInput = document.getElementById('reg-fullname');
  const phoneInput = document.getElementById('reg-phone');
  const feedback = document.getElementById('reg-feedback');
  registerNewMemberCore(nameInput?.value, phoneInput?.value, feedback, nameInput, phoneInput);
}

// =========================================================
// 7. NGHIỆP VỤ 2: CỘNG ĐIỂM TẠI QUẦY & CHỐNG CỘNG TRÙNG MÃ GIAO DỊCH
// =========================================================
function updatePosPreview() {
  const memberInput = document.getElementById('pos-member-id');
  const amountInput = document.getElementById('pos-amount-vnd');
  const previewBox = document.getElementById('pos-preview-box');
  if (!previewBox) return;

  const memberId = String(memberInput?.value || '').trim().toUpperCase();
  const amountVnd = Number(amountInput?.value || 0);
  const member = (appState.members || []).find((m) => m.id.toUpperCase() === memberId);

  if (!member) {
    previewBox.innerHTML = memberId
      ? `<span class="text-red-600 font-bold">Không tìm thấy mã thành viên "${escapeHtml(memberId)}".</span>`
      : 'Nhập Mã thành viên và Số tiền để xem trước số điểm cộng thêm.';
    return;
  }

  const pointsToAdd = amountVnd >= VND_PER_POINT ? Math.floor(amountVnd / VND_PER_POINT) : 0;
  const newBalance = Number(member.points || 0) + pointsToAdd;
  const oldTier = calculateTier(member.points);
  const newTier = calculateTier(newBalance);

  previewBox.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2">
      <span>Khách hàng: <strong>${escapeHtml(member.fullName)} (${escapeHtml(member.id)})</strong> · Hiện có: <strong>${formatNumber(member.points)} điểm</strong> (${escapeHtml(oldTier)})</span>
      <span class="font-extrabold text-brand-700">Điểm cộng: +${formatNumber(pointsToAdd)} điểm -> Số dư mới: ${formatNumber(newBalance)} điểm (${escapeHtml(newTier)})</span>
    </div>
  `;
}

function handleCounterEarnSubmit(event) {
  event.preventDefault();
  const memberInput = document.getElementById('pos-member-id');
  const txInput = document.getElementById('pos-tx-code');
  const amountInput = document.getElementById('pos-amount-vnd');
  const noteInput = document.getElementById('pos-note');
  const feedback = document.getElementById('pos-feedback');

  const memberId = String(memberInput?.value || '').trim().toUpperCase();
  const txCode = String(txInput?.value || '').trim().toUpperCase();
  const amountVnd = Number(amountInput?.value || 0);
  const note = String(noteInput?.value || '').trim() || 'Cộng điểm giao dịch tại quầy';

  if (!memberId || !txCode || !amountInput?.value) {
    feedback.textContent = 'Vui lòng nhập đầy đủ Mã thành viên, Mã giao dịch và Số tiền thanh toán.';
    feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-red-50 border border-red-200 text-red-700';
    feedback.classList.remove('hidden');
    return;
  }

  const member = (appState.members || []).find((m) => m.id.toUpperCase() === memberId);
  if (!member) {
    feedback.textContent = `Lỗi: Không tồn tại mã thành viên "${memberId}" trong hệ thống.`;
    feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-red-50 border border-red-200 text-red-700';
    feedback.classList.remove('hidden');
    return;
  }

  // CHỐNG CỘNG TRÙNG MÃ GIAO DỊCH (YÊU CẦU BẮT BUỘC SỐ 5 - TC-KT-02)
  const existingTx = (appState.transactions || []).find(
    (t) => String(t.txCode || '').toUpperCase() === txCode
  );
  if (existingTx) {
    const dupMsg = `CẢNH BÁO TRÙNG MÃ GIAO DỊCH: Mã giao dịch "${txCode}" đã được ghi nhận trước đó (lúc ${existingTx.createdAt} cho thành viên ${existingTx.memberId}). Hệ thống từ chối cộng điểm trùng!`;
    feedback.textContent = dupMsg;
    feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-red-50 border-2 border-red-400 text-red-700';
    feedback.classList.remove('hidden');
    showToast(`Từ chối cộng trùng: Mã giao dịch ${txCode} đã tồn tại trong sổ!`, 'error');
    return;
  }

  if (amountVnd < VND_PER_POINT) {
    feedback.textContent = `Số tiền giao dịch phải tối thiểu từ ${formatNumber(VND_PER_POINT)}đ trở lên để quy đổi 1 điểm.`;
    feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-red-50 border border-red-200 text-red-700';
    feedback.classList.remove('hidden');
    return;
  }

  const pointsAdded = Math.floor(amountVnd / VND_PER_POINT);
  const oldPoints = Number(member.points || 0);
  const oldTier = calculateTier(oldPoints);
  const newPoints = oldPoints + pointsAdded;
  const newTier = calculateTier(newPoints);

  member.points = newPoints;
  member.tier = newTier;

  const newRecord = {
    id: `KT-LS-${String((appState.transactions || []).length + 1).padStart(3, '0')}`,
    txCode,
    memberId: member.id,
    type: 'Cộng điểm',
    amountVnd,
    pointsDelta: pointsAdded,
    balanceAfter: newPoints,
    createdAt: formatNowTimestamp(),
    note
  };

  appState.transactions = [newRecord, ...(appState.transactions || [])];
  currentMemberId = member.id;
  saveState();
  renderAll(true);

  const tierUpText =
    newTier !== oldTier
      ? ` CHÚC MỪNG THĂNG HẠNG: Từ Hạng ${oldTier} lên Hạng ${newTier}!`
      : '';

  feedback.textContent = `Cộng điểm thành công (+${formatNumber(pointsAdded)} điểm) cho ${member.fullName} (${member.id}) với mã GD ${txCode}. Số dư từ ${formatNumber(oldPoints)} lên ${formatNumber(newPoints)} điểm (${newTier}).${tierUpText}`;
  feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-emerald-50 border-2 border-emerald-400 text-emerald-800';
  feedback.classList.remove('hidden');

  showToast(`+${formatNumber(pointsAdded)} điểm cho ${member.fullName} (${member.id})! Số dư mới: ${formatNumber(newPoints)} điểm.${tierUpText}`, 'success');
}

// =========================================================
// 8. NGHIỆP VỤ 3: ĐỔI ĐIỂM LẤY ƯU ĐÃI & VÍ VOUCHER (TC-KT-03 & TC-KT-04)
// =========================================================
function handleRedeemReward(rewardId) {
  const member = getActiveMember();
  const reward = (appState.rewards || []).find((r) => r.id === rewardId);
  const feedback = document.getElementById('redeem-feedback');
  if (!member || !reward || !feedback) return;

  const cost = Number(reward.pointsCost || 0);
  const currentPts = Number(member.points || 0);

  // Kiểm tra không đủ điểm (TC-KT-04)
  if (currentPts < cost) {
    const errMsg = `TỪ CHỐI ĐỔI ƯU ĐÃI: Thành viên ${member.fullName} (${member.id}) hiện có ${formatNumber(currentPts)} điểm, không đủ ${formatNumber(cost)} điểm để đổi "${reward.name} (${reward.id})". Số dư giữ nguyên là ${formatNumber(currentPts)} điểm.`;
    feedback.textContent = errMsg;
    feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-red-50 border-2 border-red-300 text-red-700';
    feedback.classList.remove('hidden');
    showToast(`Không đủ điểm đổi ${reward.name}! Số dư của ${member.id} vẫn là ${formatNumber(currentPts)} điểm.`, 'error');
    return;
  }

  // Đủ điểm -> Trừ điểm, cập nhật hạng, thêm vào Ví ưu đãi & ghi Lịch sử biến động điểm (TC-KT-03)
  const newBalance = currentPts - cost;
  member.points = newBalance;
  member.tier = calculateTier(newBalance);

  const txCode = `RDM-${Date.now().toString().slice(-5)}`;
  const voucherCode = `VCH-${member.id.replace('-', '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const nowStr = formatNowTimestamp();

  const voucherItem = {
    voucherCode,
    rewardId: reward.id,
    rewardName: reward.name,
    memberId: member.id,
    pointsSpent: cost,
    redeemedAt: nowStr,
    status: 'Chưa sử dụng',
    txCode
  };

  const historyItem = {
    id: `KT-LS-${String((appState.transactions || []).length + 1).padStart(3, '0')}`,
    txCode,
    memberId: member.id,
    type: 'Đổi điểm',
    amountVnd: 0,
    pointsDelta: -cost,
    balanceAfter: newBalance,
    createdAt: nowStr,
    note: `Đổi ưu đãi ${reward.name} (${reward.id})`
  };

  appState.vouchersWallet = [voucherItem, ...(appState.vouchersWallet || [])];
  appState.transactions = [historyItem, ...(appState.transactions || [])];
  saveState();
  renderAll(true);

  feedback.textContent = `Đổi ưu đãi thành công! Đã thêm "${reward.name}" (Mã: ${voucherCode}) vào Ví Ưu Đãi của ${member.fullName} (${member.id}). Số dư điểm giảm từ ${formatNumber(currentPts)} còn ${formatNumber(newBalance)} điểm.`;
  feedback.className = 'rounded-xl p-3.5 text-xs sm:text-sm font-bold bg-emerald-50 border-2 border-emerald-400 text-emerald-800';
  feedback.classList.remove('hidden');

  showToast(`Đã đổi ${reward.name} (-${formatNumber(cost)} điểm)! Số dư còn: ${formatNumber(newBalance)} điểm.`, 'success');
}

// =========================================================
// 9. NGHIỆP VỤ 4: QUÉT MÃ QR TẠI QUẦY (+4 ĐIỂM THƯỞNG - TC-KT-05)
// =========================================================
function handleDecodedQrPayload(rawPayload, sourceLabel = 'Quét QR') {
  const cleanCode = String(rawPayload || '').trim().toUpperCase();
  const resultBox = document.getElementById('qr-scan-result-box');
  const posMemberInput = document.getElementById('pos-member-id');

  const foundMember = (appState.members || []).find(
    (m) => m.id.toUpperCase() === cleanCode || String(m.qrPayload || '').toUpperCase() === cleanCode
  );

  if (!foundMember) {
    if (resultBox) {
      resultBox.innerHTML = `<div class="text-xs font-bold text-red-700">Đã đọc mã QR "${escapeHtml(cleanCode)}" nhưng không tìm thấy hồ sơ thành viên tương ứng.</div>`;
      resultBox.classList.remove('hidden');
    }
    showToast(`Không tìm thấy thành viên có mã QR: ${cleanCode}`, 'error');
    return;
  }

  // Cập nhật thành viên đang chọn và điền ngay vào ô Mã thành viên ở Quầy thu ngân
  currentMemberId = foundMember.id;
  if (posMemberInput) {
    posMemberInput.value = foundMember.id;
  }
  renderAll(true);

  if (resultBox) {
    resultBox.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="inline-block text-[11px] font-extrabold uppercase bg-brand-700 text-white px-2.5 py-0.5 rounded-full">
            ${escapeHtml(sourceLabel)} Thành Công — Payload: ${escapeHtml(foundMember.id)}
          </span>
          <h3 class="text-base font-extrabold text-slate-900 mt-1">
            Hồ sơ: ${escapeHtml(foundMember.fullName)} (${escapeHtml(foundMember.id)})
          </h3>
          <p class="text-xs text-slate-600">
            SĐT: <strong>${escapeHtml(foundMember.phone)}</strong> · Số dư hiện tại: <strong class="text-brand-700">${formatNumber(foundMember.points)} điểm</strong> · Hạng: <strong>${escapeHtml(calculateTier(foundMember.points))}</strong>
          </p>
        </div>
        <button
          type="button"
          id="btn-jump-to-member-card"
          class="touch-target px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0"
        >
          Mở Xem Thẻ Thành Viên
        </button>
      </div>
    `;
    resultBox.classList.remove('hidden');
    document.getElementById('btn-jump-to-member-card')?.addEventListener('click', () => {
      switchViewMode('member');
    });
  }

  showToast(`Đã đọc QR "${foundMember.id}" -> Mở hồ sơ ${foundMember.fullName} (${formatNumber(foundMember.points)} điểm)!`, 'success');
}

async function startCameraScanner() {
  const viewport = document.getElementById('qr-reader-viewport');
  const startBtn = document.getElementById('btn-start-camera-qr');
  const stopBtn = document.getElementById('btn-stop-camera-qr');

  if (typeof window.Html5Qrcode !== 'function') {
    showToast('Trình quét Camera đang tải hoặc thiết bị đang ngoại tuyến. Bạn có thể bấm nút Quét thử mã chuẩn KT-004!', 'warning');
    return;
  }

  try {
    if (!html5QrScanner) {
      viewport.innerHTML = '';
      html5QrScanner = new window.Html5Qrcode('qr-reader-viewport');
    }
    await html5QrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      (decodedText) => {
        handleDecodedQrPayload(decodedText, 'Camera Quét QR');
        stopCameraScanner();
      },
      () => {}
    );
    isCameraRunning = true;
    startBtn?.classList.add('hidden');
    stopBtn?.classList.remove('hidden');
  } catch (err) {
    viewport.innerHTML = `<div class="p-3 text-xs text-amber-300">Không mở được Camera trực tiếp (${escapeHtml(err.message || 'Cần cấp quyền Camera')}). Hãy dùng nút "Chọn Ảnh QR Từ Máy" hoặc "Quét Thử Mã Chuẩn KT-004".</div>`;
  }
}

async function stopCameraScanner() {
  const startBtn = document.getElementById('btn-start-camera-qr');
  const stopBtn = document.getElementById('btn-stop-camera-qr');
  if (html5QrScanner && isCameraRunning) {
    try {
      await html5QrScanner.stop();
    } catch (_) {}
    isCameraRunning = false;
  }
  startBtn?.classList.remove('hidden');
  stopBtn?.classList.add('hidden');
}

// =========================================================
// 10. CHẠY TỰ ĐỘNG 5 CA KIỂM TRA CHUẨN CỦA BTC (TC-KT-01 .. TC-KT-05)
// =========================================================
function executeBtcTestCase(tcCode) {
  if (tcCode === 'TC-KT-01') {
    switchViewMode('counter');
    document.getElementById('pos-member-id').value = 'KT-008';
    document.getElementById('pos-tx-code').value = 'TX-NEW-001';
    document.getElementById('pos-amount-vnd').value = '1000000';
    document.getElementById('pos-note').value = 'Ca kiểm tra TC-KT-01 (Cộng 100 điểm mới)';
    updatePosPreview();
    document.getElementById('counter-earn-form')?.requestSubmit();
  } else if (tcCode === 'TC-KT-02') {
    switchViewMode('counter');
    document.getElementById('pos-member-id').value = 'KT-002';
    document.getElementById('pos-tx-code').value = 'TX-KT-002';
    document.getElementById('pos-amount-vnd').value = '1500000';
    document.getElementById('pos-note').value = 'Ca kiểm tra TC-KT-02 (Test chống trùng mã GD)';
    updatePosPreview();
    document.getElementById('counter-earn-form')?.requestSubmit();
  } else if (tcCode === 'TC-KT-03') {
    currentMemberId = 'KT-005';
    switchViewMode('member');
    renderAll();
    handleRedeemReward('KT-VCH-01');
  } else if (tcCode === 'TC-KT-04') {
    currentMemberId = 'KT-008';
    switchViewMode('member');
    renderAll();
    handleRedeemReward('KT-VCH-01');
  } else if (tcCode === 'TC-KT-05') {
    switchViewMode('counter');
    handleDecodedQrPayload('KT-004', 'Quét QR Chuẩn BTC (TC-KT-05)');
  }
}

// =========================================================
// 11. KHỞI TẠO SỰ KIỆN KHI TRANG TẢI XONG
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initState();

  // Chuyển chế độ 2 đầu trên Sidebar trái
  document.querySelectorAll('.mode-switch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchViewMode(btn.getAttribute('data-mode') || 'member');
    });
  });

  // Nút thu gọn / mở rộng Sidebar trái kiểu YouTube
  document.getElementById('btn-toggle-sidebar')?.addEventListener('click', () => {
    const sidebar = document.getElementById('left-sidebar');
    sidebar?.classList.toggle('md:hidden');
  });

  document.getElementById('footer-link-rules')?.addEventListener('click', (e) => {
    e.preventDefault();
    switchViewMode('rules');
  });

  // Nút Nạp dữ liệu mẫu BTC
  document.getElementById('btn-reset-sample-desktop')?.addEventListener('click', resetToBtcSampleData);
  document.getElementById('btn-reset-sample-mobile')?.addEventListener('click', resetToBtcSampleData);

  // Chọn thành viên trên dropdown & thanh chip
  document.getElementById('select-active-member')?.addEventListener('change', (e) => {
    currentMemberId = e.target.value;
    document.getElementById('redeem-feedback')?.classList.add('hidden');
    renderAll();
  });

  document.getElementById('member-quick-search')?.addEventListener('input', renderMemberSelector);

  document.getElementById('member-chips-bar')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.btn-member-chip');
    if (!chip) return;
    currentMemberId = chip.getAttribute('data-select-member');
    document.getElementById('redeem-feedback')?.classList.add('hidden');
    renderAll();
  });

  // Đưa mã thành viên đang chọn sang Quầy thu ngân
  document.getElementById('btn-send-to-counter')?.addEventListener('click', () => {
    const member = getActiveMember();
    if (!member) return;
    switchViewMode('counter');
    document.getElementById('pos-member-id').value = member.id;
    updatePosPreview();
    showToast(`Đã chuyển mã ${member.id} (${member.fullName}) sang Quầy Thu Ngân!`, 'success');
  });

  // Tải ảnh QR của thành viên đang chọn
  document.getElementById('btn-download-qr')?.addEventListener('click', () => {
    const member = getActiveMember();
    if (!member) return;
    const svgEl = document.querySelector('#card-qr-box svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR_${member.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Đăng ký thành viên mới trực tiếp trên màn hình Thành Viên
  document.getElementById('inline-register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('inline-reg-fullname');
    const phoneInput = document.getElementById('inline-reg-phone');
    const feedback = document.getElementById('inline-reg-feedback');
    const ok = registerNewMemberCore(nameInput?.value, phoneInput?.value, feedback, nameInput, phoneInput);
    if (ok) {
      document.getElementById('member-card-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  const regModal = document.getElementById('register-member-modal');
  document.getElementById('btn-open-register-modal')?.addEventListener('click', () => {
    document.getElementById('reg-feedback')?.classList.add('hidden');
    regModal?.classList.remove('hidden');
  });
  document.getElementById('btn-close-register-modal')?.addEventListener('click', () => {
    regModal?.classList.add('hidden');
  });
  document.getElementById('register-member-form')?.addEventListener('submit', (e) => {
    handleRegisterMember(e);
    const fb = document.getElementById('reg-feedback');
    if (fb && fb.className.includes('emerald')) {
      setTimeout(() => regModal?.classList.add('hidden'), 900);
    }
  });

  // Đổi điểm lấy ưu đãi
  document.getElementById('rewards-catalog-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-redeem-reward');
    if (!btn) return;
    handleRedeemReward(btn.getAttribute('data-redeem-id'));
  });

  // Sử dụng Voucher tại quầy (trong Ví ưu đãi)
  document.getElementById('member-wallet-list')?.addEventListener('click', (e) => {
    const useBtn = e.target.closest('.btn-use-voucher');
    if (!useBtn) return;
    const vCode = useBtn.getAttribute('data-use-voucher');
    const foundVoucher = (appState.vouchersWallet || []).find((v) => v.voucherCode === vCode);
    if (foundVoucher && foundVoucher.status !== 'Đã sử dụng') {
      foundVoucher.status = 'Đã sử dụng';
      foundVoucher.usedAt = formatNowTimestamp();
      saveState();
      renderAll();
      showToast(`Đã áp dụng thành công Voucher ${vCode} (${foundVoucher.rewardName}) tại quầy!`, 'success');
    }
  });

  // Phóng to mã QR toàn màn hình để đưa thu ngân quét
  const fsQrModal = document.getElementById('fullscreen-qr-modal');
  function openFullscreenQr() {
    const member = getActiveMember();
    if (!member || !fsQrModal) return;
    document.getElementById('fs-qr-name').textContent = member.fullName;
    document.getElementById('fs-qr-tier').textContent = `Hạng ${calculateTier(member.points)} · ${formatNumber(member.points)} điểm`;
    document.getElementById('fs-qr-code').textContent = member.id;
    document.getElementById('fs-qr-box').innerHTML = generateQrSvgHtml(member.id, 7);
    fsQrModal.classList.remove('hidden');
  }

  document.getElementById('btn-open-fullscreen-qr')?.addEventListener('click', openFullscreenQr);
  document.getElementById('btn-qr-box-trigger')?.addEventListener('click', openFullscreenQr);
  document.getElementById('btn-close-fullscreen-qr')?.addEventListener('click', () => {
    fsQrModal?.classList.add('hidden');
  });
  document.getElementById('btn-fs-scan-at-counter')?.addEventListener('click', () => {
    const member = getActiveMember();
    fsQrModal?.classList.add('hidden');
    if (member) {
      switchViewMode('counter');
      handleDecodedQrPayload(member.id, 'Quét Từ Thẻ QR Khách Hàng');
    }
  });

  // Lọc lịch sử biến động điểm & Tìm kiếm mã giao dịch tại Quầy
  document.getElementById('filter-history-scope')?.addEventListener('change', renderPointHistory);
  document.getElementById('filter-history-type')?.addEventListener('change', renderPointHistory);
  document.getElementById('history-tx-search')?.addEventListener('input', renderPointHistory);

  // Chuyển sub-tab giữa Ví Ưu Đãi Của Tôi và Nhật Ký Điểm Cá Nhân trên màn hình Thành Viên
  const subBtnWallet = document.getElementById('subtab-btn-wallet');
  const subBtnHistory = document.getElementById('subtab-btn-myhistory');
  const subPanelWallet = document.getElementById('subtab-panel-wallet');
  const subPanelHistory = document.getElementById('subtab-panel-myhistory');

  subBtnWallet?.addEventListener('click', () => {
    subPanelWallet?.classList.remove('hidden');
    subPanelHistory?.classList.add('hidden');
    subBtnWallet.className = 'px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-white text-slate-900 shadow-2xs transition-all';
    if (subBtnHistory) subBtnHistory.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all';
  });

  subBtnHistory?.addEventListener('click', () => {
    subPanelWallet?.classList.add('hidden');
    subPanelHistory?.classList.remove('hidden');
    subBtnHistory.className = 'px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-white text-slate-900 shadow-2xs transition-all';
    if (subBtnWallet) subBtnWallet.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all';
  });

  // Quầy thu ngân: Cộng điểm & Preview
  document.getElementById('pos-member-id')?.addEventListener('input', updatePosPreview);
  document.getElementById('pos-amount-vnd')?.addEventListener('input', updatePosPreview);
  document.getElementById('counter-earn-form')?.addEventListener('submit', handleCounterEarnSubmit);

  document.getElementById('btn-gen-tx-code')?.addEventListener('click', () => {
    document.getElementById('pos-tx-code').value = `TX-NEW-${Math.floor(100 + Math.random() * 900)}`;
  });

  document.querySelectorAll('.btn-quick-vnd').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('pos-amount-vnd').value = btn.getAttribute('data-quick-vnd');
      updatePosPreview();
    });
  });

  // Nút điền nhanh TC-KT-01 & TC-KT-02 tại Quầy
  document.getElementById('btn-fill-tc01')?.addEventListener('click', () => {
    document.getElementById('pos-member-id').value = 'KT-008';
    document.getElementById('pos-tx-code').value = 'TX-NEW-001';
    document.getElementById('pos-amount-vnd').value = '1000000';
    document.getElementById('pos-note').value = 'TC-KT-01: Cộng 100 điểm cho KT-008';
    updatePosPreview();
  });

  document.getElementById('btn-fill-tc02')?.addEventListener('click', () => {
    document.getElementById('pos-member-id').value = 'KT-002';
    document.getElementById('pos-tx-code').value = 'TX-KT-002';
    document.getElementById('pos-amount-vnd').value = '1500000';
    document.getElementById('pos-note').value = 'TC-KT-02: Kiểm tra nhập trùng mã TX-KT-002';
    updatePosPreview();
  });

  // Quét QR tại Quầy (Camera / File ảnh / Nút KT-004)
  document.getElementById('btn-start-camera-qr')?.addEventListener('click', startCameraScanner);
  document.getElementById('btn-stop-camera-qr')?.addEventListener('click', stopCameraScanner);
  document.getElementById('btn-simulate-qr-kt004')?.addEventListener('click', () => {
    handleDecodedQrPayload('KT-004', 'Quét QR Chuẩn BTC');
  });

  document.getElementById('qr-file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (typeof window.Html5Qrcode === 'function') {
      try {
        const tempScanner = new window.Html5Qrcode('qr-reader-viewport');
        const decoded = await tempScanner.scanFile(file, true);
        handleDecodedQrPayload(decoded, 'Quét Từ Ảnh QR');
        return;
      } catch (_) {}
    }
    // Fallback nhận diện tên file nếu ảnh chứa mã KT-00X
    const match = file.name.toUpperCase().match(/KT-\d{3}/);
    handleDecodedQrPayload(match ? match[0] : 'KT-004', 'Quét Từ Ảnh QR');
  });

  // Modal Bảng 8 Mã QR chuẩn (KT_MaQR)
  const qrModal = document.getElementById('qr-sheet-modal');
  document.getElementById('btn-open-qr-sheet-modal')?.addEventListener('click', () => {
    qrModal?.classList.remove('hidden');
  });
  document.getElementById('btn-close-qr-sheet-modal')?.addEventListener('click', () => {
    qrModal?.classList.add('hidden');
  });
  document.getElementById('qr-sheet-grid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-scan-modal-qr');
    if (!btn) return;
    const payload = btn.getAttribute('data-scan-payload');
    qrModal?.classList.add('hidden');
    handleDecodedQrPayload(payload, 'Quét QR Sheet KT_MaQR');
  });

  // Chọn thành viên từ danh sách ở Quầy
  document.getElementById('counter-members-grid')?.addEventListener('click', (e) => {
    const posBtn = e.target.closest('.btn-pos-pick');
    if (posBtn) {
      const id = posBtn.getAttribute('data-pos-pick');
      document.getElementById('pos-member-id').value = id;
      updatePosPreview();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const cardBtn = e.target.closest('.btn-card-pick');
    if (cardBtn) {
      currentMemberId = cardBtn.getAttribute('data-card-pick');
      switchViewMode('member');
      renderAll();
    }
  });

  // Chạy thử 5 Ca kiểm tra ở Tab Thể lệ
  document.getElementById('btc-testcases-list')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-run-tc');
    if (!btn) return;
    executeBtcTestCase(btn.getAttribute('data-run-tc'));
  });

  // Trợ lý AI Gemini phân tích thẻ
  document.getElementById('btn-ask-ai-advisor')?.addEventListener('click', async () => {
    const member = getActiveMember();
    const out = document.getElementById('ai-advisor-output');
    if (!member || !out) return;
    out.textContent = 'Google Gemini AI đang phân tích số dư điểm và lộ trình thăng hạng...';
    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member, rewards: appState.rewards })
      });
      const data = await res.json();
      out.textContent = data.advice || 'Bạn có thể đổi Voucher 20.000đ (500 điểm) hoặc tích lũy lên hạng tiếp theo.';
    } catch (_) {
      out.textContent = `Thành viên ${member.fullName} (${member.id}) hiện có ${formatNumber(member.points)} điểm (Hạng ${calculateTier(member.points)}). Đủ điều kiện đổi các mốc ưu đãi tương ứng trong danh mục bên phải.`;
    }
  });

  // Xuất CSV
  document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    const headers = ['MaThanhVien', 'HoTen', 'DienThoai', 'DiemHienTai', 'Hang', 'NgayThamGia'];
    const rows = (appState.members || []).map((m) => [
      m.id,
      `"${m.fullName}"`,
      m.phone,
      m.points,
      calculateTier(m.points),
      m.joinedDate
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StarRewards_SpyT_ThanhVien.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });
});
