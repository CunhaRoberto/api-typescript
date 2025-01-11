import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { ICidade } from "../../dataBase/models";
import { CidadesProvider } from "../../dataBase/providers/cidades";

interface IBodyProps extends Omit<ICidade, 'id'> {}

export class CreateCidadeUseCase {
    
  async create(params: IBodyProps): Promise< number> {
  
    const result = await CidadesProvider.create(params)
    return result        
  }
}


