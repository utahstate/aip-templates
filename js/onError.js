//code for "onError"
var logMessage = response.data.errors.errorMessage;
alert(logMessage)

if (response.status == 404)
    alert('invalid resource');
else if (response.status == 500) {
    if (response.data.errors.errorMessage)
        alert(response.data.errors.errorMessage);
    else
        alert(response.data.errors[0].errorMessage);
}
