import jwt from 'jsonwebtoken';
import { UserModel } from '../database';

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  try {
    const [, token] = authorization.split(' ');
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email, isAdmin } = data;
    const user = await UserModel.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    req.userIsAdmin = isAdmin;
    return next();
  } catch (e) {
    return res.status(403).json('Token is not valid!');
  }
};
export const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    const { id } = req.params;
    verifyToken(req, res, () => {
      if (req.userId === Number(id) || req.userIsAdmin) {
        return next();
      }
      return res.status(403).json({
        errors: ['You are not alowed to do that!'],
      });
    });
    return next();
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
