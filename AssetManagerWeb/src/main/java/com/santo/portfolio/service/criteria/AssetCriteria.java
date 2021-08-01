package com.santo.portfolio.service.criteria;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Predicate;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.dto.asset.AssetFilter;

@Component
public class AssetCriteria implements Function<AssetFilter, Specification<Asset>> {

	final List<String> defaultStatus = Arrays.asList("A");
	
	private Specification<Asset> filterPortfolio(final List<String> portfolio) {
		return (root, query, criteriaBuilder) -> root.get(IConstant.PORTFOLIO).in(portfolio);
	}

	private Specification<Asset> filterStatus(final List<String> status) {
		return (root, query, criteriaBuilder) -> root.get(IConstant.STATUS).in(status);
	}

	@Override
	public Specification<Asset> apply(final AssetFilter asset) {
		
		Specification<Asset> spec = null;
		
		if(notEmpty.test(asset.getStatus())) {
			spec = filterStatus(asset.getStatus());
		} else {
			spec = filterStatus(defaultStatus);
		}
		
		if(notEmpty.test(asset.getPortfolio())) {
			spec = spec.and(filterPortfolio(asset.getPortfolio()));
		}
		
		return spec;		

	}
	
	private Predicate<List<?>> notEmpty = (target) -> !(Objects.isNull(target) || target.isEmpty());
}
