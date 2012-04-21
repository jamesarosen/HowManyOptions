(function(exports) {

  var INFINITI = Math.min();

  function taxOn(value, tiers) {
    var result = 0,
        rate,
        ceiling,
        floor = 0;

    for (var i = 0; value > floor && i < tiers.length; ++i) {
      rate        = tiers[i][0];
      ceiling     = tiers[i][1] || INFINITI;
      valueInTier = Math.max(0, Math.min(value, ceiling) - floor);
      result      += valueInTier * rate;
      floor       = ceiling;
    }
    return result;
  }

  // Usage:
  //
  // // 10% on the first 10k; 20% on everything after
  // var calc = new TieredTaxCalculator([ [ 0.1, 10000 ], [ 0.2 ] ]
  // calc.taxOn(15000) => ( 10000 * 0.1 + 5000 * 0.2 ) => 2000
  function TieredTaxCalculator(tiers) {
    this.tiers = tiers;
  };

  TieredTaxCalculator.prototype.taxOn = function(value) {
    return taxOn(value, this.tiers);
  }

  exports.TieredTaxCalculator = TieredTaxCalculator;

}(this));
