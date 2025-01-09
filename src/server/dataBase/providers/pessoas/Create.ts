import {Knex} from "../../knex";
import { IPessoa } from "../../models";
import { ETableNames } from "../../ETableNames";
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";


// 

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {

    // consultar se a cidade existe em arquivo de use case


    const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');
  
    if( typeof result === 'object') return result.id    

    if(typeof result === 'number') return result
  
    return new Error('Erro ao realizar o cadastro');
    
  } catch (error) {
    console.error(error); 
    throw new InternalServerErrorException('Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.');
  }
};
  
