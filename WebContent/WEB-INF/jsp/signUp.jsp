<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@include file="/commonLibraries.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>signUp</title>
</head>
<body>
	<div class="container-fluid" style="padding-top: 20px;">
		<div class="row">
			<div class="col-md-4 col-sm-4"></div>
			<div class="col-md-4 col-sm-4">
				<form onsubmit="doSignUp()">
					<table class="table table-bordered">
						<tr>
							<td colspan="2" style="text-align: center;background-color: graytext;">Sign Up</td>
						</tr>
						<tr>
							<td><b>Student name</b></td>
							<td><spring:bind path="commandObject.studentName">
									<input type="text" name="<c:out value='${status.expression}'/>"
										id="<c:out value='${status.expression}'/>"
										value="<c:out value='${status.value}'/>" class="form-control" />
								</spring:bind></td>
						</tr>
						<tr>
							<td><b>Student Id</b></td>
							<td><spring:bind path="commandObject.studentId">
									<input type="text" id="<c:out value='${status.expression}'/>"
										name="<c:out value='${status.expression}'/>"
										value="<c:out value='${status.value}'/>" class="form-control" />
								</spring:bind></td>
						</tr>
						<tr>
							<td><b>Pass word</b></td>
							<td><spring:bind path="commandObject.password">
									<input type="password"
										id="<c:out value='${status.expression}'/>"
										name="<c:out value='${status.expression}'/>"
										value="<c:out value='${status.value}'/>" class="form-control" />
								</spring:bind></td>
						</tr>
						<tr>
							<td><b>Branch</b></td>
							<td>
									<spring:bind path="commandObject.branch">
										<c:set var="selectedStatus" value="${status.value}" />
										<select name="<c:out value='${status.expression}'/>" id="<c:out value='${status.expression}'/>" class="form-control">
											<option value="">Select</option>
											<c:forEach items="${commandObject.branchList}" var="row" varStatus="status">
												<option <c:if test="${selectedStatus == row.code}">selected</c:if> value="<c:out value='${row.code}'/>">
													<c:out value="${row.name}" />
												</option>
											</c:forEach>
										</select>
									</spring:bind>
							</td>
						</tr>
						<tr>
							<td><b>Gender</b></td>
							<td>
								<spring:bind path="commandObject.gender">
									<input type="radio" value="M"  name="gender"/>M<br>
									<input type="radio" value="F" name="gender"/>F<br> 
								</spring:bind>
							</td>
						</tr>
						<tr>
							<td><b>Age</b></td>
							<td><spring:bind path="commandObject.age">
									<input type="text" id="<c:out value='${status.expression}'/>"
										name="<c:out value='${status.expression}'/>"
										value="<c:out value='${status.value}'/>" class="form-control" />
								</spring:bind></td>
						</tr>
						<tr>
							<td colspan="2" style="text-align: center;"><input type="submit"
								id="signup" name="signup" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
	function doSignUp() {
		document.forms[0].action = "signupController.htm";
		document.forms[0].method = "POST";
		document.forms[0].submit();
	}
</script>
</html>