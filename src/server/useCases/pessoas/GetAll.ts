// import { count } from './../../dataBase/providers/pessoas/Count';
// import { PessoasProvider } from "../../dataBase/providers/pessoas";
// import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
// import { IPessoa } from "../../dataBase/models";

// interface IQueryProps {
//   page?: number;
//   limit?: number;
//   filter?: string;
// }

// export class GetAllPessoasUseCase {
//   async getAll(params: IQueryProps): Promise<IPessoa[]> {
//     const limit = params?.limit ? params.limit : 7
//     const page = params?.page ? params.page : 1
//     const filter = params?.filter

//   const [result, count] = await Promise.all([
//       PessoasProvider.getAll( page, limit, filter),
//       PessoasProvider.count(filter),
//     ]);
  
//     const retorno = {
//       ...result,
//       total: count
//     }
    
//     return retorno
//   }
// }

import { count } from './../../dataBase/providers/pessoas/Count';
import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { IPessoa } from "../../dataBase/models";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export class GetAllPessoasUseCase {
  async getAll(params: IQueryProps): Promise<{ data: IPessoa[], total: number }> {
    const limit = params?.limit ? params.limit : 7;
    const page = params?.page ? params.page : 1;
    const filter = params?.filter;

    const [result, count] = await Promise.all([
      PessoasProvider.getAll(page, limit, filter),
      PessoasProvider.count(filter),
    ]);
    
    
    if (result.length === 0) {
      throw new DataNotFoundException(`Não encontramos nenhum resultado para o filtro '${filter}'.`);
    }

    return {
      data: result,   
      total: count,   
    };
  }
}

