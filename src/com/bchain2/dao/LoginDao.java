package com.bchain2.dao;

import java.util.Iterator;
import java.util.List;
import java.util.regex.PatternSyntaxException;

import org.hibernate.SessionException;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.TransactionException;

import com.bchain2.utils.HibernateUtils;
import com.bchain2.utils.PasswordUtils;

public class LoginDao {

	@SuppressWarnings("null")
	public boolean checkLoginDetails(String userid, String password) {
		Session session = HibernateUtils.openSession();
		Transaction tx = session.beginTransaction();
		try {
			SQLQuery query = session.createSQLQuery("select student_id,password from student_login_details where student_id='"+userid+"'");
			List<Object> studentDetails = query.list();
			if(studentDetails != null && studentDetails.size() == 1) {
				Iterator<Object> itr = studentDetails.iterator();
				Object[] details = (Object[]) itr.next();
				String securePassword[] = ((String) details[1]).split("-");
				if(PasswordUtils.verifyUserPassword(password, securePassword[0], securePassword[1])) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch(SessionException e) {
			e.printStackTrace();
			return false;
		} catch(TransactionException e) {
			e.printStackTrace();
			return false;
		} catch (PatternSyntaxException e) {
			e.printStackTrace();
			return false;
		} finally {
			session.close();
		}
	}
	
}
