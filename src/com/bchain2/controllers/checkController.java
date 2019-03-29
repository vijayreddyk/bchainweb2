package com.bchain2.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.formbackingobject.signUpFormbackingobject;

public class checkController extends SimpleFormController{
	@Override
	protected Object formBackingObject(HttpServletRequest request) throws Exception {
		setFormView("homePage");
		return null;
	}
	@Override
	protected ModelAndView onSubmit(HttpServletRequest request, HttpServletResponse response, Object command,
			BindException errors) throws Exception {
		return null;
	}
}
