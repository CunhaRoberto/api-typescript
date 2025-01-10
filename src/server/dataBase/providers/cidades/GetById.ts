import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames"
import{ ICidade} from "../../models"
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";


export const getById = async (id: number): Promise<ICidade | undefined> => {
  try {
    const result = await Knex(ETableNames.cidade)
    .select('*')
    .where('id', '=', id)
    .first()

    return  result  

    
    
  } catch (error) {
    console.error(error);      
    throw new InternalServerErrorException('Erro ao consultar o registro. Por favor, tente novamente mais tarde.');
  }
};
  
