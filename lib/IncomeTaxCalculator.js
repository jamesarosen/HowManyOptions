(function(exports) {

  var BRACKETS = {
        single:          [ [ 0.1,  8700 ], [ 0.15, 35350 ], [ 0.25,  85650 ], [ 0.28, 178650 ], [ 0.33, 388350 ], [ 0.35 ] ],
        joint:           [ [ 0.1, 17400 ], [ 0.15, 70700 ], [ 0.25, 142700 ], [ 0.28, 217450 ], [ 0.33, 388350 ], [ 0.35 ] ],
        separate:        [ [ 0.1,  8700 ], [ 0.15, 35350 ], [ 0.25,  71350 ], [ 0.28, 108725 ], [ 0.33, 194175 ], [ 0.35 ] ],
        headOfHousehold: [ [ 0.1, 12400 ], [ 0.15, 47350 ], [ 0.25, 122300 ], [ 0.28, 198050 ], [ 0.33, 388350 ], [ 0.35 ] ],
      },

      STANDARD_DEDUCTIONS = {
        single:          5950,
        joint:           11900,
        separate:        5950,
        headOfHousehold: 8700
      },

      PERSONAL_DEDUCTION = 3800;

  function IncomeTaxCalculator(status, dependents) {
    var standardDeduction = STANDARD_DEDUCTIONS[status],
        personalDeduction = PERSONAL_DEDUCTION * dependents,
        totalDeduction    = standardDeduction + personalDeduction,
        taxRates          = BRACKETS[status];

    return new DeductingTaxCalculator(
             totalDeduction,
             new TieredTaxCalculatorSpec(taxRates)
           );
  };

  exports.IncomeTaxCalculator = IncomeTaxCalculator;

}(this));
