export class CredentialsAreIncorrects extends Error {
  constructor() {
    super('The credentials are incorrect')
  }
}