describe("DeductingTaxCalculator", function() {
  var baseCalc,

      deductingCalc = function(fn) {
        return DeductingTaxCalculator(fn, baseCalc);
      };

  beforeEach(function() {
    baseCalc = jasmine.createSpy().andReturn(100);
  });

  it("returns what the base calculator returns", function() {
    calc = deductingCalc(function(value) { return 1; });
    expect(calc(328253)).toEqual(100);
  });

  it("doesn't deduct more than the value taxed", function() {
    calc = deductingCalc(function(value) { return 10000; });
    calc(9999);
    expect(baseCalc).toHaveBeenCalledWith(0);
  });

  it('supports dynamic deductions based on the value', function() {
    calc = deductingCalc(function(value) { return value / 10; });
    calc(150);
    expect(baseCalc).toHaveBeenCalledWith(135);
  });

});
