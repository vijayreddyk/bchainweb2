/*******************************************************************************
 * Project MCMS, all source code and data files except images,
 * Copyright 2008-2016 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
package com.bchain2.utils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;


public class HibernateUtils {
	private static SessionFactory sessionFactory = null;
	private static ServiceRegistry serviceRegistry=null;

	public static synchronized SessionFactory getSessionFactory() {
		
		try {
			if (sessionFactory == null) {
			
				Configuration hibConfiguration = new Configuration().configure().addResource("/hibernate.cfg.xml");       
				
				serviceRegistry = new StandardServiceRegistryBuilder().applySettings(hibConfiguration.getProperties()).build();

				sessionFactory = hibConfiguration.buildSessionFactory(serviceRegistry);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sessionFactory;
	}
	public static Session openSession(){
		try{
			SessionFactory sf = HibernateUtils.getSessionFactory();
			Session session = sf.openSession();
			return session;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	public static boolean closeSession(Session session)
	{	
		try{
			session.close();
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}