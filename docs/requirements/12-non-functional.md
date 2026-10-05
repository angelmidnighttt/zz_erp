# 12 · Yêu cầu phi chức năng / Non-functional Requirements (NFR)

[← Mục lục / Index](../README.md)

---

> Các giá trị định lượng dưới đây dựa trên giả định `A-03` (≈ 300 người dùng, tối đa 100 đồng thời) và cần được xác nhận.
> The quantitative targets below assume `A-03` (≈ 300 users, up to 100 concurrent) and must be confirmed.

## 1. Hiệu năng / Performance (PERF)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-PERF-001 | 95% thao tác mở màn hình, lưu chứng từ phản hồi ≤ 2 giây. | 95% of screen loads and document saves respond in ≤ 2 s. | Must |
| NFR-PERF-002 | Tìm kiếm, lọc danh sách có phân trang trên bảng 1 triệu bản ghi phản hồi ≤ 1 giây. | Paginated list search / filter on a 1-million-row table responds in ≤ 1 s. | Must |
| NFR-PERF-003 | Báo cáo dữ liệu một tháng hiển thị ≤ 10 giây; báo cáo cả năm ≤ 30 giây, hoặc chạy nền và thông báo khi xong. | One-month reports render in ≤ 10 s; full-year reports in ≤ 30 s, or run in the background with a notification. | Must |
| NFR-PERF-004 | Tính giá xuất kho cuối kỳ cho 100.000 dòng xuất kho hoàn thành ≤ 10 phút. | Period-end costing for 100,000 issue lines completes in ≤ 10 min. | Should |
| NFR-PERF-005 | Hệ thống phục vụ 100 người dùng đồng thời mà không vi phạm các ngưỡng trên. | The system serves 100 concurrent users without breaching the targets above. | Must |

## 2. Khả năng mở rộng / Scalability (SCL)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-SCL-001 | Kiến trúc cho phép mở rộng ngang tầng ứng dụng (nhiều instance, không lưu trạng thái phiên trên máy chủ). | The application tier scales horizontally (multiple stateless instances). | Must |
| NFR-SCL-002 | Đáp ứng dữ liệu 10 năm với ước tính 2 triệu dòng chứng từ / năm mà không suy giảm hiệu năng đáng kể. | Handle 10 years of data at ~2 million document lines / year without significant degradation. | Should |
| NFR-SCL-003 | Hỗ trợ nhiều công ty trên cùng một hệ thống với dữ liệu tách biệt. | Support multiple companies on one system with segregated data. | Must |

## 3. Tính sẵn sàng & phục hồi / Availability & recovery (AVL)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-AVL-001 | Thời gian hoạt động ≥ 99,5% / tháng (không tính bảo trì có kế hoạch). | Uptime ≥ 99.5% per month (excluding planned maintenance). | Must |
| NFR-AVL-002 | Bảo trì có kế hoạch ngoài giờ làm việc, thông báo trước ≥ 48 giờ. | Planned maintenance outside business hours with ≥ 48 h notice. | Must |
| NFR-AVL-003 | Mục tiêu điểm khôi phục (RPO) ≤ 1 giờ; thời gian khôi phục (RTO) ≤ 4 giờ. | Recovery point objective (RPO) ≤ 1 h; recovery time objective (RTO) ≤ 4 h. | Must |
| NFR-AVL-004 | Sao lưu đầy đủ hằng ngày kèm sao lưu liên tục nhật ký giao dịch; bản sao lưu lưu ở vị trí địa lý khác, mã hóa, giữ ≥ 30 ngày. | Daily full backups plus continuous transaction-log backup; copies stored off-site, encrypted, kept ≥ 30 days. | Must |
| NFR-AVL-005 | Kiểm thử khôi phục từ bản sao lưu ít nhất mỗi quý. | Test restoring from backup at least quarterly. | Must |

