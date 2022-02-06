const { computeSubTotal } = require('../helpers/hbsHelpers')
const { convertFloat, isCartEmpty } = require('../helpers/hbsHelpers')

describe('Helper function "computeSubTotal": this function should compute a subtotal price by multiplying the two parameters quantity and price', () => {
  test('Given: price = 1500, qty = 39. Expected subtotal: 58500', () => {
    // (1) Arrange
    const price = 1500
    const qty = 39

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toEqual("58500.00")
  })

  test('Given: price = 1500, qty = 2. Expected subtotal: 3000', () => {
    // (1) Arrange
    const price = 1500
    const qty = 2

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toEqual("3000.00")
  })

  test('Given: price = 300, qty = 3. Expected subtotal: 900', () => {
    // (1) Arrange
    const price = 300
    const qty = 3

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toEqual("900.00")
  })

  test('Given: price = -300, qty = -1. Expected answer: null (Negative values are not allowed)', () => {
    // (1) Arrange
    const price = -300
    const qty = -1

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toBeNull()
  })

  test('Given: price = -99, qty = 1. Expected answer: null (Negative values are not allowed)', () => {
    // (1) Arrange
    const price = -99
    const qty = 1

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toBeNull()
  })

  test('Given: price = 99, qty = -999. Expected answer: null (Negative values are not allowed)', () => {
    // (1) Arrange
    const price = 99
    const qty = -999

    // (2) Act
    const subtotal = computeSubTotal(price, qty)

    // (3) Assert
    expect(subtotal).toBeNull()
  })
});


describe('Helper function "computeSubTotal": this function converts the price into a floating point number (up to 2 decimal places)', () => {
  test('Given: price = 1500, expected value should be 1500.00', () => {
    // (1) Arrange
    const price = 1500

    // (2) Act
    const converted = convertFloat(price)

    // (3) Assert
    expect(converted).toEqual("1500.00")
  })

  test('Given: price = 500, expected value should be 500.00', () => {
    // (1) Arrange
    const price = 500

    // (2) Act
    const converted = convertFloat(price)

    // (3) Assert
    expect(converted).toEqual("500.00")
  })

  test('Given: price = 10, expected value should be 10.00', () => {
    // (1) Arrange
    const price = 10

    // (2) Act
    const converted = convertFloat(price)

    // (3) Assert
    expect(converted).toEqual("10.00")
  })

  test('Given: price = -10, expected value should be null', () => {
    // (1) Arrange
    const price = -10

    // (2) Act
    const converted = convertFloat(price)

    // (3) Assert
    expect(converted).toBeNull()
  })

  test('Given: price = -999, expected value should be null', () => {
    // (1) Arrange
    const price = -999

    // (2) Act
    const converted = convertFloat(price)

    // (3) Assert
    expect(converted).toBeNull()
  })
})

describe('Helper function "isCartEmpty": this function returns true if cart array is empty, otherwise false.', () => {
  test('Given: empty cart, expected value should be true', () => {
    // (1) Arrange
    const cart = []

    // (2) Act
    const bool = isCartEmpty(cart)

    // (3) Assert
    expect(bool).toEqual(true)
  })

  test('Given: cart array with 2 elements, expected value should be true', () => {
    // (1) Arrange
    const cart = [1,2]

    // (2) Act
    const bool = isCartEmpty(cart)

    // (3) Assert
    expect(bool).toEqual(false)
  })

  test('Given: cart array with 12 elements, expected value should be true', () => {
    // (1) Arrange
    const cart = [
      {
        productId: 'P000001',
        productStock: 20
      },
      {
        productId: 'P000002',
        productStock: 20
      },
      {
        productId: 'P000003',
        productStock: 20
      },
      {
        productId: 'P000004',
        productStock: 20
      },
      {
        productId: 'P000005',
        productStock: 20
      },
      {
        productId: 'P000006',
        productStock: 20
      },
      {
        productId: 'P000007',
        productStock: 20
      },
      {
        productId: 'P000008',
        productStock: 20
      },
      {
        productId: 'P000009',
        productStock: 20
      },
      {
        productId: 'P000010',
        productStock: 20
      },
      {
        productId: 'P000011',
        productStock: 20
      },
      {
        productId: 'P000012',
        productStock: 20
      }
    ]

    // (2) Act
    const bool = isCartEmpty(cart)

    // (3) Assert
    expect(bool).toEqual(false)
  })
})