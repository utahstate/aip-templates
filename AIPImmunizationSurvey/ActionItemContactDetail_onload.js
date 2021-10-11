var contextSelector = '[ng-controller^="CustomPageController_AIPImmunizationSurvey"]';
var context = $(contextSelector);

window.__context = context;
window.__ImmunizationRecord = $ImmunizationRecord;

$hasImmunizationRecord = false;

window.doUpdateImmunzationSurvey = (event) => {
  var selectedRadio = $('.check-list input[type="radio"]:checked', context);
  var commentBox = $('textarea', context);

  var data = {
    immunization_comment: commentBox.val(),
    imst_code: selectedRadio.val(),
  };
  var queryParams = null;
  console.log(data)

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
console.log(arguments, data, selectedRadio, commentBox)
      alert(response.data.errors.errorMessage, {
        type: "error",
        flash: true,
      });
    }
  );
};

$("#pbid-ActionItemContentDetail-save-button", context).attr(
  "onclick",
  "return doUpdateImmunzationSurvey(event);"
);

$('.check-list', context).on(
  "change",
  'input[type="radio"]',
  function (event) {
      var isChecked = $(".check-list input[type='radio']:checked", context).length === 1;

      if(isChecked) {
        if(!$hasImmunizationRecord) {
            params.isResponseModified = true;
        }
        $("#pbid-ActionItemContentDetail-save-button", context).removeAttr(
          "disabled"
        );
      } else {
        params.isResponseModified = false;
        $("#pbid-ActionItemContentDetail-save-button", context).attr("disabled", "disabled");
      }
  }
);
setTimeout( () => {
    //$ActionItemStatusAgree.load();
    if($ActionItemContentDetail && $ActionItemContentDetail.STATUS_COUNT > 0) {
        $hasImmunizationRecord = true;
    }
},
300);
