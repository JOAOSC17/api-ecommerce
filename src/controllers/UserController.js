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
};
export default UserController;
