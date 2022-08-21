import multer from 'multer';
import multerConfig from '../config/multerConfig';
import { PhotoModel } from '../database';

const upload = multer(multerConfig).single('photo');

const PhotoController = {
  store: (req, res) => upload(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        errors: [error.code],
      });
    }
    try {
      const { originalname, filename } = req.file;
      const { product_id } = req.body;
      const id = Number(product_id);
      const photo = await PhotoModel.create({ originalname, filename, product_id: id });

      return res.json(photo);
    } catch (e) {
      return res.status(400).json({
        errors: ['Produto não existe'],
      });
    }
  }),
};
export default PhotoController;
