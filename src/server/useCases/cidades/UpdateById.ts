import { CidadesProvider} from "../../dataBase/providers/cidades";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { ICidade } from "../../dataBase/models";
import AlreadyExistsException from "../../../core/exceptions/AlreadyExistsException";
import StatusCode from "../../../core/http/StatusCode";

// Função para normalizar texto (transforma em maiúsculas e remove acentos/caracteres especiais)
const normalizeText = (text: string): string => {
  return text
    .toUpperCase()  
    .normalize('NFD')  
    .replace(/[\u0300-\u036f]/g, '')  
    .replace(/[^a-zA-Z0-9\s]/g, '');  
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export class UpateByIdCidadesUseCase {

  async update(id: number, body: IBodyProps): Promise<number> {

    const resultId = await CidadesProvider.getById(id)     
    if (!resultId) throw new DataNotFoundException("Cidade não encontrada!");  
    
    
    body.nome = normalizeText(body.nome)
    const result = await CidadesProvider.update(id, body)
    if (typeof result === "number" && result === 0) {
      throw new DataNotFoundException("Registro não encontrado para alteração!");
    }
    return result;        
  }
}
