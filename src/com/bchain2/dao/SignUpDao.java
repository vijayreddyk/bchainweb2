package com.bchain2.dao;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import com.bchain2.commons.SelectListData;
import com.bchain2.entities.StudentLoginDetails;
import com.bchain2.formbackingobject.signUpFormbackingobject;
import com.bchain2.utils.HibernateUtils;
import com.bchain2.utils.PasswordUtils;

public class SignUpDao {

	public List<SelectListData> setBranchNames() {

		List<SelectListData> selectList = new ArrayList<SelectListData>(10);
		Transaction tx = null;
		List list = null;
		Session session = null;
		PreparedStatement pstmt = null;
		try {
			session = HibernateUtils.openSession();
			tx = session.beginTransaction();
			Query query = session.createSQLQuery("select branch_code,branch_name from branch_mst")
					.addScalar("branch_code", org.hibernate.type.StringType.INSTANCE)
					.addScalar("branch_name", org.hibernate.type.StringType.INSTANCE);
			query.setCacheable(true);
			list = query.list();
			if (list != null && list.size() > 0) {
				Iterator itr = list.iterator();
				while (itr.hasNext()) {
					Object[] obj = (Object[]) itr.next();
					SelectListData data = new SelectListData();
					if (obj[0] != null)
						data.setCode(obj[0].toString());
					if (obj[1] != null)
						data.setName(obj[1].toString());
					selectList.add(data);
				}
			}
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return selectList;
	}

	public boolean saveSignupDetails(signUpFormbackingobject backingObject) {
		Session session = HibernateUtils.openSession();
		Transaction tx = session.beginTransaction();
		String studentId = backingObject.getStudentId();
		SQLQuery query = session.createSQLQuery("select student_id from student_login_details where student_id='"+studentId+"'");
		List signedupUsers = query.list();
		if(signedupUsers == null || signedupUsers.size()==0) {
			StudentLoginDetails loginDetails = new StudentLoginDetails();
			loginDetails.setStudentName(backingObject.getStudentName());
			loginDetails.setStudentId(backingObject.getStudentId());
			loginDetails.setPassword(generateSecurePassword(backingObject.getPassword()));
			loginDetails.setBranch(backingObject.getBranch());
			loginDetails.setAge(backingObject.getAge());
			loginDetails.setGender(backingObject.getGender());
			session.save(loginDetails);
			tx.commit();
			return true;
		} else {
			return false;
		}
	}

	private String generateSecurePassword(String password) {
		 String salt = PasswordUtils.getSalt(30);
		 String mySecurePassword = PasswordUtils.generateSecurePassword(password, salt);
		 return mySecurePassword+"-"+salt;		 
	}
}
