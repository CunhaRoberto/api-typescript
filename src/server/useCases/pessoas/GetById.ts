import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";

export class GetByIdPessoasUseCase {
  async getById(id: number): Promise<void> {
    const result = await PessoasProvider.getById(id);

    if (!result) {
      throw new DataNotFoundException("Registro não encontrado!");
    }
  }
}


