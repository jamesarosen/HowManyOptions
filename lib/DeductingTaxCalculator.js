(function(exports) {

  function taxableIncome( deductor, value ) {
    return Math.max( 0, value - deductor(value) );
  }

  // Usage:
  //
  // // Apply a standard deduction of 15k:
  // var calc = DeductingTaxCalculator(function() { return 15000; }, otherCalculator);
  // calc(20000) => otherCalculator(5000)
  function DeductingTaxCalculator(deductor, baseCalculator) {
    return function(value) {
      return baseCalculator( taxableIncome(deductor, value) );
    };
  };

  exports.DeductingTaxCalculator = DeductingTaxCalculator;

}(this));
