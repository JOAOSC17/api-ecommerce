import jwt from 'jsonwebtoken';
// import { UserModel } from '../database';

export const verifyToken = async (req, res, next) => {
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
export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.userIsAdmin) {
        return next();
      }
      return res.status(403).json({
        errors: ['You are not alowed to do that!'],
      });
    });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};
