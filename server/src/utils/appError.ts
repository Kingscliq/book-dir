
class AppError extends Error {
    statusCode:number;
    status:string;
    isOperational:boolean;
    constructor(message:string, statusCode:number) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true; //we use isOperational because this this error class will only handle operational error
  
      Error.captureStackTrace(this, this.constructor); //the captureStackTrace() function will tell us were the error occours
    }
  }
  
  export default AppError;
  