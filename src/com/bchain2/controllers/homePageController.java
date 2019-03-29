package com.bchain2.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.formbackingobject.HomePageformbackingObject;

public class homePageController extends SimpleFormController{
	@Override
	protected Object formBackingObject(HttpServletRequest request) throws Exception {
		HomePageformbackingObject homePageObject = new HomePageformbackingObject();
		setFormView("homePage");
		return homePageObject;
	}
}
