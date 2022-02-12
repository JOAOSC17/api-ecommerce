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
  show: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não encontrado'],
        });
      }
      const {
        id, name, email, isAdmin,
      } = user;
      return res.json({
        id, name, email, isAdmin,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
  update: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não encontrado'],
        });
      }
      const newData = await user.update(req.body);
      const {
        id, name, email, isAdmin,
      } = newData;
      return res.json({
        id, name, email, isAdmin,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
  delete: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  },
};
export default UserController;
