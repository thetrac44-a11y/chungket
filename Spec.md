# Spec: Website chuẩn SEO, tải nhanh, dễ dùng trên web và mobile

Phiên bản 1.0 · 17/11/2026 · Dùng để đọc cùng khi lên plan

## 1. Mục tiêu và phạm vi

**Mục tiêu:** xây dựng website đạt chuẩn SEO kỹ thuật, tải nhanh và dễ dùng trên cả máy tính lẫn điện thoại, theo hướng mobile-first.

**Trong phạm vi:** cấu trúc HTML, metadata, dữ liệu có cấu trúc, hiệu năng, giao diện responsive, khả năng truy cập, quy trình kiểm thử.

**Ngoài phạm vi (chốt lại khi lên plan):** chiến dịch backlink, quảng cáo trả phí, viết nội dung hàng loạt, đa ngôn ngữ.

**Cách dùng file này:** mỗi yêu cầu có mã (ví dụ SEO-03) để gắn vào task trong plan. Cột ưu tiên: **P0** bắt buộc trước khi ra mắt, **P1** nên có, **P2** làm sau.

## 2. Chỉ tiêu nghiệm thu tổng thể

| Chỉ tiêu | Mục tiêu | Công cụ đo |
| --- | --- | --- |
| LCP (thời gian hiện nội dung lớn nhất) | dưới 2,5 giây | PageSpeed Insights, Search Console |
| INP (độ phản hồi khi tương tác) | dưới 200 ms | PageSpeed Insights, Search Console |
| CLS (độ ổn định bố cục) | dưới 0,1 | Lighthouse |
| Lighthouse Performance (mobile) | từ 90 điểm | Lighthouse |
| Lighthouse SEO | 100 điểm | Lighthouse |
| Lighthouse Accessibility | từ 90 điểm | Lighthouse |
| Lighthouse Best Practices | từ 90 điểm | Lighthouse |
| Trang được Google lập chỉ mục | 100% trang cần index | Search Console |

