import BaseException from './BaseException'
import StatusCode from '../http/StatusCode'

class AlreadyExistsException extends BaseException {
  constructor(message = 'already exists') {
    super(StatusCode.CONFLICT(), message, true)
  }
}

export default AlreadyExistsException
