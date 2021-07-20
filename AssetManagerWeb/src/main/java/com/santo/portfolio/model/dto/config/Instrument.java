package com.santo.portfolio.model.dto.config;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Instrument extends NameValue {
	
	private String type;

}
