(function(exports) {

  var BRACKETS = {
        single:          [ [ 0.26, 175000 ], [ 0.28 ] ],
        joint:           [ [ 0.26, 175000 ], [ 0.28 ] ],
        separate:        [ [ 0.26,  87500 ], [ 0.28 ] ],
        headOfHousehold: [ [ 0.26, 175000 ], [ 0.28 ] ],
      },

      EXEMPTIONS = {
        single:          33750,
        joint:           45000,
        separate:        33750,
        headOfHousehold: 33750
      },

      EXEMPTION_PHASE_OUT_BEGINS = {
        single:          112500,
        joint:           150000,
        separate:         75000,
        headOfHousehold: 112500
      };

  // See http://www.irs.gov/pub/irs-pdf/i6251.pdf, page 8, instructions
  // for line 29.
  function exemption(status, income) {
    var baseExemption   = EXEMPTIONS[status],
        phaseOutBegins  = EXEMPTION_PHASE_OUT_BEGINS[status],
        inPhaseIncome   = Math.max(0, income - phaseOutBegins),
        phasedExemption = inPhaseIncome * 0.25;

    return Math.max(0, EXEMPTIONS[status] - phasedExemption);
  }

  function taxableIncome(status, income) {
    return Math.max(0, income - exemption(status, income));
  }

  function AlternativeMinimumTaxCalculator(status) {
    this.status = status;
    this.baseCalculator = new TieredTaxCalculator(BRACKETS[status]);
  };

  AlternativeMinimumTaxCalculator.prototype.taxOn = function(income) {
    return this.baseCalculator.taxOn( taxableIncome(this.status, income) );
  };

  exports.AlternativeMinimumTaxCalculator = AlternativeMinimumTaxCalculator;

}(this));
