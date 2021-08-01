package com.santo.portfolio.model.dto.asset;

import com.santo.portfolio.model.dto.config.Instrument;
import com.santo.portfolio.model.dto.config.NameValue;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BaseAsset extends AbstractAsset {

	private Instrument instrument;

	private NameValue institution;	

	private Integer current;
	
	private Integer projected;

	private Double xirr;

}
