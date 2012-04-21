(function(exports) {

  // Usage:
  //
  // // Apply a standard deduction of 15k:
  // var calc = new DeductingTaxCalculator(15000, otherCalculator);
  // calc.taxOn(20000) => otherCalculator.taxOn(5000)
  function DeductingTaxCalculator(deduction, baseCalculator) {
    this.deduction = deduction;
    this.baseCalculator = baseCalculator;
  };

  DeductingTaxCalculator.prototype.taxOn = function(value) {
    var deductedValue = Math.max(0, value - this.deduction);
    return this.baseCalculator.taxOn(deductedValue);
  }

  exports.DeductingTaxCalculator = DeductingTaxCalculator;

}(this));
