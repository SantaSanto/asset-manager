package com.santo.portfolio.model.dto.txn;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BaseTxn extends AbstractTxn {
	
	private String company;

	private Integer employee;

	private Integer employer;
	
	private Double unit;
	
	private Integer equity;
	
	private Integer debt;
	
	private Integer glit;
}
