class BaseException extends Error {
  // Definindo os tipos para as propriedades
  private _httpCode: number;
  private _isOperational: boolean;

  // Construtor com tipos explícitos para os parâmetros
  constructor(httpCode: number, message: string, isOperational: boolean) {
    super(message);  // Passa a mensagem para o construtor da classe Error

    this._httpCode = httpCode;
    this._isOperational = isOperational;

    // Captura a pilha de chamadas (stack trace)
    Error.captureStackTrace(this, this.constructor);
  }

  // Getter para httpCode
  get httpCode(): number {
    return this._httpCode;
  }

  // Getter para isOperational
  get isOperational(): boolean {
    return this._isOperational;
  }
}

export default BaseException;
