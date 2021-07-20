package com.santo.portfolio.model.dto.txn;

import lombok.Data;

@Data
public abstract class AbstractTxn {

	private Long id;

	private Long assetId;

	private String date;

	private Integer amount;

}
