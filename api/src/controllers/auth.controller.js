export default class AuthController {

  async login(req, res) {
    const { email, password } = req.body;
    res.json({ email, password });
  }
}
