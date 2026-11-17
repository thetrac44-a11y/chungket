# StarRewards SpyT — Hệ Thống Thẻ Thành Viên 2 Đầu (Thành Viên & Quầy)

> Sản phẩm dự thi Vòng Chung Kết **Vibe Coding 2026** — Đội thi **SpyT** (Bảng A — Kỹ thuật).

## 1. Thông tin chung

| Hạng mục | Nội dung |
|---|---|
| Tên đội thi | **SpyT** |
| Bảng thi | Bảng A — Kỹ thuật |
| Đề bài | **Hệ Thống Thẻ Thành Viên 2 Đầu (Thành Viên & Quầy)** — Mô hình Starbucks Rewards |
| Source Code & ZIP | Repo: `https://github.com/thetrac44-a11y/chungket` — Tải ZIP: `https://github.com/thetrac44-a11y/chungket/archive/refs/heads/main.zip` |
| Tỉ lệ quy đổi điểm công bố | **10.000đ = 1 điểm** |
| Ngưỡng 03 hạng thành viên | **Đồng**: `0 – 999 điểm` · **Bạc**: `1.000 – 4.999 điểm` · **Vàng**: `Từ 5.000 điểm trở lên` |
| Mã QR tham chiếu chuẩn BTC | **`KT-004`** (Dũng Phạm — 3.200 điểm — Hạng Bạc) |

## 2. Hoàn thành đầy đủ Yêu cầu phần lõi & Phần mở rộng (+4 điểm thưởng QR)

1. **Đăng ký thành viên mới (`Chế độ Thành Viên`)**:
   - Nhập Họ tên và Số điện thoại (kiểm tra hợp lệ 10 chữ số và chống trùng SĐT).
   - Hệ thống tự động sinh mã thành viên duy nhất (`KT-009`, `KT-010`...) và hiển thị ngay trên thẻ thành viên kèm mã QR động.
2. **Hệ thống Điểm & 03 Hạng (Đồng / Bạc / Vàng)**:
   - Công bố rõ trong ứng dụng: **Đồng (`0 – 999 điểm`)**, **Bạc (`1.000 – 4.999 điểm`)**, **Vàng (`>= 5.000 điểm`)**.
   - Thẻ thành viên tự động đổi màu nền Gradient theo hạng (`Đồng` / `Bạc` / `Vàng`) kèm thanh tiến trình lên hạng tiếp theo và hiệu ứng chuyển động khi cộng điểm / thăng hạng.
3. **Chế độ Quầy (`2. Chế Độ Quầy POS & QR` — Chuyển vai 1 chạm ngay trên thanh điều hướng)**:
   - Nhập `Mã thành viên`, `Mã giao dịch` và `Số tiền thanh toán (VNĐ)`.
   - Tự động quy đổi theo tỉ lệ **`10.000đ = 1 điểm`**, cập nhật ngay lập tức số dư điểm và hạng của thành viên.
4. **Điểm thưởng QR (+4 điểm thưởng Bảng Kỹ thuật)**:
   - Hiển thị mã QR trực tiếp trên thẻ thành viên (nội dung giải mã `Payload` trùng khớp 100% với `MaThanhVien`, chuẩn `KT-004`).
   - Tại **Chế độ Quầy**, hỗ trợ **Quét mã QR bằng Camera trình duyệt (`html5-qrcode`)**, **Chọn file ảnh QR từ máy**, hoặc **Mở bảng 8 mã QR chuẩn (`Sheet KT_MaQR`)** để nạp ngay mã thành viên vào ô cộng điểm và mở hồ sơ `KT-004 (Dũng Phạm)`.
5. **Chống cộng trùng mã giao dịch (`TC-KT-02`)**:
   - Mỗi `Mã giao dịch` (`TX-KT-001`..`TX-KT-007`, `TX-NEW-001`...) chỉ được cộng điểm duy nhất **01 lần**. Nếu nhập lại mã giao dịch đã có trong sổ (ví dụ `TX-KT-002`), hệ thống báo lỗi rõ ràng và tuyệt đối không cộng điểm trùng.
6. **Đổi điểm lấy ưu đãi & Ví ưu đãi cá nhân (`TC-KT-03` & `TC-KT-04`)**:
   - Tích hợp đầy đủ 03 mức ưu đãi từ sheet `KT_UuDai`:
     - `KT-VCH-01`: **Voucher 20.000đ** (`500 điểm`)
     - `KT-VCH-02`: **Voucher 50.000đ** (`1.100 điểm`)
     - `KT-VCH-03`: **Quà tặng đặc biệt** (`2.000 điểm`)
   - Khi đủ điểm (`TC-KT-03`): trừ đúng số điểm, tạo mã Voucher mới lưu vào **Ví Ưu Đãi** của thành viên. Khi thiếu điểm (`TC-KT-04`): từ chối đổi và giữ nguyên số dư.
