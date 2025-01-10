//ActionItemContentDetail_onload_1term.js
// This template is for collecting spring zip codes.
var contextSelector = '[page="AIPZipCodeCollector"]';
var context = $(contextSelector);

var styleRules = [
  "#pbid-TextZipCode-container { font-size: 1.10em; font-weight: bold; color: #4f585f; line-height: 1.4; padding-left: .75em;}",
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
  $('input[type="text"]', context).closest('form').replaceWith('<div class="zip-code-collector-submitted-message">Zip Code has been submitted for this semester.</div>');
  $('input[type="checkbox"]', context).attr('disabled', 'disabled');
}

window.doUpdateZipCodeCollector = function(event) {
  // this isn't working... probably due to angular ng-click hook. not sure it matters though
  // console.log(event);
  // if(typeof $TextZipCode == 'undefined' || $TextZipCode.search(/^\d{5}(?:[-\s]\d{4})?$/) < 0) {
  //   alert("Invalid Zip Code", {type:"error", flash:true});
  //   event.preventDefault();
  //   return false;
  // }

  $ModelStudentLocation.$post({ TERM_CODE: '202520', ZIP_CODE: $TextZipCode }, null, function() {
    alert("Zip Code submitted successfully.", {type:"success", flash:true});
    removeZipCodeField();
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
    var hasZipCode =
      typeof $TextZipCode !== "undefined" &&
      $TextZipCode.search(/^\d{5}(?:[-\s]\d{4})?$/) === 0;

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
  var isCheckbox = $ActionItemContentDetail.STATUS_COUNT === 1 ? true : false;
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
