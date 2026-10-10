//minh se apply dependency injection o 1 project khac, project nay tam thoi code vay
// db() tu dung transaction dang chay (neu co), nen repo khong can nhan trx
import { db } from "../../shared/db/transaction.js";
import { applySort, whereSearch, paginate } from "../../shared/db/list.js";

class AuthRepo {
  async getUserById({ userId }) {
    return db("users").where({ id: userId }).first();
  }

  async getUserByEmail({ email }) {
    return db("users").where({ email }).first();
  }

  async updateLastLogin({ userId }) {
    await db("users")
      .where({ id: userId })
      .update({ last_login_at: new Date() });
  }

  async createUser({ email, username, fullName, passwordHash }) {
    const [user] = await db("users")
      .insert({
        email,
        username,
        full_name: fullName,
        password_hash: passwordHash,
      })
      .returning(["id", "username", "email", "full_name"]);
    return user;
  }

  async getRoles() {
    return db("roles").select("id", "code", "name_vi", "name_en");
  }

  async assignRoles({ userId, rolesId }) {
    return db("user_roles")
      .insert(rolesId.map((roleId) => ({ user_id: userId, role_id: roleId })))
      .onConflict(["user_id", "role_id"])
      .ignore()
      .returning(["user_id", "role_id"]);
  }

  async getPerrmissionsByUserId({ userId }) {
    return db("users as u")
      .join("user_roles as ur", "u.id", "ur.user_id")
      .join("role_permissions as rp", "ur.role_id", "rp.role_id")
      .where({ "u.id": userId })
      .select(
        "u.id",
        "u.email",
        "u.full_name",
        "rp.function_code",
        "rp.action",
      );
  }

  async createRefreshToken({ userId, tokenHash, expiresAt }) {
    const [token] = await db("refresh_tokens")
      .insert({ user_id: userId, token_hash: tokenHash, expires_at: expiresAt })
      .returning(["id"]);
    return token;
  }

  // Thu hoi token con hieu luc. Tra ve undefined neu token khong ton tai, da bi thu hoi hoac het han.
  // 1 cau update co dieu kien nen 2 request dung cung 1 token thi chi 1 request thanh cong
  async revokeRefreshToken({ tokenHash, replacedById = null }) {
    const now = new Date();
    const [token] = await db("refresh_tokens")
      .where({ token_hash: tokenHash })
      .whereNull("revoked_at")
      .where("expires_at", ">", now)
      .update({
        revoked_at: now,
        replaced_by_id: replacedById,
        updated_at: now,
      })
      .returning(["id", "user_id"]);
    return token;
  }

  async getUsers({ search = "", sort = "email", page = 1, pageSize = 20 }) {
    const qb = db("users").select(
      "id",
      "email",
      "username",
      "full_name",
      "created_at",
    );
    whereSearch(qb, search, ["email", "username", "full_name"]);
    applySort(
      qb,
      sort,
      ["email", "username", "full_name", "created_at"],
      "email",
    );
    return paginate(qb, { page, pageSize });
  }
}

export default new AuthRepo();
