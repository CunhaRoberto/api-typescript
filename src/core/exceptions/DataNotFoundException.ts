import BaseException from './BaseException'
import StatusCode from '../http/StatusCode'

class DataNotFoundException extends BaseException {
  constructor(message = 'Data not found') {
    super(StatusCode.NOT_FOUND(), message, true)
  }
}

export default DataNotFoundException
