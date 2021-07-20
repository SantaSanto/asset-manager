package com.santo.portfolio.model.domain.txn;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tbl_nps")
public class NPS extends Txn {
	
	private Integer equity;
	
	private Integer debt;
	
	private Integer glit;
	
}
