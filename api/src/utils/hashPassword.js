import bcryptjs from "bcryptjs";
//code hoi au, ae thong cam, co thoi gian minh se refactor lai
export const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

