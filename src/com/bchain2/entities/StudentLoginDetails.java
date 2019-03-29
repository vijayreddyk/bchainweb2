package com.bchain2.entities;

import java.io.Serializable;

public class StudentLoginDetails implements Serializable{
	private long id;
	private String studentName;
	private String studentId;
	private String password;
	private String branch;
	private String gender;
	private int age;
	
	public StudentLoginDetails(String studentName,String studentId,String password,String branch,int age,String gender) {
		this.studentName = studentName;
		this.studentId = studentId;
		this.password = password;
		this.branch = branch;
		this.age = age;
		this.gender = gender;
	}
	public StudentLoginDetails() {
		// TODO Auto-generated constructor stub
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
}
