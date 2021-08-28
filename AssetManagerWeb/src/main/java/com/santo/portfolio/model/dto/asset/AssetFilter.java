package com.santo.portfolio.model.dto.asset;

import java.util.List;
import java.util.Objects;

import com.santo.portfolio.common.IConstant;

import lombok.Data;

@Data
public class AssetFilter {

	private List<String> instrument;

	private List<String> institution;

	private List<String> holder;

	private List<String> portfolio;

	private String status;

	private String sortBy;

	private String sortDirection;

	public boolean isEmpty() {
		return isEmpty(instrument) 
				&& isEmpty(institution)
				&& isEmpty(holder)
				&& isEmpty(portfolio)
				&& IConstant.DEFAULT_STATUS.equalsIgnoreCase(status);
	}

	private boolean isEmpty(List<?> collection) {
		return Objects.nonNull(collection) && collection.isEmpty();
	}
}
