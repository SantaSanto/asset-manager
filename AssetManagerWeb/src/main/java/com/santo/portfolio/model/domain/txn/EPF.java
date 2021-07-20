package com.santo.portfolio.model.domain.txn;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class EPF extends Txn {
	
	private String company;
	
	private Integer employee;
	
	private Integer employer;
	
}
