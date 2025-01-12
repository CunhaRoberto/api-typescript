import * as create from './Create'
import * as getAll from './GetAll'
import * as getById from './GetById'
//import * as updateById from './UpdateById'
import * as deleteById from './DeleteById'
import * as getByEmail from './GetByEmail'
import * as count  from './Count'




export const PessoasProvider = {
    ...count,
    ...create,
    ...getAll,
     ...getById,
     ...getByEmail,
    //...updateById,
    ...deleteById
}