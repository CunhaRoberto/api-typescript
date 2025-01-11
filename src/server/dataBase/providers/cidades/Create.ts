import {Knex} from "../../knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";


export const create = async (cidade: Omit<ICidade, 'id'>): Promise< number > => {
  try {

    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');
    const res = (typeof result === 'object' ? result.id : result)   
    return res    
    
  } catch (error) {
    console.error(error); 
    throw new InternalServerErrorException('Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.');
  }
};
  
