(function($) {
  $(function() {
    var contextSelector = '[ng-controller^="CustomPageController_AIPImmunizationSurvey"]';
    var context = $(contextSelector);

    var doUpdateImmunzationSurvey = function(event) {
      var selectedRadio = $('.check-list input[type="radio"]:checked', context);
      var commentBox = $('textarea', context);
      var aipRadio = $('#pbid-ActionItemStatusAgree-radio-0-0', context);

      // AIP state changes are updated on click...
      // TODO: see if we can simplify this. Might be a $load or other state variable that we can set to ensure that a save happens
      // This seems to work, but did have 403 errors at one point (may have just been session issues on zpprd)
      // $scope.ActionItemContent.put({
      //   "STATUS_RULE_ID": "32",  // params.actionItemId
      //   "id": "3337", // not sure how to get this dynamically...
      // })
      // for now trigger a click, then make sure the state is set to checked
      // with this method, the AIP logic only runs if it hasn't bee set yet, may be better to keep that functionality
debugger
      aipRadio.trigger('click');
      aipRadio.prop('checked', true);

      var immunizationRecordData = {
        immunization_comment: commentBox.val(),
        imst_code: selectedRadio.val(),
        immu_code: 'COVID-19',
      };
      var queryParams = null;

      $ImmunizationRecord.post(
        immunizationRecordData ,
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

      params.isResponseModified = true;
      // uses the ActionItemContentDetail, ActionItemStatus radio must be a child of this for AIP to update!
      $ActionItemContentDetail.$save();
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
