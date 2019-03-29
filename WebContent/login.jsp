<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<%@ include file="commonLibraries.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
</head>
<body>
	<div class="fluid-container" style="padding-top: 20px;">
		<div class="row" style="padding-right: 50px;text-align: right;">
			<input type="button" value="Sign Up" class="button btn-success" onclick="doSignUp()"/>
		</div>
		<div class="row">
			<form onsubmit="doLogin()">
				<div class="col-md-4 col-sm-4"></div>
				<div class="col-md-4 col-sm-4">
					<table class="table table-bordered">
						<thead>
							<tr style="background-color: gray;text-align: center;">
								<td colspan="2">B-Chain</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><b>User Id</b></td>
								<td><input class="form-control" type="text" id="userid"
									name="userid" /></td>
							</tr>
							<tr>
								<td><b>password</b></td>
								<td><input class="form-control" type="text" id="password"
									name="password" /></td>
							</tr>
							<tr>
								<td colspan="2"><input type="submit" class="form-control"
									id="login" value="Login" /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-4 col-sm-4"></div>
			</form>
		</div>
	</div>
</body>
<script type="text/javascript">
	function doSignUp(){
		window.open("signupController.htm","_self");
	}
	function doLogin(){
		document.forms[0].action = "loginController.htm";
		document.forms[0].submit();
	}
</script>
</html>