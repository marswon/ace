/**
 * 
 */
package org.activiti5.standalone.cfg;

import java.util.Date;

/**
 * @author Bassam Al-Sarori
 *
 */
public class CustomTask {

  protected String id;
  protected String name;
  protected String owner;
  protected String assignee;
  protected Date createTime;
  protected int priority;
  
  public String getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public String getOwner() {
    return owner;
  }
  public String getAssignee() {
    return assignee;
  }
  public Date getCreateTime() {
    return createTime;
  }
  public int getPriority() {
    return priority;
  }
  
}
