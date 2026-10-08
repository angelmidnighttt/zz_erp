// src/shared/constants/permission.js

export const FUNCTIONS = {
  USER_ROLE:  "SYS.USER_ROLE",
  SETTINGS:   "SYS.SETTINGS",
  AUDIT_LOG:  "SYS.AUDIT_LOG",
  PRODUCT:    "MDM.PRODUCT",
  CUSTOMER:   "MDM.CUSTOMER",
  SUPPLIER:   "MDM.SUPPLIER",
  PRICE_LIST: "MDM.PRICE_LIST",
};

export const ACTIONS = { V: "VIEW", C: "CREATE", E: "EDIT", D: "DELETE" };

const VCED = ["VIEW", "CREATE", "EDIT", "DELETE"];

// -> bảng app_functions (các hàng của ma trận)
export const APP_FUNCTIONS = [
  { code: FUNCTIONS.USER_ROLE,  module: "SYS", name_vi: "Người dùng & vai trò", name_en: "Users & roles",   supported_actions: VCED,                       sort_order: 10 },
  { code: FUNCTIONS.SETTINGS,   module: "SYS", name_vi: "Cấu hình hệ thống",    name_en: "System settings", supported_actions: ["VIEW", "CREATE", "EDIT"], sort_order: 20 },
  { code: FUNCTIONS.AUDIT_LOG,  module: "SYS", name_vi: "Nhật ký hệ thống",     name_en: "Audit log",       supported_actions: ["VIEW"],                   sort_order: 30 },
  { code: FUNCTIONS.PRODUCT,    module: "MDM", name_vi: "Sản phẩm",             name_en: "Products",        supported_actions: VCED,                       sort_order: 110 },
  { code: FUNCTIONS.CUSTOMER,   module: "MDM", name_vi: "Khách hàng",           name_en: "Customers",       supported_actions: VCED,                       sort_order: 120 },
  { code: FUNCTIONS.SUPPLIER,   module: "MDM", name_vi: "Nhà cung cấp",         name_en: "Suppliers",       supported_actions: VCED,                       sort_order: 130 },
  { code: FUNCTIONS.PRICE_LIST, module: "MDM", name_vi: "Bảng giá bán",         name_en: "Price lists",     supported_actions: VCED,                       sort_order: 140 },
];

// -> bảng roles (các cột của ma trận)
export const ROLES = [
  { code: "ADM", name_vi: "Quản trị hệ thống",               name_en: "System administrator" },
  { code: "CEO", name_vi: "Ban giám đốc",                    name_en: "Executive" },
  { code: "SAL", name_vi: "Nhân viên kinh doanh",            name_en: "Sales staff" },
  { code: "SLM", name_vi: "Trưởng phòng kinh doanh",         name_en: "Sales manager" },
  { code: "PUR", name_vi: "Nhân viên mua hàng",              name_en: "Purchasing staff" },
  { code: "PUM", name_vi: "Trưởng phòng mua hàng",           name_en: "Purchasing manager" },
  { code: "WH",  name_vi: "Thủ kho",                         name_en: "Warehouse keeper" },
  { code: "WHM", name_vi: "Quản lý kho",                     name_en: "Warehouse manager" },
  { code: "ACC", name_vi: "Kế toán viên",                    name_en: "Accountant" },
  { code: "CAC", name_vi: "Kế toán trưởng",                  name_en: "Chief accountant" },
  { code: "CSH", name_vi: "Thủ quỹ",                         name_en: "Cashier" },
  { code: "AUD", name_vi: "Kiểm soát / Kiểm toán (chỉ xem)", name_en: "Auditor (read-only)" },
];

// -> bảng role_permissions (các ô của ma trận, docs/phase-02/01-roles-permissions.md mục 3)
// Vai trò không ghi = "—"
export const DEFAULT_MATRIX = {
  [FUNCTIONS.USER_ROLE]:  { ADM: "VCED", AUD: "V" },
  [FUNCTIONS.SETTINGS]:   { ADM: "VCE", CEO: "V", CAC: "V", AUD: "V" },
  [FUNCTIONS.AUDIT_LOG]:  { ADM: "V", CEO: "V", CAC: "V", AUD: "V" },
  [FUNCTIONS.PRODUCT]:    { ADM: "V", CEO: "V", SAL: "V", SLM: "V", PUR: "VCE", PUM: "VCE", WH: "V", WHM: "VCE", ACC: "V", CAC: "VE", AUD: "V" },
  [FUNCTIONS.CUSTOMER]:   { CEO: "V", SAL: "VCE", SLM: "VCE", ACC: "V", CAC: "VE", CSH: "V", AUD: "V" },
  [FUNCTIONS.SUPPLIER]:   { CEO: "V", PUR: "VCE", PUM: "VCE", ACC: "V", CAC: "VE", CSH: "V", AUD: "V" },
  [FUNCTIONS.PRICE_LIST]: { CEO: "V", SAL: "V", SLM: "VCE", ACC: "V", CAC: "V", AUD: "V" },
};
