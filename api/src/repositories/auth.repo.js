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
}

export default new AuthRepo();
