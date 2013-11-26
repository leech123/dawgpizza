$(function(){
	$('.signup-form').submit(function(){
	    //code to execute when the sign-up form is submitted
	    //this is the raw DOM form element
	    //wrap it in a jQuery object so we can use jQuery methods on it
	    var signupForm = $(this);
	    //select a descendant input element with the name "addr-1"
	    var addr1Input = signupForm.find('input[name="addr-1"]');
	    var addr1Value = addr1Input.val();
	    var zipInput = signupForm.find('input[name="zip"]');
	   	var zipValue = zipInput.val();
	    if (addr1Value && addr1Value.trim().length > 0 && zipValue && zipValue.trim().length > 0) {
	    	return true;
	   	} else {
	   		alert("Only spaces is not allowed!");
	   		return false;
	   	}
	});
});