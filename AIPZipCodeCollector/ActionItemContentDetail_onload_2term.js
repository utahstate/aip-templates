// ActionItemContentDetail_onload_2term.js
// This template is for collecting summer and fall zip codes.
var contextSelector = '[page="AIPZipCodeCollector202230"]';
var context = $(contextSelector);

var styleRules = [
  "#pbid-TextZipCodeSummer-container, #pbid-TextZipCodeFall-container { font-size: 1.10em; font-weight: bold; color: #4f585f; line-height: 1.4; padding-left: .75em;}",
  "button.primary[disabled] { background-color: #ddd !important; }",
  "fieldset { border: 0 none; padding: 1em 0; }",
  ".zip-code-collector-submitted-message { padding: 1em .7em 0; font-size: 1.25em; }",
  "div.pb-literal { margin: 2em 0; line-height: 1.4; }",
  "span.pb-detail { margin: 2em 0; line-height: 1.4; display: block; }",
  "legend { display: none; }",
  ".pagination-container { display: none; }",
  "table { border: 0 none; }",
  "td { padding: 5px 15px; }",
  "th { padding: 5px 15px; }",
  "thead tr { border-bottom: solid 1px #ddd; }",
  "tbody tr:nth-child(even) { background-color: #eaeaea; }",
].join(" " + contextSelector + " ");

$("<" + "style>" + styleRules + "<" + "/style>").appendTo(context);

function removeZipCodeField() {
  $('input[type="text"]', context).each(function() {
      $(this).closest('form').replaceWith('<div class="zip-code-collector-submitted-message">Zip Code has been submitted for this semester.</div>');
      $('input[type="checkbox"]', context).attr('disabled', 'disabled');
  })
}

// submit summer
window.doUpdateZipCodeCollector = function(event) {
  $ModelStudentLocation.$post({ TERM_CODE: '202230', ZIP_CODE: $TextZipCodeSummer }, null, function() {
    // submit fall
    $ModelStudentLocation.$post({ TERM_CODE: '202240', ZIP_CODE: $TextZipCodeFall }, null, function() {
      alert("Zip Code submitted successfully.", {type:"success", flash:true});
      removeZipCodeField();
    }, function() {
      alert($.i18n.prop("js.notification.error"), {type:"error", flash:true});
    });
  }, function() {
    alert($.i18n.prop("js.notification.error"), {type:"error", flash:true});
  });
};

$('#pbid-ActionItemContentDetail-save-button', context).attr('onclick', 'return doUpdateZipCodeCollector(event);');

// handle checkbox/save button state based on valid zipcode being entered (assumes zipcode is only textbox in the component)
$(context).on(
  "change",
  'input[type="checkbox"], input[type="text"]',
  function (event) {
    var hasSummerZipCode =
      typeof $TextZipCodeSummer !== "undefined" &&
      $TextZipCodeSummer.search(/^\d{5}(?:[-\s]\d{4})?$/) === 0;
    var hasFallZipCode =
      typeof $TextZipCodeFall !== "undefined" &&
      $TextZipCodeFall.search(/^\d{5}(?:[-\s]\d{4})?$/) === 0;

    var hasZipCode = hasSummerZipCode && hasFallZipCode;

    var isChecked = $("input[type='checkbox']:checked", context).length === 1;

    if (isChecked && hasZipCode) {
      params.isResponseModified = true;
      $("#pbid-ActionItemContentDetail-save-button", context).removeAttr(
        "disabled"
      );
    } else {
      params.isResponseModified = false;
      $("#pbid-ActionItemContentDetail-save-button", context).attr(
        "disabled",
        "disabled"
      );

      if (!hasZipCode) {
        if (event.target.type == "checkbox") {
          alert("Invalid Zip Code", { type: "error", flash: true });
        }

        $('input[type="checkbox"]', context).removeAttr("checked");
      }
    }
  }
);

// AIP code... changes radio to textbox and manages checkbox state based on AIP item status
setTimeout(function () {
  var isCheckbox = $ActionItemContentDetail && $ActionItemContentDetail.STATUS_COUNT === 1 ? true : false;
  if (isCheckbox) {
    // console.log("need checkbox");
    var radio = $("#pbid-ActionItemStatusAgree-radio-0-0", context);
    radio[0].type = "checkbox";

    // remove textbox
    if($(radio).is(':checked')) {
      removeZipCodeField()
    }
  }
  var isResponseReviewRequired = false;
  if (typeof $ReviewStatus !== "undefined") {
    isResponseReviewRequired = true;
    if (isCheckbox) {
      $("input[type='checkbox']", context).prop({
        disabled: isResponseReviewRequired,
      });
    } else {
      $("input[type='radio']", context).prop({
        disabled: isResponseReviewRequired,
      });
    }
  } else {
    $("#pbid-ActionItemContentDetail-save-button", context).click(function () {
      var selectedResponse = isCheckbox
        ? "pbid-ActionItemStatusAgree-radio-0-0"
        : $("input[type='radio']:checked", context)[0].id;
      var responseElementId = selectedResponse.split(
        "pbid-ActionItemStatusAgree-radio-0-"
      );
      isResponseReviewRequired =
        data[parseInt(responseElementId[1])].STATUS_REV_REQ_IND === "Y"
          ? true
          : false;
      if (isResponseReviewRequired) {
        if (isCheckbox) {
          $("input[type='checkbox']", context).prop({
            disabled: isResponseReviewRequired,
          });
        } else {
          $("input[type='radio']", context).prop({
            disabled: isResponseReviewRequired,
          });
        }
        $("#pbid-ActionItemContentDetail-save-button", context).prop({
          disabled: isResponseReviewRequired,
        });
      }
    });
  }
}, 100);
