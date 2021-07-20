package com.santo.portfolio.model.dto.txn;

import com.santo.portfolio.model.dto.config.NameValue;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TxnDetail extends BaseTxn {

	private NameValue category;
}
