jQuery(function($) {

  var $filingStatus = $('#filingStatus'),
      $dependents   = $('#dependents'),
      $income       = $('#income'),
      $optionCount  = $('#optionCount'),
      $strikePrice  = $('#strikePrice'),
      $currentValue = $('#currentValue')

      $taxBeforeOptions = $('#taxBeforeOptions'),
      $purchaseCost     = $('#purchaseCost'),
      $totalTax         = $('#totalTax'),
      $costOfOptions    = $('#costOfOptions');

  function recalculate() {
    var filingStatus = $filingStatus.val(),
        dependents   = parseInt($dependents.val(), 10),
        income       = parseFloat($income.val(), 10),
        optionCount  = parseInt($optionCount.val(), 10),
        strikePrice  = parseFloat($strikePrice.val(), 10),
        currentValue = parseFloat($currentValue.val(), 10),

        incomeTaxCalculator = new IncomeTaxCalculator(filingStatus, dependents),
        amtCalculator       = new AlternativeMinimumTaxCalculator(filingStatus),

        taxBeforeOptions = incomeTaxCalculator.taxOn(income),
        purchaseCost     = optionCount * strikePrice,
        bargain          = optionCount * (currentValue - strikePrice),
        amt              = amtCalculator.taxOn( income + bargain ),
        totalTax         = Math.max( taxBeforeOptions, amt ),
        costOfOptions    = purchaseCost + totalTax - taxBeforeOptions;

    $taxBeforeOptions.val(taxBeforeOptions);
    $purchaseCost.val(purchaseCost);
    $totalTax.val(totalTax);
    $costOfOptions.val(costOfOptions);
  }

  $filingStatus
    .add($dependents)
    .add($income)
    .add($optionCount)
    .add($strikePrice)
    .add($currentValue)
    .blur(recalculate);

  recalculate();

});