## 4. Bảo mật / Security (SEC)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-SEC-001 | Mọi kết nối dùng HTTPS (TLS 1.2 trở lên); bật HSTS. | All traffic uses HTTPS (TLS 1.2+); HSTS enabled. | Must |
| NFR-SEC-002 | Mật khẩu băm bằng thuật toán chuyên dụng (bcrypt / Argon2); không lưu mật khẩu dạng có thể giải mã. | Passwords hashed with a dedicated algorithm (bcrypt / Argon2); never stored reversibly. | Must |
| NFR-SEC-003 | Access token sống ngắn (≤ 15 phút), refresh token xoay vòng, lưu trong cookie httpOnly, Secure, SameSite. | Short-lived access tokens (≤ 15 min), rotating refresh tokens stored in httpOnly, Secure, SameSite cookies. | Must |
| NFR-SEC-004 | Phân quyền kiểm tra ở máy chủ cho mọi API, kể cả phạm vi dữ liệu; không tin dữ liệu phía client. | Authorization, including data scope, is enforced server-side on every API; client data is never trusted. | Must |
| NFR-SEC-005 | Phòng chống các lỗ hổng phổ biến theo OWASP Top 10 / ASVS mức 2: kiểm tra đầu vào, chống SQL injection, XSS, CSRF, IDOR. | Mitigate common vulnerabilities per OWASP Top 10 / ASVS level 2: input validation, SQL injection, XSS, CSRF, IDOR. | Must |
| NFR-SEC-006 | Giới hạn tần suất truy cập, đặc biệt với đăng nhập và API công khai. | Rate limiting, especially on login and public APIs. | Must |
| NFR-SEC-007 | Mã hóa dữ liệu lưu trữ (cơ sở dữ liệu, bản sao lưu, tệp); bí mật (khóa, mật khẩu kết nối) quản lý trong kho bí mật, không nằm trong mã nguồn. | Encrypt data at rest (database, backups, files); secrets (keys, connection passwords) kept in a secrets manager, never in source code. | Must |
| NFR-SEC-008 | Quét lỗ hổng thư viện phụ thuộc tự động trong CI; kiểm thử xâm nhập độc lập trước khi go-live. | Automated dependency vulnerability scanning in CI; independent penetration test before go-live. | Must |
| NFR-SEC-009 | Tài khoản cơ sở dữ liệu của ứng dụng chỉ có quyền tối thiểu cần thiết. | The application's database account has least-privilege rights. | Must |

## 5. Bảo vệ dữ liệu cá nhân & tuân thủ / Privacy & compliance (PRV)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-PRV-001 | Tuân thủ Luật Bảo vệ dữ liệu cá nhân và các văn bản hướng dẫn: xác định mục đích xử lý, thu thập tối thiểu, có cơ chế đồng ý khi cần. | Comply with the Personal Data Protection Law and its guiding regulations: defined processing purposes, data minimization, consent where required. | Must |
| NFR-PRV-002 | Che một phần dữ liệu nhạy cảm trên giao diện (số định danh, số tài khoản, lương) với người không có quyền; ghi nhật ký truy cập dữ liệu nhạy cảm. | Mask sensitive data in the UI (ID numbers, bank accounts, salary) for unauthorized users; log access to sensitive data. | Must |
| NFR-PRV-003 | Hỗ trợ yêu cầu của chủ thể dữ liệu: xem, chỉnh sửa, xuất dữ liệu; xóa hoặc ẩn danh hóa khi pháp luật cho phép (không xóa dữ liệu kế toán còn trong thời hạn lưu trữ). | Support data-subject requests: access, correction, export; deletion or anonymization where legally allowed (accounting data within its retention period is kept). | Should |
| NFR-PRV-004 | Có quy trình phát hiện và thông báo sự cố lộ lọt dữ liệu cá nhân trong thời hạn theo quy định. | A process exists to detect and report personal-data breaches within the legally required deadline. | Must |
| NFR-PRV-005 | Lưu trữ dữ liệu và chứng từ kế toán ≥ 10 năm theo Luật Kế toán. | Retain accounting data and documents ≥ 10 years per the Law on Accounting. | Must |
| NFR-PRV-006 | Đánh giá yêu cầu lưu trữ dữ liệu tại Việt Nam theo pháp luật an ninh mạng trước khi chọn nơi đặt hạ tầng. | Assess Vietnamese data-localization requirements under cybersecurity law before choosing hosting location. | Must |

