import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';  
import { CidadesController } from './../controller'

const router = Router();

router.get('/', (_, res) => {
    res.send('Olá, Dev!');
  });
  

router.route('/cidades').post(CidadesController.createValidation,CidadesController.create)
//router.route('/cidades').get(CidadesController.getAllValidation,CidadesController.getAll)




export { router };
