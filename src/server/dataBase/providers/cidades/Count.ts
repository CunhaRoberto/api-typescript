import InternalServerErrorException from '../../../../core/exceptions/InternalServerErrorException'
import {ETableNames} from '../../ETableNames'
import { Knex} from '../../knex'

export const count = async( filter: string | undefined): Promise< number > => {
    try{
        let query = Knex(ETableNames.cidade)
        .select('*')
        .count<[{count: number}]>('* as count')
        
        if (filter && filter.trim() !== '') {
            query = query.where('nome', 'like', `%${filter}%`);
          }

        const [{count}] = await query

         
        return Number(count)
        



        const result = await query;
        
    }catch(error){
        console.error(error);      
        throw new InternalServerErrorException('Erro ao inesperado consultar o total de registros. Por favor, tente novamente mais tarde.');
    }
}