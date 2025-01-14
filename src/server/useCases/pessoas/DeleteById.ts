// src/domain/usecases/DeleteCidadeUseCase.ts

import { PessoasProvider } from "../../dataBase/providers/pessoas";
import DataNotFoundException from "../../../core/exceptions/DataNotFoundException";

export class DeletePessoaUseCase {
  async delete(id: number): Promise<void> {
    const result = await PessoasProvider.deleteById(id);

    if (typeof result === "number" && result < 1) {
      throw new DataNotFoundException("Registro não encontrado!");
    }
  }
}


