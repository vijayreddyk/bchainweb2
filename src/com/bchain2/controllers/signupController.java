package com.bchain2.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.dao.SignUpDao;
import com.bchain2.formbackingobject.signUpFormbackingobject;
import com.bchain2.forms.McmsRedirectView;

public class signupController extends BchainFormController{
	public signupController() {
		super();
	}
	@Override
	protected Object formBackingObject(HttpServletRequest request) throws Exception {
		signUpFormbackingobject backingObject = new signUpFormbackingobject();
		SignUpDao dao = new SignUpDao();
		backingObject.setBranchList(dao.setBranchNames());
		setFormView("signUp");
		return backingObject;
	}
	@Override
	protected ModelAndView onSubmit(HttpServletRequest request, HttpServletResponse response, Object command,
			BindException errors) throws Exception {
		signUpFormbackingobject backingObject = (signUpFormbackingobject) command;
		SignUpDao dao = new SignUpDao();
		try {
			boolean isSignUpSuccess = dao.saveSignupDetails(backingObject);
			if(isSignUpSuccess) {
				return new ModelAndView(new McmsRedirectView("login.jsp"));
			} else {
				return new ModelAndView(new McmsRedirectView("signupController.htm"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView(new McmsRedirectView("signupController.htm"));
		}
	}
}
