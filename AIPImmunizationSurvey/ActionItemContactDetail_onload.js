(function($) {
  $(function() {
    var contextSelector = '[ng-controller^="CustomPageController_AIPImmunizationSurvey"]';
    var context = $(contextSelector);

    var doUpdateImmunzationSurvey = function(event) {
      var selectedRadio = $('.check-list input[type="radio"]:checked', context);
      var commentBox = $('textarea', context);

      var data = {
        immunization_comment: commentBox.val(),
        imst_code: selectedRadio.val(),
        immu_code: 'COVID-19',
      };
      var queryParams = null;

      $ImmunizationRecord.post(
        data,
        queryParams,
        function () {
          alert("Immunization Survey submitted successfully.", {
            type: "success",
            flash: true,
          });
        },
        function (response) {
          alert(response.data.errors.errorMessage, {
            type: "error",
            flash: true,
          });
        }
      );
      debugger
      $ActionItemStatusDetail.$save();
    };

    $("#pbid-ActionItemContentDetail-save-button", context).on(
      "click",
      doUpdateImmunzationSurvey,
    );

    $('body').on(
      "change",
      `${contextSelector} .check-list input[type="radio"]`,
      function (event) {
          var isChecked = $(".check-list input[type='radio']:checked", context).length === 1;

          if(isChecked) {
            params.isResponseModified = true;
            $("#pbid-ActionItemContentDetail-save-button", context).removeAttr(
              "disabled"
            );
          } else {
            params.isResponseModified = false;
            $("#pbid-ActionItemContentDetail-save-button", context).attr("disabled", "disabled");
          }
      }
    );
  });
})(jQuery);
