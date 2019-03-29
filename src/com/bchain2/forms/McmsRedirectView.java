/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2016 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
package com.bchain2.forms;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractUrlBasedView;

/**
 * A redirect view that propogates both the model values and any other values passed
 * @author collinl
 *
 */
public class McmsRedirectView extends AbstractUrlBasedView {

	public static final String DEFAULT_ENCODING_SCHEME = "UTF-8";
	

	private boolean contextRelative = false;

	private boolean http10Compatible = true;

	private String encodingScheme = DEFAULT_ENCODING_SCHEME;


	/**
	 * Constructor for use as a bean.
	 */
	public McmsRedirectView() {
	}

	/**
	 * Create a new RedirectView with the given URL.
	 * <p>The given URL will be considered as relative to the web server,
	 * not as relative to the current ServletContext.
	 * @param url the URL to redirect to
	 * @see #RedirectView(String, boolean)
	 */
	public McmsRedirectView(String url) {
		setUrl(url);
	}

	/**
	 * Create a new RedirectView with the given URL.
	 * @param url the URL to redirect to
	 * @param contextRelative whether to interpret the given URL as
	 * relative to the current ServletContext
	 */
	public McmsRedirectView(String url, boolean contextRelative) {
		setUrl(url);
		this.contextRelative = contextRelative;
	}

	/**
	 * Create a new RedirectView with the given URL.
	 * @param url the URL to redirect to
	 * @param contextRelative whether to interpret the given URL as
	 * relative to the current ServletContext
	 * @param http10Compatible whether to stay compatible with HTTP 1.0 clients
	 */
	public McmsRedirectView(String url, boolean contextRelative, boolean http10Compatible) {
		setUrl(url);
		this.contextRelative = contextRelative;
		this.http10Compatible = http10Compatible;
	}

	/**
	 * Set whether to interpret a given URL that starts with a slash ("/")
	 * as relative to the current ServletContext, i.e. as relative to the
	 * web application root.
	 * <p>Default is false: A URL that starts with a slash will be interpreted
	 * as absolute, i.e. taken as-is. If true, the context path will be
	 * prepended to the URL in such a case.
	 * @see javax.servlet.http.HttpServletRequest#getContextPath
	 */
	public void setContextRelative(boolean contextRelative) {
		this.contextRelative = contextRelative;
	}

	/**
	 * Set whether to stay compatible with HTTP 1.0 clients.
	 * <p>In the default implementation, this will enforce HTTP status code 302
	 * in any case, i.e. delegate to <code>HttpServletResponse.sendRedirect</code>.
	 * Turning this off will send HTTP status code 303, which is the correct
	 * code for HTTP 1.1 clients, but not understood by HTTP 1.0 clients.
	 * <p>Many HTTP 1.1 clients treat 302 just like 303, not making any
	 * difference. However, some clients depend on 303 when redirecting
	 * after a POST request; turn this flag off in such a scenario.
	 * @see javax.servlet.http.HttpServletResponse#sendRedirect
	 */
	public void setHttp10Compatible(boolean http10Compatible) {
		this.http10Compatible = http10Compatible;
	}

	/**
	 * Set the encoding scheme for this view.
	 */
	public void setEncodingScheme(String encodingScheme) {
		this.encodingScheme = encodingScheme;
	}


	/**
	 * Convert model to request parameters and redirect to the given URL.
	 * @see #appendQueryProperties
	 * @see #sendRedirect
	 */
	protected final void renderMergedOutputModel(
			Map model, HttpServletRequest request, HttpServletResponse response) throws IOException {

		// prepare target URL
		StringBuffer targetUrl = new StringBuffer();
		if (this.contextRelative && getUrl().startsWith("/")) {
			// do not apply context path to relative URLs
			targetUrl.append(request.getContextPath());
		}
		targetUrl.append(getUrl());
		appendQueryProperties(targetUrl, model, this.encodingScheme);
		

		sendRedirect(request, response, targetUrl.toString(), this.http10Compatible);
	}

	

	/**
	 * Append query properties to the redirect URL.
	 * Stringifies, URL-encodes and formats model attributes as query properties.
	 * @param targetUrl the StringBuffer to append the properties to
	 * @param model Map that contains model attributes
	 * @param encodingScheme the encoding scheme to use
	 * @throws UnsupportedEncodingException if string encoding failed
	 * @see #queryProperties
	 */
	protected void appendQueryProperties(StringBuffer targetUrl, Map model, String encodingScheme)
			throws UnsupportedEncodingException {

		// if there are not already some parameters, we need a ?
		if(getUrl()!=null)
		{
			boolean first = (getUrl().indexOf('?') < 0);
			Iterator entries = queryProperties(model).entrySet().iterator();
			while (entries.hasNext()) {
				if (first) {
					targetUrl.append('?');
					first = false;
				}
				else {
					targetUrl.append('&');
				}
				Map.Entry entry = (Map.Entry) entries.next();
				String encodedKey = URLEncoder.encode(entry.getKey().toString(), DEFAULT_ENCODING_SCHEME);
				String encodedValue = (entry.getValue() != null ? URLEncoder.encode(entry.getValue().toString(), DEFAULT_ENCODING_SCHEME) : "");
				targetUrl.append(new String(encodedKey.getBytes(encodingScheme), encodingScheme));
				targetUrl.append("=");
				targetUrl.append(new String(encodedValue.getBytes(encodingScheme), encodingScheme));
			}
		}
	}

	/**
	 * Determine name-value pairs for query strings, which will be stringified,
	 * URL-encoded and formatted by appendQueryProperties.
	 * <p>This implementation returns all model elements as-is.
	 * @see #appendQueryProperties
	 */
	protected Map queryProperties(Map model) {
		return model;
	}

	/**
	 * Send a redirect back to the HTTP client
	 * @param request current HTTP request (allows for reacting to request method)
	 * @param response current HTTP response (for sending response headers)
	 * @param targetUrl the target URL to redirect to
	 * @param http10Compatible whether to stay compatible with HTTP 1.0 clients
	 * @throws IOException if thrown by response methods
	 */
	protected void sendRedirect(
			HttpServletRequest request, HttpServletResponse response, String targetUrl, boolean http10Compatible)
			throws IOException {
		//System.out.println("targetUrl is :"+targetUrl);
		if (http10Compatible) {
			// always send status code 302
			response.sendRedirect(response.encodeRedirectURL(targetUrl));
		}
		else {
			// correct HTTP status code is 303, in particular for POST requests
			response.setStatus(303);
			response.setHeader("Location", response.encodeRedirectURL(targetUrl));
		}
	}

}
