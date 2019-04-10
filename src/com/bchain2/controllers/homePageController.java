package com.bchain2.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.mvc.SimpleFormController;

import com.bchain2.formbackingobject.HomePageformbackingObject;

public class homePageController extends BchainFormController{
	public homePageController() {
		super();
	}
	@Override
	protected Object formBackingObject(HttpServletRequest request) throws Exception {
		HomePageformbackingObject homePageObject = new HomePageformbackingObject();
		setFormView("homePage");
		return homePageObject;
	}
	@Override
	protected void onBind(HttpServletRequest request, Object command) throws Exception {
		// TODO Auto-generated method stub
		super.onBind(request, command);
	}
}
