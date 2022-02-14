import jwt from 'jsonwebtoken';

const loginRequired = {
  verifyToken: (req, res, next) => {
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
  },
};
export default loginRequired;
