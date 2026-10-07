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
}

export default new AuthRepo();
