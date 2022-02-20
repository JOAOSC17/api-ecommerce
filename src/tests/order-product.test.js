import {
  OrderModel, OrderProductModel, ProductModel, UserModel,
} from '../database';

const cleanRelatedDatabases = async () => {
  await ProductModel.destroy({ cascade: true, truncate: true });
  await OrderProductModel.destroy({ cascade: true, truncate: true });
  await OrderModel.destroy({ cascade: true, truncate: true });
  await UserModel.destroy({ cascade: true, truncate: true });
};

describe('Cart relationship test', () => {
  beforeAll(async () => {
    await cleanRelatedDatabases();
  });

  beforeEach(async () => {
    jest.setTimeout(60000);
    await cleanRelatedDatabases();
  });

  afterAll(async () => {
    await cleanRelatedDatabases();
  });

  test('creating order', async () => {
    const { id: userId } = await UserModel.create({
      name: 'test',
      email: 'teste@teste.com',
      password: 'tesTe@123',
    });
    const { id: orderId } = await OrderModel.create({ user_id: userId });
    const { id: productId } = await ProductModel.create({
      title: 'arroz',
      description: 'muito gostoso',
      price: 20.00,
    });

    const order = await OrderModel.findOne({ where: { id: orderId } });
    const response = await order.addProduct(productId);
    expect(response).not.toBe(null);
  });

  test('calculating total price', async () => {
    const { id: userId } = await UserModel.create({
      name: 'test',
      email: 'teste@teste.com',
      password: 'tesTe@123',
    });
    const { id: orderId } = await OrderModel.create({ user_id: userId });

    const products = [
      {
        title: 'arroz',
        description: 'muito gostoso',
        price: 20.00,
      },
      {
        title: 'feijao',
        description: 'vermelho',
        price: 10.00,
      },
    ];
    const insertedProducts = await Promise.all(products.map((product) => ProductModel.create(product)));
    const order = await OrderModel.findOne({ where: { id: orderId } });
    await Promise.all(insertedProducts.map((product) => order.addProduct(product.id)));
    const orderToCalculate = await OrderModel.findOne({ where: { id: orderId }, include: ProductModel });
    const totalPrice = orderToCalculate.products.map((product) => product.price).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
    expect(totalPrice).toBe(30);
  });
});
