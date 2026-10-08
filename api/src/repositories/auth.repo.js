//minh se apply dependency injection o 1 project khac, project nay tam thoi code vay
import database from "../configs/database.js";
class AuthRepo {
  async getUserById(userId) {
    const user = await database("users").where({ id: userId }).first();
    return user;
  }

  async getUserByEmail(userEmail) {
    const user = await database("users").where({ email: userEmail }).first();
    return user;
  }

  async updateLastLogin(userId) {
    await database("users")
      .where({ id: userId })
      .update({ last_login_at: new Date() });
  }

  async createUser({ email, username, fullName, password }) {
    return await database("users")
      .insert({
        email,
        username,
        full_name: fullName,
        password_hash: password,
      })
      .returning(["id", "username", "email", "full_name"]);
  }

  async getRoles() {
    return await database("roles").select("id", "code", "name_vi", "name_en");
  }

  async assignRoles(userId, rolesId) {
    return await database("user_roles")
      .insert(rolesId.map((roleId) => ({ user_id: userId, role_id: roleId })))
      .onConflict(["user_id", "role_id"])
      .ignore()
      .returning(["user_id", "role_id"]);
  }
}

export default new AuthRepo();
