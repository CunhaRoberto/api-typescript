import { CidadesProvider } from "../../dataBase/providers/cidades";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";
import { ICidade } from "../../dataBase/models";

export class GetByIdCidadeUseCase {
  async getById(id: number): Promise< ICidade > {
    const result = await CidadesProvider.getById(id);

    if (!result) {
      throw new DataNotFoundException("Registro não encontrado!");
    }
    return result
  }
}


