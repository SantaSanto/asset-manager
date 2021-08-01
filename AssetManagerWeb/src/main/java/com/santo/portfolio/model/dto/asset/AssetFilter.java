package com.santo.portfolio.model.dto.asset;

import java.util.Arrays;
import java.util.List;

import lombok.Data;

@Data
public class AssetFilter {

	private List<String> status = Arrays.asList("A");
	
	private List<String> portfolio;

}
