import knex from "knex";
import { ICidade } from "../../models";
import { ETableNames } from "../../ETableNames";


// 

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
    try {
      const id = await knex(ETableNames.cidade).insert(cidade);
  
      // O SQLite retorna o último ID como um número direto
      if (id && typeof id[0] === 'number') {
        return id[0];
      }
  
      return new Error('Erro ao realizar o cadastro');
    } catch (error) {
      console.error('Erro ao realizar o cadastro da cidade:', error);
      
      return new Error('Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.');
    }
  };
  
