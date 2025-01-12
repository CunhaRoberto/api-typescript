import { ICidade } from './../../dataBase/models/Cidade';
import { count } from './../../dataBase/providers/cidades/Count';
import { CidadesProvider } from "../../dataBase/providers/cidades";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export class GetAllCidadesUseCase {
  async getAll(params: IQueryProps): Promise<{ data: ICidade[], total: number }> {
    const limit = params?.limit ? params.limit : 7;
    const page = params?.page ? params.page : 1;
    const filter = params?.filter;

    const [result, count] = await Promise.all([
      CidadesProvider.getAll(page, limit, filter),
      CidadesProvider.count(filter),
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

