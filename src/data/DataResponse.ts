export enum Result {
  Success = 1,
  Fail = 2,
}

export default class DataResponse {
  result: Result;
  message: string;
  payload: any;

  constructor(result: Result, message: string, payload: any = {}) {
    if (!result || !message || !payload) {
      const missingParameters = [];
      if (!result) {
        missingParameters.push("result");
      }
      if (!message) {
        missingParameters.push("message");
      }
      if (!payload) {
        missingParameters.push("payload");
      }
      const errorMessage = `The following parameter(s) are missing: ${missingParameters.join(
        ", "
      )}`;
      throw new Error(errorMessage);
    }
    
    this.result = result;
    this.message = message;
    this.payload = payload;
  }
}
