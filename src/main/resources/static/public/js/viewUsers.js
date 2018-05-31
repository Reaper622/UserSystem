$(document).ready(function(){
	//在这里展示写入立即加载内容
	//显示用户名
	$("#userName").text(CookieUtil.get("user"));

	$(".loading").fadeOut();
	//在这里写入非立即加载内容
	//无用户信息时显示遮盖层
	$("#searchInputs").focus();
	$('#userInforShowArea').dimmer('show');
	//判断是否为外界跳转
	var url = location.search;
	if(url.indexOf("?") !=-1) {
		var url_param = url.split("?")[1];
		var url_param_arr = url_param.split("=");
		showUser(url_param_arr[1]);
	}
});


//定义当前用户
var ByUser = {
	"userName":"",
	"state":0
};

//查询用户
function searchUsers(){
	//获取输入框中的值
	var inputValue = $("#searchInputs").val();
	//检测输入框是否为空
	if(inputValue == ""){alert("输入框为空");return}
	//清空原有数据
	$(".list").children('.item').children('.content').empty();
	$("#userInforShowArea").children(".teal").hide();
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/backstageManagement/selectUserInfo",
		contentType:"application/x-www-form-urlencoded",
		data:{
			"searchValue": inputValue
		},
		dataType:"json",
		beforeSend:function(XMLHttpRequest){
		},
		success:function(person){
			if (person == 0) {alert("没有此用户！");return}
			//除去遮盖层
			$('#userInforShowArea').dimmer('hide');
			ByUser.userName = person.userName;
			ByUser.state = person.state;
			//添加标签
			var tag = "<div class='ui teal huge top right attached label'>";
			switch(person.state){
				case 0:tag += "普通用户</div>";break;
				case 1:tag += "管理员</div>";break;
				case 2:tag += "超级管理员</div>";break;
				default:break;
			}
			$("#userInforShowArea").append(tag);
			//添加用户信息
			$("#userNameShow").append("用户名：" + checkIsNull(person.userName));
			$("#userIdShow").append("学号：" + checkIsNull(person.id));
			$("#userE-mailShow").append("E-mail：" + checkIsNull(person.e_mail));
			$("#userGenderShow").append("性别：" + checkIsNull(person.sex));
			$("#userPhoneShow").append("电话：" + checkIsNull(person.phone_number));
			$("#userMajorShow").append("专业：" + checkIsNull(person.major));
			$("#userClassShow").append("班级：" + checkIsNull(person.class_number));
			$("#userDirShow").append("方向：" + checkIsNull(person.study_direction));
			$("#userBirthShow").append("年龄：" + checkIsNull(person.birth));
			$("#userHabitShow").append("生日：" + checkIsNull(person.habit));
			$("#userAgeShow").append("爱好：" + checkIsNull(person.age));
		},
		complete:function(XMLHttpRequest,textStatus){
            if(textStatus=='timeout'){
                var xmlhttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
                xmlhttp.abort();
            }
    　　},
		error:function(XMLHttpRequest,textStatus){
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
		}
	});
}

//点击修改密码
function reSetPassword(){

		if (ByUser.userName.length == 0) {alert("当前无用户！");return;}
			$.ajax({
				type:"POST",
				url:"http://localhost:8080/backstageManagement/updatePassword",
				contentType:"application/json",
				data:{
					"byUserName":ByUser.userName
				},
				dataType:"json",
				success:function(json){
					var result = parseInt(json.updatePassword);
					alert(result);
					if(result == 1){
					alert("已成功初始化" + ByUser.userName + "的密码!");
					}
					else{
						alert("你没有此权限！");
					}
				},
				error:function(jqXHR){
					alert("ERROR!");
				}
			});
}
//删除用户
function deleteUser(){
	if (ByUser.userName.length == 0) {alert("当前无用户！");return;}
		$.ajax({
				type:"POST",
				url:"http://localhost:8080/backstageManagement/deleteUser",
				contentType:"application/json",
				data:{
					"byUserName":ByUser.userName
				},
				dataType:"json",
				success:function(json){
					var result = parseInt(json.deleteUser);
					if(result == 1){
						alert("已成功删除" + ByUser.userName);
						//清空原有数据
						$(".list").children('.item').children('.content').empty();
						$("#userInforShowArea").children(".teal").fadeOut();
						ByUser = {
							"userName":"",
							"state":0
							};
						//删除用户后显示遮盖层
						$('#userInforShowArea').dimmer('show');
					}
					else{
						alert("你没有此权限！");
					}
					},
				error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.responseText);
						console.log(thrownError);
				}
			});
}
function showUpLevelModal(){
		if (ByUser.userName.length == 0) {alert("当前无用户！");return;}
		$("#changeStateModal").modal("show");
}
function upLevelUser(Chosenstate){
	$("#changeStateModal").modal("hide");
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/backstageManagement/userState",
		contentType:"application/json",
		data:{
			"byUserName":ByUser.userName,
			"state":Chosenstate
		},
		dataType:"json",
		success:function(json){
			var result = parseInt(json.userState);
			if(result == 1){
				alert("已更改改用户权限");
			}
			else{
				alert("你没有此权限!");
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.responseText);
			console.log(thrownError);
	}
	});
}
//外界跳转时执行的ajax
function showUser(searchId){
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/backstageManagement/selectUserInfo",
		contentType:"application/json",
		data:{
			"searchValue":searchId
		},
		dataType:"json",
		beforeSend:function(XMLHttpRequest){
		},
		success:function(person){
			if (person == 0) {alert("没有此用户！");return}
			//除去遮盖层
			$('#userInforShowArea').dimmer('hide');
			ByUser.userName = person.userName;
			ByUser.state = person.state;
			//添加标签
			var tag = "<div class='ui teal huge top right attached label'>";
			switch(person.state){
				case 0:tag += "普通用户</div>";break;
				case 1:tag += "管理员</div>";break;
				case 2:tag += "超级管理员</div>";break;
				default:break;
			}
			$("#userInforShowArea").append(tag);
			//添加用户信息
			$("#userNameShow").append("用户名：" + checkIsNull(person.userName));
			$("#userIdShow").append("学号：" + checkIsNull(person.id));
			$("#userE-mailShow").append("E-mail：" + checkIsNull(person.e_mail));
			$("#userGenderShow").append("性别：" + checkIsNull(person.sex));
			$("#userPhoneShow").append("电话：" + checkIsNull(person.phone_number));
			$("#userMajorShow").append("专业：" + checkIsNull(person.major));
			$("#userClassShow").append("班级：" + checkIsNull(person.class_number));
			$("#userDirShow").append("方向：" + checkIsNull(person.study_direction));
			$("#userBirthShow").append("年龄：" + checkIsNull(person.birth));
			$("#userHabitShow").append("生日：" + checkIsNull(person.habit));
			$("#userAgeShow").append("爱好：" + checkIsNull(person.age));
		},
		complete:function(XMLHttpRequest,textStatus){
            if(textStatus=='timeout'){
                var xmlhttp = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
                xmlhttp.abort();
            }
    　　},
		error:function(XMLHttpRequest,textStatus){
			console.log(XMLHttpRequest.responseText);
			console.log(textStatus);
		}
	});
}
//检查传入数据是否为空
function checkIsNull(content){
	if(content){
		return content;
	}
	else{
		return "无";
	}
}