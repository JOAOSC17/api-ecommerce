import {
  OrderModel, UserModel,
} from '../database';

const cleanRelatedDatabases = async () => {
  await OrderModel.destroy({ cascade: true, truncate: true });
  await UserModel.destroy({ cascade: true, truncate: true });
};

describe('Orders', () => {
  beforeAll(async () => {
    await cleanRelatedDatabases();
  });
  afterAll(async () => {
    await cleanRelatedDatabases();
  });

  test('creating order', async () => {
    const user = { name: 'test', email: 'teste@teste.com', password: 'tesTe@123' };
    const { id: userId } = await UserModel.create(user);
    const order = await OrderModel.create({ user_id: userId });
    expect(order).toHaveProperty('id');
  });
});
