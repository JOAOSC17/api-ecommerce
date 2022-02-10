import User from '../models/User';

const UserController = {
  store: async (req, res) => {
    try {
      const newUser = await User.create({
        name: 'carlos',
        email: 'carlos@gmail.com',
        password: '123456',
        isAdmin: true,
      });
      return res.json(newUser);
    } catch (error) {
      return console.log(error);
    }
  },
};
export default UserController;
