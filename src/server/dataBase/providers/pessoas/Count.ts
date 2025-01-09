import InternalServerErrorException from '../../../../core/exceptions/InternalServerErrorException'
import {ETableNames} from '../../ETableNames'
import { Knex} from '../../knex'

export const getAll = async( filter: string): Promise< number > => {
    try{
        const [{count}] = await Knex(ETableNames.pessoa)
            .where ('nomeCompleto', 'like', `%${filter}%`)
            .count<[{count: number}]>('* as count')

         
        return Number(count)
        
        
    }catch(error){
        console.error(error);      
        throw new InternalServerErrorException('Erro ao inesperado consultar o total de registros. Por favor, tente novamente mais tarde.');
    }
}