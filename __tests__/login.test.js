const { authLogin } = require('../db')

describe('Login using email and password that exists in Firebase Auth, all should be accepted', () => {
  test('Logging in with email: \'francis@gmail.com\', password: \'password\'', done => {
    // (1) Arrange
    const person = {
      email: 'francis@gmail.com',
      password: 'password'
    }

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeDefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    authLogin(person, callback)
  })
})

describe('Login using email and password that DOES NOT exist in Firebase Auth, all should be rejected', () => {
  test('Logging in email: \'aaa@gmail.com\', password: \'password123\'', () => {
    // (1) Arrange
    const person = {
      email: 'aaa@gmail.com',
      password: 'password123'
    }

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUnDefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    authLogin(person, callback)
  })

  test('Logging in email: \'sss@gmail.com\', password: \'000\'', () => {
    // (1) Arrange
    const person = {
      email: 'sss@gmail.com',
      password: '000'
    }

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUnDefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    authLogin(person, callback)
  })

  test('Logging in email: \'uuu@gmail.com\', password: \'878\'', () => {
    // (1) Arrange
    const person = {
      email: 'uuu@gmail.com',
      password: '878'
    }

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUnDefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    authLogin(person, callback)
  })
})
