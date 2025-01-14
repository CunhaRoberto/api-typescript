import InternalServerErrorException from '../../../../core/exceptions/InternalServerErrorException'
import {ETableNames} from '../../ETableNames'
import { Knex} from '../../knex'

export const count = async( filter: string | undefined): Promise< number > => {
    try{
        let query = Knex(ETableNames.pessoa)
        .select('*')
        .count<[{count: number}]>('* as count')
        
        if (filter && filter.trim() !== '') {
            query = query.where('nomeCompleto', 'like', `%${filter}%`);
          }
        const [{count}] = await query         
        return Number(count)   
         
    }catch(error){
        console.error(error);      
        throw new InternalServerErrorException('Erro ao inesperado consultar o total de registros. Por favor, tente novamente mais tarde.');
    }
}