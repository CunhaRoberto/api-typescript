import { PessoasProvider} from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { IPessoa } from "../../dataBase/models";
import { CidadesProvider } from "../../dataBase/providers/cidades";
import AlreadyExistsException from "../../../core/exceptions/AlreadyExistsException";


// Função para normalizar texto (transforma em maiúsculas e remove acentos/caracteres especiais)
const normalizeText = (text: string): string => {
  return text
    .toUpperCase()  
    .normalize('NFD')  
    .replace(/[\u0300-\u036f]/g, '')  
    .replace(/[^a-zA-Z0-9\s]/g, '');  
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export class UpateByIdPessoasUseCase {

  async update(id: number, body: IBodyProps): Promise<number> {

    const [pessoasId, cidadeIdResult, emailResult] = await Promise.all([
      PessoasProvider.getById(id),
      CidadesProvider.getById(body.cidadeId),
      PessoasProvider.getByEmail(body.email),
    ]);

    if (!pessoasId) throw new DataNotFoundException("Registro não encontrado!"); 
    if (!cidadeIdResult) throw new DataNotFoundException("Cidade não encontrada!");    
    if (emailResult) throw new AlreadyExistsException("Email já cadastrado");


    body.nomeCompleto = normalizeText(body.nomeCompleto)
    body.email = body.email.toLocaleLowerCase()    
    const result = await PessoasProvider.update(id, body)
    if (typeof result === "number" && result === 0) {
      throw new DataNotFoundException("Registro não encontrado para alteração!");
    }
    return result;        
  }
}
