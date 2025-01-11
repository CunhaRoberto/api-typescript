import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames"
import{ IPessoa} from "../../models"
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";


export const getByEmail = async (email: string): Promise<IPessoa | undefined> => {
    try {
      const result = await Knex(ETableNames.pessoa)
      .select('*')
      .where('email', '=', email)
      .first()
  
      return  result  

      
      
    } catch (error) {
      console.error(error);      
      throw new InternalServerErrorException('Erro ao consultar o registro. Por favor, tente novamente mais tarde.');
    }
  };
  
