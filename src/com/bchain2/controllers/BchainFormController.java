package com.bchain2.controllers;

import org.springframework.web.servlet.mvc.SimpleFormController;

public abstract class BchainFormController extends SimpleFormController{
	public BchainFormController() {
		setCommandName("bchainObject");
		setRequireSession(true);
		setSessionForm(true);
		setSynchronizeOnSession(true);
	}
}