## 3. Yêu cầu SEO kỹ thuật

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| SEO-01 | Toàn site chạy HTTPS, tự chuyển hướng 301 từ HTTP và từ bản www/không www về một bản duy nhất | Không còn lỗi mixed content, chỉ có một phiên bản domain | P0 |
| SEO-02 | Mỗi trang có đúng 1 thẻ `<h1>`, các mục con dùng `<h2>`, `<h3>` theo thứ tự | Không nhảy cấp, không trùng H1 giữa các trang | P0 |
| SEO-03 | Dùng thẻ ngữ nghĩa: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` | Lighthouse và trình kiểm tra HTML không báo lỗi cấu trúc | P0 |
| SEO-04 | Mỗi trang có `<title>` riêng, 50–60 ký tự, chứa từ khóa chính | Không trùng title giữa các trang | P0 |
| SEO-05 | Mỗi trang có meta description riêng, 140–160 ký tự | Không trùng, có lời kêu gọi hành động | P0 |
| SEO-06 | URL ngắn, không dấu, dùng dấu gạch ngang, ví dụ `/hosting-gia-re` | Không có tham số thừa, không ký tự đặc biệt | P0 |
| SEO-07 | Thẻ `rel="canonical"` trên mọi trang | Canonical trỏ đúng URL chuẩn | P0 |
| SEO-08 | Có `sitemap.xml` tự động cập nhật và `robots.txt` đúng | Đã gửi sitemap trong Search Console | P0 |
| SEO-09 | Dữ liệu có cấu trúc JSON-LD: Organization, WebSite, BreadcrumbList; thêm Article, Product hoặc FAQ tùy loại trang | Qua Rich Results Test không lỗi | P1 |
| SEO-10 | Open Graph và Twitter Card (title, description, ảnh 1200x630) | Xem trước chia sẻ đúng trên Facebook, Zalo | P1 |
| SEO-11 | Thẻ `alt` mô tả cho mọi ảnh có nội dung | Không còn ảnh thiếu alt | P0 |
| SEO-12 | Liên kết nội bộ hợp lý, có breadcrumb, không có trang mồ côi | Mọi trang cách trang chủ tối đa 3 lần bấm | P1 |
| SEO-13 | Trang 404 thân thiện, trả về đúng mã 404 | Có link về trang chủ và ô tìm kiếm | P1 |
| SEO-14 | Thẻ `lang="vi"` trên `<html>` (và `hreflang` nếu có nhiều ngôn ngữ) | Khai báo đúng ngôn ngữ | P0 |

## 4. Yêu cầu hiệu năng

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| PERF-01 | Ảnh dùng WebP hoặc AVIF, có nhiều kích thước (`srcset`), nén hợp lý | Không ảnh nào quá 200 KB trên mobile (trừ ảnh hero đặc biệt) | P0 |
| PERF-02 | Khai báo `width` và `height` (hoặc `aspect-ratio`) cho ảnh, video, iframe | CLS dưới 0,1 | P0 |
| PERF-03 | `loading="lazy"` cho ảnh dưới màn hình đầu; ảnh LCP thì **không** lazy và ưu tiên tải (`fetchpriority="high"`) | LCP dưới 2,5 giây | P0 |
| PERF-04 | Minify CSS, JS; bỏ code và thư viện không dùng; script dùng `defer` hoặc `async` | Không có tài nguyên chặn render không cần thiết | P0 |
| PERF-05 | CSS quan trọng (critical CSS) viết inline cho phần nhìn thấy đầu tiên | First Contentful Paint dưới 1,8 giây | P1 |
| PERF-06 | Bật nén Brotli hoặc gzip, HTTP/2 hoặc HTTP/3 | Header phản hồi xác nhận | P0 |
| PERF-07 | Cache trình duyệt cho tài nguyên tĩnh (header `Cache-Control`), dùng CDN | Tài nguyên tĩnh có thời hạn cache dài, tên file có hash | P0 |
| PERF-08 | Font: `font-display: swap`, chỉ tải weight cần dùng, subset tiếng Việt, ưu tiên WOFF2 | Không bị nháy chữ hoặc chữ lỗi dấu | P1 |
| PERF-09 | Giảm script bên thứ ba (chat, tracking, mạng xã hội); tải trễ khi có thể | Tổng thời gian chặn luồng chính (TBT) dưới 200 ms | P1 |
| PERF-10 | Thời gian phản hồi máy chủ (TTFB) dưới 600 ms; hosting đặt tại Việt Nam hoặc Singapore | Đo bằng PageSpeed hoặc WebPageTest | P0 |
| PERF-11 | Dùng `preconnect` cho domain bắt buộc (font, CDN), `preload` cho tài nguyên LCP | Không dùng thừa gây chậm | P2 |

## 5. Yêu cầu mobile và trải nghiệm người dùng

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| UX-01 | Thẻ viewport: `width=device-width, initial-scale=1` | Mobile-friendly, không phải zoom | P0 |
| UX-02 | Thiết kế mobile-first, bố cục flexbox hoặc grid, đơn vị tương đối (`rem`, `%`) | Hiển thị tốt từ 320 px đến màn hình desktop | P0 |
| UX-03 | Cỡ chữ nội dung tối thiểu 16 px, độ cao dòng khoảng 1,5 | Đọc được không cần zoom | P0 |
| UX-04 | Vùng chạm (nút, link) tối thiểu khoảng 44x44 px, cách nhau đủ xa | Không bấm nhầm trên điện thoại | P0 |
| UX-05 | Menu gọn (hamburger) trên mobile; nút CTA nổi bật, dễ chạm bằng một tay | CTA chính nằm trong màn hình đầu tiên | P0 |
| UX-06 | Không dùng popup che toàn màn hình khi mới vào trang | Không bị Google phạt interstitial | P0 |
| UX-07 | Form ngắn gọn, đúng kiểu input (`tel`, `email`, `number`), có nhãn rõ, báo lỗi dễ hiểu | Hiện đúng bàn phím trên điện thoại | P0 |
| UX-08 | Không cuộn ngang; bảng rộng cuộn trong khung riêng | Kiểm tra trên các cỡ màn hình phổ biến | P0 |
| UX-09 | Hỗ trợ chế độ sáng và tối (tùy chọn) | Màu và độ tương phản đạt chuẩn ở cả hai chế độ | P2 |
| UX-10 | Có trạng thái tải (loading), trạng thái lỗi, trạng thái rỗng rõ ràng | Người dùng luôn biết hệ thống đang làm gì | P1 |

## 6. Yêu cầu khả năng truy cập (Accessibility)

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| A11Y-01 | Độ tương phản chữ và nền tối thiểu 4,5:1 | Lighthouse không báo lỗi contrast | P0 |
| A11Y-02 | Điều hướng được hoàn toàn bằng bàn phím, có viền focus nhìn thấy | Tab qua toàn bộ phần tử tương tác theo thứ tự hợp lý | P1 |
| A11Y-03 | Nút và link có tên rõ ràng (không dùng "bấm vào đây"), icon có `aria-label` | Trình đọc màn hình đọc đúng | P1 |
| A11Y-04 | Mọi ô nhập có `<label>` đi kèm | Không còn input thiếu nhãn | P0 |

## 7. Yêu cầu nội dung

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| CON-01 | Mỗi trang nhắm đúng một ý định tìm kiếm (search intent) | Có bảng ánh xạ trang và từ khóa chính | P0 |
| CON-02 | Từ khóa chính nằm trong title, H1, đoạn đầu và URL; từ khóa phụ rải tự nhiên | Không nhồi nhét từ khóa | P0 |
| CON-03 | Nội dung hữu ích, độc nhất, theo tiêu chí E-E-A-T | Có tác giả, nguồn, ngày cập nhật khi cần | P1 |
| CON-04 | Có trang Giới thiệu, Liên hệ, Chính sách bảo mật, Điều khoản | Footer có đủ liên kết | P0 |
| CON-05 | Đoạn văn ngắn, có tiêu đề phụ, danh sách, bảng để dễ đọc trên mobile | Không có khối chữ dài quá 4–5 dòng trên mobile | P1 |

## 8. Kiểm thử và nghiệm thu

**Công cụ:** Lighthouse (DevTools), PageSpeed Insights, Google Search Console, Rich Results Test, chế độ giả lập thiết bị trong DevTools, và thử trên ít nhất 1 điện thoại Android và 1 iPhone thật.

**Quy trình:**

1. Chạy Lighthouse bản mobile cho từng loại trang (trang chủ, trang danh mục, trang chi tiết, trang form).
2. Kiểm tra schema bằng Rich Results Test.
3. Gửi sitemap, kiểm tra trạng thái index trong Search Console.
4. Đo lại Core Web Vitals sau 28 ngày bằng dữ liệu thực tế (field data).

**Điều kiện ra mắt:** tất cả yêu cầu P0 đạt; Lighthouse mobile đạt ngưỡng ở mục 2.

## 9. Gợi ý thứ tự khi lên plan

| Giai đoạn | Nội dung | Mã yêu cầu liên quan |
| --- | --- | --- |
| 1. Nền tảng | Hosting, HTTPS, khung HTML ngữ nghĩa, viewport, responsive cơ bản | SEO-01, 02, 03, 14, UX-01, 02, PERF-06, 10 |
| 2. Metadata và cấu trúc | Title, description, URL, canonical, sitemap, robots, alt | SEO-04 đến 08, 11 |
| 3. Hiệu năng | Ảnh, CSS/JS, cache, CDN, font | PERF-01 đến 08 |
| 4. Giao diện và UX | Chữ, vùng chạm, menu, form, CTA, accessibility | UX-03 đến 08, A11Y-01, 04 |
| 5. Nội dung và schema | Trang bắt buộc, nội dung theo từ khóa, JSON-LD, Open Graph | CON-01 đến 05, SEO-09, 10 |
| 6. Kiểm thử và ra mắt | Lighthouse, Search Console, thử thiết bị thật, sửa lỗi | Mục 8 |
| 7. Tối ưu sau ra mắt | Theo dõi Core Web Vitals, giảm script thứ ba, bổ sung P1 và P2 | PERF-09, 11, UX-09, 10 |

## 10. Thông tin cần chốt trước khi lên plan

- Website làm bằng gì: WordPress, Next.js/React, HTML thuần hay công cụ khác?
- Lĩnh vực và đối tượng người dùng chính là ai?
- Số lượng và loại trang dự kiến (trang chủ, danh mục, bài viết, sản phẩm, form...)?
- Danh sách từ khóa mục tiêu và đối thủ cần so sánh?
- Hosting, domain, CDN đã có sẵn chưa; ngân sách là bao nhiêu?
- Có cần đa ngôn ngữ, tích hợp thanh toán, đăng nhập, chat hoặc tracking không?
- Mốc thời gian ra mắt và người chịu trách nhiệm từng phần?

## 11. Yêu cầu khi dùng cho mục đích thương mại

Giả định: website là sản phẩm kinh doanh (giới thiệu dịch vụ, nhận đơn, có thể bán hàng hoặc thu tiền online). Các mục có chữ "nếu có bán hàng" chỉ áp dụng khi website có giao dịch.

| Mã | Yêu cầu | Tiêu chí nghiệm thu | Ưu tiên |
| --- | --- | --- | --- |
| COM-01 | Mọi font, ảnh, icon, video, theme/template phải có giấy phép cho phép dùng thương mại | Có bảng kê tài nguyên: nguồn, loại giấy phép, ngày tải | P0 |
| COM-02 | Kiểm tra giấy phép thư viện mã nguồn (MIT, Apache, GPL...) có tương thích với việc dùng thương mại, ghi nhận attribution nếu bắt buộc | Có danh sách thư viện và giấy phép kèm theo | P0 |
| COM-03 | Thông tin chủ sở hữu rõ ràng ở footer và trang Giới thiệu: tên đơn vị, địa chỉ, mã số thuế, liên hệ | Hiển thị đủ trên mọi trang | P0 |
| COM-04 | Chính sách bảo mật và thu thập dữ liệu cá nhân: nêu mục đích, có sự đồng ý của người dùng, có banner cookie gọn (không che màn hình, theo UX-06) | Form thu dữ liệu có checkbox đồng ý và link chính sách | P0 |
| COM-05 | Điều khoản sử dụng; nếu có bán hàng: chính sách đổi trả, hoàn tiền, vận chuyển, thanh toán | Có trang riêng, link ở footer và ở bước đặt hàng | P0 |
| COM-06 | Nếu có bán hàng hoặc đặt dịch vụ online: rà soát nghĩa vụ thông báo hoặc đăng ký website với Bộ Công Thương theo quy định thương mại điện tử hiện hành | Có kết luận bằng văn bản của người phụ trách pháp lý | P0 |
| COM-07 | Nếu có thu tiền: dùng cổng thanh toán bên thứ ba đạt chuẩn, không tự lưu số thẻ | Không có dữ liệu thẻ trên máy chủ của site | P0 |
| COM-08 | Liên kết tiếp thị hoặc quảng cáo gắn nhãn rõ, dùng `rel="sponsored"` | Không có link trả phí không gắn nhãn | P1 |
| COM-09 | Ảnh stock, ảnh và nội dung do AI tạo: kiểm tra quyền sử dụng thương mại, không vi phạm nhãn hiệu hay hình ảnh người thật | Có ghi chú nguồn và điều khoản của công cụ tạo | P1 |
| COM-10 | Script analytics, quảng cáo chỉ chạy sau khi người dùng đồng ý cookie và không làm vượt ngưỡng PERF-09 | Kiểm tra bằng DevTools trước và sau khi đồng ý | P1 |
| COM-11 | Sao lưu định kỳ, giám sát uptime, hosting có cam kết dịch vụ phù hợp | Có lịch backup và cảnh báo khi site sập | P1 |

**Lưu ý pháp lý:** Luật Thương mại điện tử 2025 có hiệu lực từ 01/7/2026, và các nghị định cũ (52/2013, 85/2021) đã được thay thế theo nguồn tôi tra cứu. Cần đối chiếu văn bản hiện hành hoặc hỏi luật sư trước khi ra mắt; phần này chỉ là danh mục để đưa vào plan, không phải tư vấn pháp lý.
