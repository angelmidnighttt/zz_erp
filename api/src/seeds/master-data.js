// docs/phase-02-organization-master-data/03-master-data.md — mục 4, dữ liệu khởi tạo
// FR-MDM-016: tiền tệ (cách đọc số tiền bằng chữ VI / EN)
const CURRENCIES = [
  { code: "VND", name: "Đồng Việt Nam", name_en: "Vietnamese dong", symbol: "₫", decimals: 0, words_major_vi: "đồng",     words_minor_vi: null, words_major_en: "dong",       words_minor_en: null },
  { code: "USD", name: "Đô la Mỹ",      name_en: "US dollar",       symbol: "$", decimals: 2, words_major_vi: "đô la Mỹ", words_minor_vi: "xu", words_major_en: "US dollars", words_minor_en: "cents" },
];

// FR-MDM-017: KCT / KKKNT không có rate
const TAXES = [
  { code: "VAT10", name: "Thuế GTGT 10%",           name_en: "VAT 10%",            category: "RATED",        rate: 10,   valid_from: "2026-01-01" },
  { code: "VAT8",  name: "Thuế GTGT 8%",            name_en: "VAT 8%",             category: "RATED",        rate: 8,    valid_from: "2026-01-01" },
  { code: "VAT5",  name: "Thuế GTGT 5%",            name_en: "VAT 5%",             category: "RATED",        rate: 5,    valid_from: "2026-01-01" },
  { code: "VAT0",  name: "Thuế GTGT 0%",            name_en: "VAT 0%",             category: "RATED",        rate: 0,    valid_from: "2026-01-01" },
  { code: "KCT",   name: "Không chịu thuế GTGT",    name_en: "Not subject to VAT", category: "NOT_SUBJECT",  rate: null, valid_from: "2026-01-01" },
  { code: "KKKNT", name: "Không kê khai, tính nộp", name_en: "Not declared",       category: "NOT_DECLARED", rate: null, valid_from: "2026-01-01" },
];

// FR-MDM-019
const PAYMENT_METHODS = [
  { code: "CASH", name: "Tiền mặt",       name_en: "Cash",          method_type: "CASH" },
  { code: "BANK", name: "Chuyển khoản",   name_en: "Bank transfer", method_type: "BANK_TRANSFER" },
  { code: "CARD", name: "Thẻ",            name_en: "Card",          method_type: "CARD" },
  { code: "NET",  name: "Bù trừ công nợ", name_en: "Netting",       method_type: "NETTING" },
];

// FR-MDM-018
const PAYMENT_TERMS = [
  { code: "IMM",   name: "Thanh toán ngay", name_en: "Immediate", term_type: "IMMEDIATE", days: 0 },
  { code: "NET30", name: "Sau 30 ngày",     name_en: "Net 30",    term_type: "NET_DAYS",  days: 30 },
];

// chỉ thêm mã còn thiếu, không ghi đè dữ liệu quản trị viên đã sửa
export const seed = async (knex) => {
  await knex("currencies").insert(CURRENCIES).onConflict("code").ignore();
  await knex("taxes").insert(TAXES).onConflict("code").ignore();
  await knex("payment_methods").insert(PAYMENT_METHODS).onConflict("code").ignore();
  await knex("payment_terms").insert(PAYMENT_TERMS).onConflict("code").ignore();
};
