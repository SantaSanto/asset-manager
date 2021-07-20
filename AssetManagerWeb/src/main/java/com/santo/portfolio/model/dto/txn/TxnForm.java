package com.santo.portfolio.model.dto.txn;

import com.santo.portfolio.model.dto.asset.AssetType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TxnForm extends BaseTxn {
	
	private String categoryId;

	private AssetType assetType;

}