7. **Lịch sử biến động điểm (`Sheet KT_LichSuDiem`)**:
   - Ghi nhận đầy đủ Loại biến động (`Cộng điểm` / `Đổi điểm`), mã giao dịch, số điểm thay đổi (`+/-`), số dư sau biến động và thời gian thực hiện.
8. **Nút `"Nạp Dữ Liệu Mẫu BTC"`**:
   - Khôi phục tức thì toàn bộ dữ liệu gốc từ file `Du_lieu_mau_Vibe_Coding_bangA.xlsx` (8 thành viên `KT-001`..`KT-008`, 7 giao dịch mẫu `TX-KT-001`..`TX-KT-007`, 3 ưu đãi `KT-VCH-01`..`KT-VCH-03`). Điểm hiện tại đã tính đến giao dịch mẫu, không cộng lặp khi nạp.

## 3. Công nghệ sử dụng & Lưu trữ Offline / Cloud

- **Giao diện**: HTML5 ngữ nghĩa chuẩn SEO (` Spec.md `), Tailwind CSS, JavaScript ES6+ thuần, thiết kế Mobile-First hiển thị trọn vẹn trên khung `360–390 px` (không cuộn ngang, vùng chạm `>= 44px`).
- **Mã QR & Thiết bị ngoại vi**: `qrcode-generator` (tạo SVG QR hoạt động cả khi mất mạng) và `html5-qrcode` (quét QR bằng Camera thực tế hoặc từ file ảnh).
- **Lưu trữ**: Lưu trữ toàn bộ trong `localStorage` (`spyt_loyalty_state_v1`) đảm bảo **chạy 100% khi mất mạng**, đồng thời tự động đồng bộ lên Backend Node.js/Express & Cloud SQL **Supabase PostgreSQL** khi có mạng.
- **Trợ lý AI**: Tích hợp **Google Gemini (`gemini-2.5-flash`)** qua Backend Proxy (`/api/ai-advisor`) kèm cơ chế Fallback tự động để tư vấn đổi ưu đãi và lộ trình thăng hạng cho từng thành viên.

## 4. Hướng dẫn cài đặt và chạy

### Cách 1: Chạy trực tiếp giao diện tĩnh (Offline 100% với `localStorage`)
- Mở trực tiếp file `public/index.html` trên trình duyệt (hoặc dùng Live Server). Toàn bộ chức năng Nạp dữ liệu mẫu, Đăng ký, Cộng điểm, Chống trùng, Đổi ưu đãi, Ví ưu đãi, Lịch sử và Tạo/Quét QR đều hoạt động đầy đủ qua `localStorage`.

### Cách 2: Chạy Full-stack Server (Node.js + Express + Gemini AI + Supabase)
```bash
npm install
npm start
```
- Mở trình duyệt tại: `http://localhost:3000`

## 5. Bảng kiểm thử thực tế (Khớp `Sheet KT_CaKiemTra` của BTC)

| Mã ca | Tình huống | Thành viên | Mã GD / Ưu đãi | Dữ liệu đầu vào | Kết quả thực tế trên ứng dụng | Đạt/Chưa đạt |
|---|---|---|---|---|---|---|
| **TC-KT-01** | Cộng điểm mới | `KT-008` (Phúc Hoàng) | `TX-NEW-001` | Giá trị `1.000.000đ` (`10.000đ = 1 điểm`) | Cộng đúng `+100 điểm` một lần, số dư của `KT-008` tăng từ `0` lên `100 điểm`. | **Đạt** |
| **TC-KT-02** | Nhập lại giao dịch | `KT-002` (Bình Trần) | `TX-KT-002` | Giá trị `1.500.000đ` (Mã đã có trong sổ) | Hệ thống báo lỗi trùng mã giao dịch `TX-KT-002`, không cộng thêm 150 điểm (giữ nguyên `1.450 điểm`). | **Đạt** |
| **TC-KT-03** | Đổi ưu đãi đủ điểm | `KT-005` (Hà Võ) | `KT-VCH-01` | Đổi `Voucher 20.000đ` (`500 điểm`) | Tạo voucher mới trong Ví Ưu Đãi của `KT-005`, số dư giảm từ `5.800` còn `5.300 điểm`. | **Đạt** |
| **TC-KT-04** | Đổi ưu đãi thiếu điểm | `KT-008` (Phúc Hoàng) | `KT-VCH-01` | Đổi `Voucher 20.000đ` (`500 điểm` khi đang có `0đ`) | Hệ thống từ chối đổi, hiện cảnh báo thiếu điểm, số dư vẫn giữ nguyên là `0 điểm`. | **Đạt** |
| **TC-KT-05** | Quét QR chuẩn của BTC | `KT-004` (Dũng Phạm) | `KT-004` | Payload QR: `KT-004` | Đọc đúng mã `KT-004`, tự động điền mã vào Quầy và mở đúng hồ sơ `Dũng Phạm` (`3.200 điểm`, hạng `Bạc`). | **Đạt** |
