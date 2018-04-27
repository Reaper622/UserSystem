function checkusername(){
	var reg = /^[0-9a-zA-Z]+$/;
	var str = document.getElementById("username");
	if(!reg.test(str.value)){
		document.getElementById("checkanwserusername").innerHTML="您输入的字符不是数字或者字母";
	}
	if(str.value==""){
		document.getElementById("checkanwserusername").innerHTML="用户名不能为空";
	}
	if(reg.test(str.value)){
		document.getElementById("checkanwserusername").innerHTML="";
	}


	var xmlhttp;
	if (window.XMLHttpRequest){//IE7+, Firefox, Chrome, Opera, Safari
	       xmlhttp=new XMLHttpRequest();
	}
	else{// IE6, IE5
	       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var username = document.getElementById("username").value;
	xmlhttp.onreadystatechange=function(){
		 	xmlhttp.open("GET","http://localhost:8080/regist/userNameVerify?userName="+username,true);
	 		xmlhttp.send();
	//当接受到响应时回调该方法
	        if (xmlhttp.readyState==4 && (xmlhttp.status==200||xmlhttp.status==0))
	        {
	            var tip = document.getElementById("checkanwserusername");
	            var text = xmlhttp.responseText;
	            var resultJson = eval("("+text+")");
	            var regNameFail	= resultJson.REGIST_NAME_FAIL;
	            var reVerify = resultJson.REGIST_VERIFY_SUCCESS;
	            if (reVerify==1){
	            	tip.innerHTML = "此用户名可用";
	            }
	            else{
	            	tip.innerHTML = "此用户名已经注册";
	            }
	        } 
	}
}
	
	 



function checkemail(){
	var reg=  /^[a-zA-Z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var str = document.getElementById("email");
	if(!reg.test(str.value)){
		document.getElementById("checkanwseremail").innerHTML="您输入的邮箱格式有误，请检查";
	}
	if(str.value==""){
		document.getElementById("checkanwseremail").innerHTML="邮箱不能为空";
	}
	if(reg.test(str.value)){
		document.getElementById("checkanwseremail").innerHTML="";
	}


	var xmlhttp;
	if (window.XMLHttpRequest){//IE7+, Firefox, Chrome, Opera, Safari
	       xmlhttp=new XMLHttpRequest();
	}
	else{// IE6, IE5
	       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var email = document.getElementById("email").value;
	xmlhttp.onreadystatechange=function(){
		 	xmlhttp.open("GET","http://localhost:8080/regist/userEmailVerify?e_mail="+email,true);
	 		xmlhttp.send();
	//当接受到响应时回调该方法
	        if (xmlhttp.readyState==4 && (xmlhttp.status==200||xmlhttp.status==0))
	        {
	            var tip = document.getElementById("checkanwseremail");
	            var text = xmlhttp.responseText;
	            var resultJson = eval("("+text+")");
	            var regEmailFail = resultJson.REGIST_EMAIL_FAIL;
	            var reVerify = resultJson.REGIST_VERIFY_SUCCESS;
	            if (reVerify==1){
	            	tip.innerHTML = "此邮箱可用";
	            }
	            else{
	            	tip.innerHTML = "此邮箱已经注册";
	            }
	        } 
	}	 
}


function checkID(){
	var str = document.getElementById("ID");
	if(str.value.length != 10){
		document.getElementById("checkanwserID").innerHTML="学号输入有误";
	}
	if(str.value==""){
		document.getElementById("checkanwserID").innerHTML="学号不能为空";
	}
	if(str.value.length == 10){
		document.getElementById("checkanwserID").innerHTML="";
	}


	var xmlhttp;
	if (window.XMLHttpRequest){//IE7+, Firefox, Chrome, Opera, Safari
	       xmlhttp=new XMLHttpRequest();
	}
	else{// IE6, IE5
	       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var email = document.getElementById("ID").value;
	xmlhttp.onreadystatechange=function(){
		 	xmlhttp.open("GET","http://localhost:8080/regist/userIdVerify?id="+ID,true);
	 		xmlhttp.send();
	//当接受到响应时回调该方法
	        if (xmlhttp.readyState==4 && (xmlhttp.status==200||xmlhttp.status==0))
	        {
	            var tip = document.getElementById("checkanwserID");
	            var text = xmlhttp.responseText;
	            var resultJson = eval("("+text+")");
	            var regIdFail = resultJson.REGIST_ID_FAIL;
	            var reVerify = resultJson.REGIST_VERIFY_SUCCESS;
	            if (reVerify==1){
	            	tip.innerHTML = "此学号可用";
	            }
	            else{
	            	tip.innerHTML = "此学号已经注册";
	            }
	        } 
	}	 
}


function checkcode(){
	var str = document.getElementById("code");
	if(str.value.length != 6){
		document.getElementById("checkanwsercode").innerHTML="请确认密码为6位数";
	}
	if(str.value==""){
		document.getElementById("checkanwsercode").innerHTML="密码不能为空";
	}
	if(str.value.length == 6){
		document.getElementById("checkanwsercode").innerHTML="";
	}
}


function checkrecode(){
	var str1 = document.getElementById("code");
	var str2 = document.getElementById("recode");
	if(str1.value != str2.value){
		document.getElementById("checkanwserrecode").innerHTML="确认密码与密码不匹配，请重新输入";
	}
	if(str2.value==""){
		document.getElementById("checkanwserrecode").innerHTML="确认密码不能为空";
	}
	if(str1.value == str2.value){
		document.getElementById("checkanwserrecode").innerHTML="";
	}
}

function register(){
	var regyh = /^[0-9a-zA-Z]+$/;
	var yh = document.getElementById("username");
	var regyx=  /^[a-zA-Z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var yx = document.getElementById("email");
	var id = document.getElementById("ID");
	var code = document.getElementById("code");
	var recode = document.getElementById("recode");
	var fx = document.getElementById("direction");
	if(regyh.test(yh.value)){
		if(regyx.test(yx.value)){
			if(id.value.length == 10){
				if(code.value.length == 6){
					if(code.value == recode.value){
						if(fx.innerHTML != "方向"){
							// document.getElementById("checkanwserzc").innerHTML="注册成功";
							$('.ui.basic.modal').modal('show');
						}
						else document.getElementById("checkanwserregister").innerHTML="注册失败,请选择方向";
					}
					else document.getElementById("checkanwserregister").innerHTML="注册失败,两个密码输出不一致";
            	}	
            	else document.getElementById("checkanwserregister").innerHTML="注册失败，密码长度不为6";
        	}
        	else document.getElementById("checkanwserregister").innerHTML="注册失败，学号长度不为10";
		}
		else document.getElementById("checkanwserregister").innerHTML="注册失败，邮箱格式不规范";
	}
	else document.getElementById("checkanwserregister").innerHTML="注册失败，用户名只能为字母或数字";
}




function qianduan(){
	var str = document.getElementsByClassName("item")[0];
	document.getElementById("direction").innerHTML="前端";
	document.getElementById("direction").style.color="black";
}
function houtai(){
	var str = document.getElementsByClassName("item")[1];
	document.getElementById("direction").innerHTML="后台";
	document.getElementById("direction").style.color="black";
}
function ceshi(){
	var str = document.getElementsByClassName("item")[2];
	document.getElementById("direction").innerHTML="测试";
	document.getElementById("direction").style.color="black";
}


// function zhuce(){
// $('.ui.basic.modal')
//   .modal('show')
// ;
// }























