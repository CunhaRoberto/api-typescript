import * as create from './Create'
// import * as getAll from './GetAll'
import * as getById from './GetById'
// import * as updateById from './UpdateById'
import * as deleteById from './DeleteById'
import * as getByEmail from './GetByEmail'




export const PessoasProvider = {
    ...create,
    // ...getAll,
     ...getById,
     ...getByEmail,
    // ...updateById,
    ...deleteById
}