<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
Map<String,Object> p=new HashMap<String,Object>();
p.put("sys_login_bg_img", "/portal/dynamic/portal/security/uf/login.png");
p.put("sys_name", "武陵区掌上统战管理平台");
session.setAttribute("cfg", p);
RequestDispatcher dispatcher = request.getRequestDispatcher("../login.jsp");
dispatcher .forward(request, response);
%>