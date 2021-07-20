package com.santo.portfolio.model.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Asset {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String name;
	
	private String instrument;
	
	private String account;
	
	private String portfolio;
	
	private String status;	

	private Integer current;
	
	private Double unit;
	
	private Double xirr;

	private Integer projected;
	
	private Integer employee;
	
	private Integer company;
	
	private Integer equity;
	
	private Integer debt;
	
	private Integer glit;	
	
}
