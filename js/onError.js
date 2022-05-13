// ellucian recomended code for "onError"
var logMessage = response.data.errors.errorMessage;
alert(logMessage)

// Example for alert after load error
alert(response.data.errors[0].errorMessage,{type:"error"});

// Example for alert after save error
alert(response.data.errors.errorMessage,{type:"error"});

// Combined example of "onError" used in many demos
if (response.status == 404)
    alert('invalid resource');
else if (response.status == 500) {
    if (response.data.errors.errorMessage)
        alert(response.data.errors.errorMessage);
    else
        alert(response.data.errors[0].errorMessage);
}
