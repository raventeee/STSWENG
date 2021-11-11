const { testRegister } = require('./register')

describe('Register using Email', () => {
  it('When email does not exist in the database, it should return an userCredential object', () => {
    // Arrange
    const person = {
      email: 'test@gmail.com'
    }
    // Act
    const output = testRegister(person)
    // Assert
    return expect(output).toEqual(1551)
  })
})
