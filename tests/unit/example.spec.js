describe("Example Component", () => {
  test("Debe ser mayor a 10", () => {
    // Arrange
    const limit = 10
    let value = 4

    // Act
    value = value + 8

    // Assert
    expect(value).toBeGreaterThan(limit)
  })
})
