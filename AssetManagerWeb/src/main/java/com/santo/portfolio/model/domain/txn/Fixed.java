package com.santo.portfolio.model.domain.txn;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tbl_fixed")
public class Fixed extends Txn {

	private Integer amount;
	
}
