var main=function(){
	$('.connectbutton').click(function(event) {
		//callback hell time
		bluetoothSerial.list(devicelist(devices))
	});
}

function devicelist(devices){
	for (var i in devices)
	{
		if (devices[i].name=="HC-06")
		{
			alert("detected on I "+i)

			result = devices[i].id;

			bluetoothSerial.connect(result,on_connect_success())
		}
	}
}

function on_connect_success(){
	alert("Successful connection");

	$('.trackbutton').click(function(event) {
		bluetoothSerial.send("t")
	});

	$('.revbutton').click(function(event) {
		bluetoothSerial.send("r")
	});
}

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

window.onresize = function(event) {
resizeDiv();
}


function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();

	m=detectmob()
}


$(document).ready(main)
$(document).ready(resizeDiv)