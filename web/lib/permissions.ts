// Đồng bộ với api/src/shared/constants/permission.js
export const FUNCTIONS = {
  USER_ROLE: "SYS.USER_ROLE",
  SETTINGS: "SYS.SETTINGS",
  AUDIT_LOG: "SYS.AUDIT_LOG",
  PRODUCT: "MDM.PRODUCT",
  CUSTOMER: "MDM.CUSTOMER",
  SUPPLIER: "MDM.SUPPLIER",
  PRICE_LIST: "MDM.PRICE_LIST",
} as const;

export type FunctionCode = (typeof FUNCTIONS)[keyof typeof FUNCTIONS];
export type Action = "VIEW" | "CREATE" | "EDIT" | "DELETE";
export type Permission = `${FunctionCode}:${Action}`;
