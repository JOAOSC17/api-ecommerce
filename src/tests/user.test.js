import { UserModel } from '../database';

describe('Users', () => {
  beforeAll(async () => {
    await UserModel.destroy({ cascade: true, truncate: true });
  });
  afterAll(async () => {
    await UserModel.destroy({ cascade: true, truncate: true });
  });

  test('create', async () => {
    const user = await UserModel.create({
      name: 'test',
      email: 'teste@teste.com',
      password: 'tesTe@123',
    });
    expect(user).toHaveProperty('id');
  });
});
