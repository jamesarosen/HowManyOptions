describe("TieredTaxCalculator#taxOn", function() {
  var calc;

  beforeEach(function() {
    calc = new TieredTaxCalculator( [ [ 0.1, 10000 ], [ 0.2, 20000 ], [ 0.3 ] ] );
  });

  it('returns 0 for 0 income', function() {
    expect(calc.taxOn(0)).toEqual(0);
  });

  it("doesn't apply higher tax brackets until they're reached", function() {
    expect(calc.taxOn(5000)).toEqual( 5000 * 0.1 );
  });

  it("applies tax brackets once they're reached", function() {
    expect(calc.taxOn(21000)).toEqual( 10000 * 0.1 + 10000 * 0.2 + 1000 * 0.3 );
  });
});
