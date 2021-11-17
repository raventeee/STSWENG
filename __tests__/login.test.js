const { login, getAuth } = require('../db')
const testLogin = login

describe('Login using email and password that exists in Firebase Auth, all should be accepted', () => {
  test('Logging in with email: \'francis@gmail.com\', password: \'password\'', () => {
    // Arrange
    const person = {
      email: 'francis@gmail.com',
      password: 'password'
    }
    const auth = getAuth()
    // Act
    const output = testLogin(auth, person.email, person.password)
    // Assert
    return expect(output).resolves.toBeDefined()
  })
})

describe('Login using email and password that DOES NOT exist in Firebase Auth, all should be rejected', () => {
  test('Logging in email: \'aaa@gmail.com\', password: \'password123\'', () => {
    // Arrange
    const person = {
      email: 'aaa@gmail.com',
      password: 'password123'
    }
    const auth = getAuth()
    // Act
    const output = testLogin(auth, person.email, person.password)
    // Assert
    return expect(output).rejects.toBeDefined()
  })
})
