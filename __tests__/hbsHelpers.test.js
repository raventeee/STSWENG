const { computeSubTotal } = require('../helpers/hbsHelpers')

describe('Helper function "computeSubTotal": this function should compute a subtotal price by multiplying the two parameters quantity and price', () => {
    test('Given: price = 1500, qty = 39. Expected subtotal: 58500', () => {
      // (1) Arrange
      const price = 1500
      const qty = 39

      // (2) Act
      const subtotal = computeSubTotal(price, qty)

      // (3) Assert
      expect(subtotal).toEqual(58500)
    })

    test('Given: price = 1500, qty = 2. Expected subtotal: 3000', () => {
      // (1) Arrange
      const price = 1500
      const qty = 2

      // (2) Act
      const subtotal = computeSubTotal(price, qty)

      // (3) Assert
      expect(subtotal).toEqual(3000)
    })

    test('Given: price = 300, qty = 3. Expected subtotal: 900', () => {
      // (1) Arrange
      const price = 300
      const qty = 3

      // (2) Act
      const subtotal = computeSubTotal(price, qty)

      // (3) Assert
      expect(subtotal).toEqual(900)
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