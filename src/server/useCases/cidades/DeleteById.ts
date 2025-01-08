// src/domain/usecases/DeleteCidadeUseCase.ts

import { CidadesProvider } from "../../dataBase/providers/cidades";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";

export class DeleteCidadeUseCase {
  async delete(id: number): Promise<void> {
    const result = await CidadesProvider.deleteById(id);

    if (typeof result === "number" && result < 1) {
      throw new DataNotFoundException("Registro não encontrado!");
    }
  }
}


