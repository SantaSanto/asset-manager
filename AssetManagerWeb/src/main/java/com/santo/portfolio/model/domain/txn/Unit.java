package com.santo.portfolio.model.domain.txn;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Unit extends Txn {
	
	private Double unit;
	
	private Integer amount;
	
}
