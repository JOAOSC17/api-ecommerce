import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../database';

const LoginController = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id, isAdmin } = user;
    const token = jwt.sign({ id, email, isAdmin }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
export default LoginController;
