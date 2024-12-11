import { Router } from 'express';
import { CidadesController } from './../controller'

const router = Router();

router.get('/', (_, res) => {
    res.send('Olá, Dev!');
  });
  

router.route('/cidades').post(CidadesController.createValidation,CidadesController.create)
router.route('/cidades').get(CidadesController.getAllValidation,CidadesController.getAll)
router.route('/cidades/:id').get(CidadesController.getByIdValidation,CidadesController.getById)
router.route('/cidades/:id').put(CidadesController.updateByIdValidation,CidadesController.updateById)
router.route('/cidades/:id').delete(CidadesController.deleteByIdValidation,CidadesController.deleteById)




export { router };
