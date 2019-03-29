/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2016 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
package com.bchain2.commons;

import java.io.Serializable;

public class SelectListData implements Serializable{
	
	private String code;
    private String name;
    
    public SelectListData() {
	}
    public SelectListData(String code,String name) {
		this.code = code;
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

    @Override
    public String toString() {
    	// TODO Auto-generated method stub
    	return "{ \""+code+"\",\""+name+"\" }";
    }
	public String getDollarSeparatedString() {
		// TODO Auto-generated method stub
		return code+"$"+name;
	}
	public boolean equals(SelectListData obj) {
		if(obj!=null)
	return obj.code.equals(this.code)&&obj.name.equals(this.name);
		else
			return false;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof SelectListData){
			
			return ((SelectListData)obj).code.equals(this.code)&&((SelectListData)obj).name.equals(this.name);
		}else{
			return false;
		}
	}
	@Override
	public int hashCode() {
		return super.hashCode();
	}
	
}
