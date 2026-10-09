//minh se apply dependency injection o 1 project khac, project nay tam thoi code vay
// db() tu dung transaction dang chay (neu co), nen repo khong can nhan trx
import { db } from "../../shared/db/transaction.js";

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
}

export default new AuthRepo();
