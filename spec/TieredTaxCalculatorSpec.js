describe("TieredTaxCalculator", function() {
  var calc;

  beforeEach(function() {
    calc = TieredTaxCalculator( [ [ 0.1, 10000 ], [ 0.2, 20000 ], [ 0.3 ] ] );
  });

  it('returns 0 for 0 income', function() {
    expect(calc(0)).toEqual(0);
  });

  it("doesn't apply higher tax brackets until they're reached", function() {
    expect(calc(5000)).toEqual( 5000 * 0.1 );
  });

  it("applies tax brackets once they're reached", function() {
    expect(calc(21000)).toEqual( 10000 * 0.1 + 10000 * 0.2 + 1000 * 0.3 );
  });
});
