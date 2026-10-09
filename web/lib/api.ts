// Lớp kết nối backend (thay cho axios + interceptor).
// Chỉ dùng trong Client Component: accessToken là biến module, ở server sẽ bị dùng chung giữa các user.
// NEXT_PUBLIC_* được Next nhúng vào bundle lúc build: đổi URL thì phải build lại
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export type FieldErrors = Record<string, string[]>;

// Khớp api/src/shared/utils/response.js và validate.middleware.js
type ApiSuccess<T> = { success: true; data: T };
type ApiFailure = {
  success: false;
  code: number;
  message: string | Partial<Record<"body" | "params" | "query", FieldErrors>>;
};
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type Query = Record<string, string | number | boolean | undefined>;

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Query;
  signal?: AbortSignal;
  retry?: boolean; // false: không refresh khi 401 (login, refresh)
};

export class ApiError extends Error {
  readonly status: number;
  readonly fields: FieldErrors | null;

  constructor(status: number, message: string, fields: FieldErrors | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }
}

let accessToken: string | null = null;
let onSessionExpired: (() => void) | null = null;
let refreshing: Promise<void> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const hasAccessToken = () => accessToken !== null;

export const setSessionExpiredHandler = (handler: (() => void) | null) => {
  onSessionExpired = handler;
};

function buildUrl(path: string, query?: Query) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.toString();
  return `${BASE_URL}${path}${qs ? `?${qs}` : ""}`;
}

function toApiError(res: Response, json: ApiResponse<unknown> | null) {
  if (!json || json.success) return new ApiError(res.status, res.statusText || "Request failed");

  const { message } = json;
  if (typeof message === "string") return new ApiError(res.status, message);
  return new ApiError(res.status, "Validation failed", { ...message.params, ...message.query, ...message.body });
}

// Một lần gọi: gắn header (request interceptor) + bóc envelope / đổi lỗi (response interceptor)
async function send<T>(path: string, { method = "GET", body, query, signal }: RequestOptions): Promise<T> {
  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      method,
      signal,
      credentials: "include", // gửi/nhận cookie refreshToken của domain API
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiError(0, "Network error");
  }

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (res.ok && json?.success) return json.data;
  throw toApiError(res, json);
}

// Nhiều request cùng 401 thì chỉ gọi refresh 1 lần
export function refreshAccessToken() {
  refreshing ??= send<{ accessToken: string }>("/auth/refresh", { method: "POST" })
    .then((data) => setAccessToken(data.accessToken))
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  try {
    return await send<T>(path, options);
  } catch (err) {
    const canRefresh = err instanceof ApiError && err.status === 401 && options.retry !== false;
    if (!canRefresh) throw err;
  }

  try {
    await refreshAccessToken();
  } catch (err) {
    setAccessToken(null);
    onSessionExpired?.();
    throw err;
  }
  return send<T>(path, options);
}

type Options = Omit<RequestOptions, "method" | "body">;

export const api = {
  get: <T>(path: string, options?: Options) => request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Options) => request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: Options) => request<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: Options) => request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Options) => request<T>(path, { ...options, method: "DELETE" }),
};
