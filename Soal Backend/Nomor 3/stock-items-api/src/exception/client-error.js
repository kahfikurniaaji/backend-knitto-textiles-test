class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "Client Error";
    this.statusCode = statusCode;
  }
}

export default ClientError;
