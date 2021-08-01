package com.santo.portfolio.model.dto.asset;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AssetForm extends AbstractAsset {

	private static final String ACTIVE = "A";

	private String instrumentId;	
	
	private String institutionId;	

	private String status = ACTIVE;
}
