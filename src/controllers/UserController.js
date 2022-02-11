import { UserModel } from '../database';

const UserController = {
  store: async (req, res) => {
    try {
      const newUser = await UserModel.create(req.body);
      const {
        id, name, email, isAdmin,
      } = newUser;
      return res.json({
        id, name, email, isAdmin,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
  index: async (req, res) => {
    try {
      const users = await UserModel.findAll({ attributes: ['id', 'name', 'email', 'isAdmin'] });
      return res.json(users);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
export default UserController;
