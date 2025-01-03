import {Knex} from "../../knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";


// 

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
      const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');
  
      if( typeof result === 'object') return result.id    

      if(typeof result === 'number') return result
  
      return new Error('Erro ao realizar o cadastro');
      
    } catch (error) {
      console.error('Erro ao realizar o cadastro da cidade:', error);
      
      return new Error('Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.');
    }
  };
  
