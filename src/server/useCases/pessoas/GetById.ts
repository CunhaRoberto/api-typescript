import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { IPessoa } from "../../dataBase/models";

export class GetByIdPessoasUseCase {
  async getById(id: number): Promise<IPessoa> {
    const result = await PessoasProvider.getById(id);

    if (!result) {
      throw new DataNotFoundException("Registro não encontrado!");
    }
    return result
  }
}


