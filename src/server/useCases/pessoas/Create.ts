import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { IPessoa } from "../../dataBase/models";
import { CidadesProvider } from "../../dataBase/providers/cidades";
import AlreadyExistsException from "../../../core/exceptions/AlreadyExistsException";

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export class CreatePessoaUseCase {
    
  async create(params: IBodyProps): Promise< number> {
  
    const [cidadeIdResult, emailResult] = await Promise.all([
      CidadesProvider.getById(params.cidadeId),
      PessoasProvider.getByEmail(params.email),
    ]);
    if (!cidadeIdResult) throw new DataNotFoundException("Cidade não encontrada!")
    if (emailResult) throw new AlreadyExistsException("Email já cadastrado")    
      
    const result = await PessoasProvider.create(params);   

    return result        
  }
}


