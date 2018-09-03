var mode = -1;

var main=function(){
	$('.connectbutton').click(function(event) {
		//callback hell time
		bluetoothSerial.list(function(devices){
			//alert("running function")
			devicelist(devices);
		})
	});
}

function devicelist(devices){
	//alert("HC-06 has length"+"HC-06".length)
	for (var i in devices)
	{
		//alert("Checking "+devices[i].name+" with length "+devices[i].name.length+" against HC-06")

		if (devices[i].name=="HC-06")
		{
			//alert("detected on I "+i)

			result = devices[i].id;

			bluetoothSerial.connect(result,function(){
				alert("Initializing connection... Please wait")
			})
			bluetoothSerial.subscribe('\n', ondata);
		}
	}
}

function ondata(str){
	if (mode==-1)
	{
		on_connect_success()
		mode=1;
	}

	strchanged =  str.replace(/'/g,'"')
	//alert("str changed: "+strchanged)

	data = JSON.parse(strchanged)
	//alert("New JSON string: "+JSON.stringify(data))

	if (parseInt(data.mode)==1)
	{
		dm=="Tracking"
	}

	if (parseInt(data.mode)==2)
	{
		dm=="Reset"
	}

	if (parseInt(data.mode)==3)
	{
		dm=="Drive"
	}

	if (parseInt(data.mode)==4)
	{
		dm=="End of Tracking"
	}

	$('.databar').text("Current speed: "+data.trafreq+" & mode: "+dm)
}

function on_connect_success(){
	alert("Connected!");

	$('.checkbox').css({"background-color":"#850000"})

	$('.trackbutton').click(function(event) {
		bluetoothSerial.write("t",function(){
			//alert("sent t");
		})
	});

	$('.revbutton').click(function(event) {
		bluetoothSerial.write("r",function(){
			//alert("sent r");
		})
	});

	$('.drivebutton').click(function(event) {
		bluetoothSerial.write("d",function(){
			//alert("sent r");
		})
	});

	$('.incbutton').click(function(event) {
		bluetoothSerial.write("+",function(){
			//alert("sent r");
		})
	});

	$('.decbutton').click(function(event) {
		bluetoothSerial.write("-",function(){
			//alert("sent r");
		})
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