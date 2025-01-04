import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";


// 

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
      const result = await Knex(ETableNames.cidade)
      .where('id', '=', id)
      .del();
  
      if( result > 0) return    

      return new Error('Erro ao excluir o registro');
      
    } catch (error) {
      console.error(error);      
      return new Error('Erro ao excluir o registro. Por favor, tente novamente mais tarde.');
    }
  };
  
