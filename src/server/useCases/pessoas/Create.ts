import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { IPessoa } from "../../dataBase/models";
import { CidadesProvider } from "../../dataBase/providers/cidades";

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export class CreatePessoaUseCase {
    
  async create(params: IBodyProps): Promise< number> {
  
   const cidadeIdResult = await CidadesProvider.getById(params.cidadeId);
    if (! cidadeIdResult)  {
        throw new DataNotFoundException("Cidade não encontrada!");        
    }

    const result = await PessoasProvider.create(params);   

    return result        
  }
}


