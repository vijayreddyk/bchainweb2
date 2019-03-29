package com.bchain2.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.dao.LoginDao;
import com.bchain2.formbackingobject.HomePageformbackingObject;
import com.bchain2.forms.McmsRedirectView;

public class LoginController implements Controller{
	
	@Override
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HomePageformbackingObject backingObject = new HomePageformbackingObject();
		String userid = request.getParameter("userid");
		String password = request.getParameter("password");
		LoginDao loginDao = new LoginDao();
		if(loginDao.checkLoginDetails(userid,password)) {
			return new ModelAndView(new McmsRedirectView("homePageController.htm"));
		} else {
			return new ModelAndView(new McmsRedirectView("loginPage.jsp"));
		}
		
	}

}
