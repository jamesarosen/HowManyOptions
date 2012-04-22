(function(exports) {

  // Usage:
  //
  // // Apply a standard deduction of 15k:
  // var calc = new DeductingTaxCalculator(function() { return 15000; }, otherCalculator);
  // calc.taxOn(20000) => otherCalculator.taxOn(5000)
  function DeductingTaxCalculator(deductor, baseCalculator) {
    this.deductor = deductor;
    this.baseCalculator = baseCalculator;
  };

  DeductingTaxCalculator.prototype.taxableIncome = function(value) {
    return Math.max( 0, value - this.deductor(value) );
  };

  DeductingTaxCalculator.prototype.taxOn = function(value) {
    return this.baseCalculator.taxOn( this.taxableIncome(value) );
  };

  exports.DeductingTaxCalculator = DeductingTaxCalculator;

}(this));
