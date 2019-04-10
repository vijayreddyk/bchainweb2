package com.bchain2.controllers;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.dao.SignUpDao;
import com.bchain2.formbackingobject.signUpFormbackingobject;
import com.bchain2.forms.McmsRedirectView;
import com.bchain2.validators.SignupValidator;
import com.itextpdf.text.log.SysoCounter;

public class signupController extends BchainFormController{
	
	private static final SignupValidator validator = new SignupValidator();
	public signupController() {
		super();
		setValidator(validator);
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
	protected void onBindAndValidate(HttpServletRequest request, Object command, BindException errors)
			throws Exception {
		signUpFormbackingobject backingObject = (signUpFormbackingobject) command;
		System.out.println(backingObject);
	}
	@Override
	protected ModelAndView processFormSubmission(HttpServletRequest request, HttpServletResponse response,
			Object command, BindException errors) throws Exception {
		ModelAndView ret = null;
		@SuppressWarnings("rawtypes")
		List list = errors.getAllErrors();
		@SuppressWarnings("rawtypes")
		Iterator itr = list.iterator();
		while(itr.hasNext()){
			System.out.println("Error is :"+itr.next());
		}
		if (errors.getErrorCount() == 0) {
			ret = onSubmit(request, response, command, errors);
		} else {
			ret = showForm(request, response, errors);
		}
		return ret;
	}
	@Override
	protected ModelAndView onSubmit(HttpServletRequest request, HttpServletResponse response, Object command,
			BindException errors) throws Exception {
		signUpFormbackingobject backingObject = (signUpFormbackingobject) command;
		SignUpDao dao = new SignUpDao();
		try {
			int a = 2/0;
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
