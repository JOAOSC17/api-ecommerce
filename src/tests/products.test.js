import { ProductModel } from '../database';

describe('Products', () => {
  beforeAll(async () => {
    await ProductModel.destroy({ cascade: true, truncate: true });
  });
  afterAll(async () => {
    await ProductModel.destroy({ cascade: true, truncate: true });
  });

  test('create', async () => {
    const product = await ProductModel.create({
      title: 'arroz',
      description: 'muito gostoso',
      price: 20.00,
    });
    expect(product).toHaveProperty('id');
  });
});
