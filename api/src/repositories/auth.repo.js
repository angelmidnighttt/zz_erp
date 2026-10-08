//minh se apply dependency injection o 1 project khac, project nay tam thoi code vay
import database from "../configs/database.js";

class AuthRepo {
  async getUserById({ userId }) {
    return database("users").where({ id: userId }).first();
  }

  async getUserByEmail({ email }) {
    return database("users").where({ email }).first();
  }

  async updateLastLogin({ userId }) {
    await database("users")
      .where({ id: userId })
      .update({ last_login_at: new Date() });
  }

  async createUser({ email, username, fullName, passwordHash }) {
    const [user] = await database("users")
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
    return database("roles").select("id", "code", "name_vi", "name_en");
  }

  async assignRoles({ userId, rolesId }) {
    return database("user_roles")
      .insert(rolesId.map((roleId) => ({ user_id: userId, role_id: roleId })))
      .onConflict(["user_id", "role_id"])
      .ignore()
      .returning(["user_id", "role_id"]);
  }
}

export default new AuthRepo();