## 6. Khả năng sử dụng / Usability (USA)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-USA-001 | Hỗ trợ 2 phiên bản mới nhất của Chrome, Edge, Firefox, Safari. | Support the latest 2 versions of Chrome, Edge, Firefox, Safari. | Must |
| NFR-USA-002 | Giao diện tối ưu cho máy tính; dùng được trên máy tính bảng; các chức năng duyệt chứng từ, tra cứu tồn kho, công nợ, cổng nhân viên dùng tốt trên điện thoại. | Desktop-optimized UI; usable on tablets; approvals, stock and balance lookups and the employee portal work well on phones. | Must |
| NFR-USA-003 | Hỗ trợ nhập liệu nhanh bằng bàn phím (Tab, Enter thêm dòng, phím tắt lưu / duyệt) trên các màn hình chứng từ. | Keyboard-driven fast entry (Tab, Enter adds line, shortcuts for save / approve) on document screens. | Must |
| NFR-USA-004 | Thông báo lỗi rõ ràng, theo ngôn ngữ người dùng, chỉ ra trường bị lỗi và cách sửa. | Clear error messages in the user's language, pointing to the field and how to fix it. | Must |
| NFR-USA-005 | Người dùng mới hoàn thành nghiệp vụ cơ bản của vai trò mình sau ≤ 1 ngày đào tạo. | New users complete their role's core tasks after ≤ 1 day of training. | Should |
| NFR-USA-006 | Đáp ứng WCAG 2.1 mức AA cho các màn hình chính. | Meet WCAG 2.1 level AA on key screens. | Could |

## 7. Bản địa hóa / Localization (L10N)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-L10N-001 | Toàn bộ giao diện, thông báo, mẫu email, mẫu in có bản Tiếng Việt và Tiếng Anh; không gắn cứng chuỗi hiển thị trong mã nguồn. | All UI text, messages, email and print templates exist in Vietnamese and English; no hard-coded display strings. | Must |
| NFR-L10N-002 | Định dạng theo ngôn ngữ: VI `1.234.567,89` và `dd/MM/yyyy`; EN `1,234,567.89`. VND không có phần thập phân. | Locale formats: VI `1.234.567,89` and `dd/MM/yyyy`; EN `1,234,567.89`. VND has no decimals. | Must |
| NFR-L10N-003 | Đọc số tiền bằng chữ tiếng Việt và tiếng Anh, đúng theo từng loại tiền tệ. | Spell out amounts in Vietnamese and English, correct per currency. | Must |
| NFR-L10N-004 | Lưu trữ Unicode chuẩn hóa NFC; tìm kiếm không phân biệt dấu và hoa thường. | Store Unicode normalized to NFC; search is accent- and case-insensitive. | Must |
| NFR-L10N-005 | Lưu thời gian theo UTC, hiển thị theo múi giờ người dùng (mặc định Asia/Ho_Chi_Minh); ngày chứng từ là ngày theo giờ Việt Nam. | Store timestamps in UTC, display in the user's time zone (default Asia/Ho_Chi_Minh); document dates follow Vietnam local date. | Must |

## 8. Dữ liệu & tính toàn vẹn / Data & integrity (DAT)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-DAT-001 | Số tiền, số lượng, tỷ giá lưu bằng kiểu số thập phân chính xác (NUMERIC), không dùng số thực dấu phẩy động. | Amounts, quantities and rates use exact decimal types (NUMERIC), never floating point. | Must |
| NFR-DAT-002 | Nghiệp vụ ghi sổ (chứng từ + tồn kho + bút toán) thực hiện trong một giao dịch cơ sở dữ liệu: thành công toàn bộ hoặc không gì cả. | Posting (document + stock + journal entry) runs in a single database transaction: all or nothing. | Must |
| NFR-DAT-003 | Chống ghi đè khi nhiều người sửa cùng chứng từ (khóa lạc quan theo phiên bản); chống ghi sổ trùng khi bấm nhiều lần. | Prevent lost updates when several users edit the same document (optimistic locking by version); prevent double posting on repeated clicks. | Must |
| NFR-DAT-004 | Công cụ chuyển đổi dữ liệu có kiểm tra, báo cáo đối chiếu số liệu trước và sau chuyển đổi. | Data migration tooling validates data and produces before/after reconciliation reports. | Must |

