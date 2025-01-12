// import { PessoasProvider } from "../../dataBase/providers/pessoas";
// import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
// import { IPessoa } from "../../dataBase/models";
// import { CidadesProvider } from "../../dataBase/providers/cidades";
// import AlreadyExistsException from "../../../core/exceptions/AlreadyExistsException";

// interface IBodyProps extends Omit<IPessoa, 'id'> {}

// export class CreatePessoaUseCase {
    
//   async create(params: IBodyProps): Promise< number> {
  
//     const [cidadeIdResult, emailResult] = await Promise.all([
//       CidadesProvider.getById(params.cidadeId),
//       PessoasProvider.getByEmail(params.email),
//     ]);
//     if (!cidadeIdResult) throw new DataNotFoundException("Cidade não encontrada!")
//     if (emailResult) throw new AlreadyExistsException("Email já cadastrado")    
      
//     const result = await PessoasProvider.create(params);   

//     return result        
//   }
// }


import { PessoasProvider } from "../../dataBase/providers/pessoas";
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

export class CreatePessoaUseCase {

  async create(params: IBodyProps): Promise<number> {

    // Normalizando os campos (transformando em maiúsculas e removendo acentos e caracteres especiais)
    const normalizedParams = {
      ...params,
      nomeCompleto: normalizeText(params.nomeCompleto),
      email:params.email.toLowerCase()
      
    };    
    
    const [cidadeIdResult, emailResult] = await Promise.all([
      CidadesProvider.getById(normalizedParams.cidadeId),
      PessoasProvider.getByEmail(normalizedParams.email),
    ]);

    
    if (!cidadeIdResult) throw new DataNotFoundException("Cidade não encontrada!");    
    if (emailResult) throw new AlreadyExistsException("Email já cadastrado");

    const result = await PessoasProvider.create(normalizedParams);

    return result;        
  }
}
