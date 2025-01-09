import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";

export const deleteById = async (id: number): Promise< number > => {
    try {
      const result = await Knex(ETableNames.pessoa)
      .where('id', '=', id)
      .del();
  
      return result
      
    } catch (error) {
      console.error(error);      
      throw new InternalServerErrorException('Erro ao inesperado ao excluir o registro. Por favor, tente novamente mais tarde.');
    }
  };
  
