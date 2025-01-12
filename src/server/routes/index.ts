import { Router } from 'express';
import { CidadesController, PessoasController } from '../controller';


const router = Router();

router.get('/', (_, res) => {
    res.send('Olá, Dev!');
  });

  router.delete('/', (_, res) => {
    res.send('Olá, Dev!');
  });
  

router.route('/cidades').post(CidadesController.createValidation,CidadesController.create)
router.route('/cidades').get(CidadesController.getAllValidation,CidadesController.getAll)
router.route('/cidades/:id').get(CidadesController.getByIdValidation,CidadesController.getById)
router.route('/cidades/:id').put(CidadesController.updateByIdValidation,CidadesController.updateById)
router.route('/cidades/:id').delete(CidadesController.deleteByIdValidation,CidadesController.deleteById)


router.route('/Pessoas').post(PessoasController.createValidation,PessoasController.create)
router.route('/Pessoas/:id').get(PessoasController.getByIdValidation,PessoasController.getById)
router.route('/Pessoas').get(PessoasController.getAllValidation,PessoasController.getAll)
// router.route('/Pessoas/:id').put(PessoasController.updateByIdValidation,PessoasController.updateById)
// router.route('/Pessoas/:id').delete(PessoasController.deleteByIdValidation,PessoasController.deleteById)


router.all('*', (request, response) => {
  response.status(400).json({
    message: 'Whoops, wrong way.'
  })
})

export { router };
