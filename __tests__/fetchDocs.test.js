const { getOne, getAll } = require('../db')

describe('Retrieves documents in Customers collection', () => {
  test('Fetch document with document id = "giorno@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'giorno@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toHaveProperty('customerEmail', 'giorno@gmail.com') // document id and email should be equal
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })

  test('Fetch document with document id = "jotaro@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'jotaro@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toHaveProperty('customerEmail', 'jotaro@gmail.com') // document id and email should be equal
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })

  test('Fetch document with document id = "theking@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'theking@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toHaveProperty('customerEmail', 'theking@gmail.com') // document id and email should be equal
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })
})


describe('Retrieves documents in Customers collection where id does not exist, all should be undefined', () => {
  test('Fetch document with document id = "eee@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'eee@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUndefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })

  test('Fetch document with document id = "jjjttt@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'jjjttt@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUndefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })

  test('Fetch document with document id = "randomrandom@gmail.com"', done => {
    // (1) Arrange
    const col = 'Customers'
    const id = 'randomrandom@gmail.com'

    function callback (data) {
      try {
        // (3) Assert
        expect(data).toBeUndefined()
        done()
      } catch (error) {
        done(error)
      }
    }

    // (2) Act
    getOne(col, id, callback)
  })
})