// docs/phase-02-organization-master-data/02-system-administration.md — FR-SYS-020
// value là JSON nên phải JSON.stringify (pg đổi mảng JS thành mảng Postgres, không phải jsonb)
const SYSTEM_SETTINGS = [
  { key: "general.default_language",       value: "vi",               description: "Ngôn ngữ mặc định: vi | en" },
  { key: "general.timezone",               value: "Asia/Ho_Chi_Minh", description: "Múi giờ" },
  { key: "format.date",                    value: "dd/MM/yyyy",       description: "Định dạng ngày" },
  { key: "format.number",                  value: "vi",               description: "Định dạng số: vi = 1.234.567,89" },
  { key: "decimals.quantity",              value: 3,                  description: "Số chữ số thập phân của số lượng" },
  { key: "decimals.unit_price",            value: 2,                  description: "Số chữ số thập phân của đơn giá" },
  { key: "decimals.amount",                value: 0,                  description: "Số chữ số thập phân của thành tiền VND; ngoại tệ theo currencies.decimals" },
  { key: "decimals.exchange_rate",         value: 2,                  description: "Số chữ số thập phân của tỷ giá" },
  { key: "inventory.allow_negative_stock", value: false,              description: "Cho phép xuất âm kho" },
  { key: "inventory.costing_method",       value: "AVG_PERIODIC",     description: "Phương pháp tính giá xuất kho (Q-04)" },
  { key: "sales.invoice_policy",           value: "DELIVERED",        description: "Chính sách xuất hóa đơn: ORDERED | DELIVERED (Q-05)" },
  { key: "attachments.max_size_mb",        value: 20,                 description: "Dung lượng tối đa mỗi tệp đính kèm (MB)" },
  { key: "attachments.allowed_types",      value: ["pdf", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "xml"], description: "Đuôi tệp được phép đính kèm" },
];

// chỉ thêm khóa còn thiếu, không ghi đè giá trị quản trị viên đã sửa
export const seed = async (knex) => {
  await knex("system_settings")
    .insert(SYSTEM_SETTINGS.map((s) => ({ ...s, value: JSON.stringify(s.value) })))
    .onConflict("key")
    .ignore();
};
//seed vai data can thiet de co test truoc