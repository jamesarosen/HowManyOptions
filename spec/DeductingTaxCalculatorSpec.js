describe("DeductingTaxCalculator#taxOn", function() {
  var baseCalc,

      deductingCalc = function(fn) {
        return new DeductingTaxCalculator(fn, baseCalc);
      };

  beforeEach(function() {
    baseCalc = { taxOn: function() { return -1; } };
    spyOn(baseCalc, 'taxOn').andReturn(100);
  });

  it("returns what the base calculator returns", function() {
    calc = deductingCalc(function(value) { return 1; });
    expect(calc.taxOn(328253)).toEqual(100);
  });

  it("doesn't deduct more than the value taxed", function() {
    calc = deductingCalc(function(value) { return 10000; });
    calc.taxOn(9999);
    expect(baseCalc.taxOn).toHaveBeenCalledWith(0);
  });

  it('supports dynamic deductions based on the value', function() {
    calc = deductingCalc(function(value) { return value / 10; });
    calc.taxOn(150);
    expect(baseCalc.taxOn).toHaveBeenCalledWith(135);
  });

});
