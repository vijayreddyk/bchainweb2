package com.bchain2.formbackingobject;

import java.util.List;

import com.bchain2.commons.SelectListData;

public class signUpFormbackingobject {
	private String studentName;
	private String studentId;
	private String password;
	private String branch;
	private List<SelectListData> branchList;
	private String gender;
	private int age;
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public List<SelectListData> getBranchList() {
		return branchList;
	}
	public void setBranchList(List<SelectListData> branchList) {
		this.branchList = branchList;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	
}