## 9. Khả năng bảo trì / Maintainability (MNT)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-MNT-001 | Kiến trúc mô-đun (modular monolith) với ranh giới rõ ràng giữa các phân hệ; giao tiếp qua service / sự kiện, không truy cập chéo bảng dữ liệu. | Modular-monolith architecture with clear module boundaries; modules communicate via services / events, not by reading each other's tables. | Must |
| NFR-MNT-002 | Mô hình dữ liệu sản phẩm, kho, giá vốn sẵn sàng để bổ sung phân hệ Sản xuất (BOM, lệnh sản xuất) sau này mà không phải thiết kế lại. | Product, inventory and costing models are ready for a future Manufacturing module (BOM, work orders) without redesign. | Must |
| NFR-MNT-003 | Độ bao phủ kiểm thử tự động ≥ 70% cho tầng nghiệp vụ; kiểm thử tích hợp cho các luồng O2C, P2P, khóa sổ. | Automated test coverage ≥ 70% on business logic; integration tests for O2C, P2P and period close flows. | Should |
| NFR-MNT-004 | CI/CD tự động: build, lint, test, quét bảo mật, triển khai lên môi trường dev / staging / production. | Automated CI/CD: build, lint, test, security scan, deploy to dev / staging / production. | Must |
| NFR-MNT-005 | Thay đổi cấu trúc cơ sở dữ liệu qua migration có phiên bản; không dùng tự động đồng bộ schema trên production. | Database schema changes via versioned migrations; no automatic schema sync in production. | Must |
| NFR-MNT-006 | Tài liệu API (OpenAPI) sinh tự động và luôn cập nhật. | API documentation (OpenAPI) is generated automatically and kept current. | Must |

## 10. Giám sát & vận hành / Observability & operations (OBS)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-OBS-001 | Log có cấu trúc (JSON) kèm mã truy vết theo yêu cầu; không ghi dữ liệu nhạy cảm vào log. | Structured (JSON) logs with per-request correlation IDs; no sensitive data in logs. | Must |
| NFR-OBS-002 | Giám sát chỉ số (thời gian phản hồi, tỷ lệ lỗi, tài nguyên) và cảnh báo tự động khi vượt ngưỡng. | Monitor metrics (latency, error rate, resources) with automatic alerts on threshold breaches. | Must |
| NFR-OBS-003 | Endpoint kiểm tra sức khỏe (health check) cho ứng dụng và các phụ thuộc. | Health-check endpoints for the application and its dependencies. | Must |

## 11. Công nghệ đề xuất / Proposed technology (TEC)

> Đề xuất dựa trên bộ khung ERP hiện có (NestJS + Next.js + PostgreSQL); có thể điều chỉnh khi thiết kế kiến trúc.
> Proposal based on the existing ERP starter (NestJS + Next.js + PostgreSQL); may change during architecture design.

| Thành phần (VI) | Component (EN) | Đề xuất / Proposal |
|---|---|---|
| Backend / API | Backend / API | NestJS (Node.js ≥ 20, TypeScript) |
| Frontend | Frontend | Next.js (App Router), Tailwind CSS, i18n VI/EN |
| Cơ sở dữ liệu | Database | PostgreSQL 16 |
| ORM & migration | ORM & migrations | TypeORM (migrations có phiên bản / versioned migrations) |
| Hàng đợi & cache | Queue & cache | Redis + BullMQ |
| Lưu trữ tệp | File storage | Object storage tương thích S3 / S3-compatible (MinIO hoặc dịch vụ cloud / or a cloud service) |
| Đóng gói & triển khai | Packaging & deployment | Docker, CI/CD (ví dụ GitHub Actions / e.g. GitHub Actions) |
| Giám sát | Monitoring | OpenTelemetry, Prometheus / Grafana hoặc tương đương / or equivalent |

## 12. Hỗ trợ & tài liệu / Support & documentation (SUP)

| Mã / ID | Yêu cầu (VI) | Requirement (EN) | Ưu tiên / Priority |
|---|---|---|---|
| NFR-SUP-001 | Hướng dẫn sử dụng song ngữ theo từng vai trò; hướng dẫn quản trị hệ thống. | Bilingual user guides per role; system administration guide. | Must |
| NFR-SUP-002 | Đào tạo người dùng chủ chốt (key user) trước go-live; tài liệu đào tạo và video ngắn. | Key-user training before go-live; training material and short videos. | Must |
| NFR-SUP-003 | Môi trường staging với dữ liệu ẩn danh để kiểm thử và đào tạo. | Staging environment with anonymized data for testing and training. | Should |
