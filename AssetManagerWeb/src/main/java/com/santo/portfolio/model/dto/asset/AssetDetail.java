package com.santo.portfolio.model.dto.asset;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AssetDetail extends BaseAsset {
	
	private Double unit;
	
	private Integer employee;
	
	private Integer company;
	
	private Integer equity;
	
	private Integer debt;
	
	private Integer glit;

}
