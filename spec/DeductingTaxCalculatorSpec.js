describe("DeductingTaxCalculator#taxOn", function() {
  var calc, baseCalc;

  beforeEach(function() {
    baseCalc = { taxOn: function() { return -1; } };
    spyOn(baseCalc, 'taxOn').andReturn(100);
    calc = new DeductingTaxCalculator(10000, baseCalc);
  });

  it("returns what the base calculator returns", function() {
    expect(calc.taxOn(328253)).toEqual(100);
  });

  it("doesn't deduct more than the value taxed", function() {
    calc.taxOn(9999);
    expect(baseCalc.taxOn).toHaveBeenCalledWith(0);
  });

  it("doesn't deduct more than the deduction", function() {
    calc.taxOn(20000);
    expect(baseCalc.taxOn).toHaveBeenCalledWith(10000);
  });
});
