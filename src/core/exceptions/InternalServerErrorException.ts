import BaseException from './BaseException'
import StatusCode from '../http/StatusCode'

class InternalServerErrorException extends BaseException {
  constructor(message = 'Internal Server Error Exception') {
    super(StatusCode.INTERNAL_SERVER_ERROR(), message, true)
  }
}

export default InternalServerErrorException
