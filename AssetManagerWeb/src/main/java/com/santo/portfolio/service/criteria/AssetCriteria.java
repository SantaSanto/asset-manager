package com.santo.portfolio.service.criteria;

import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Supplier;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.dto.asset.AssetFilter;

@Component
public class AssetCriteria implements Function<AssetFilter, Specification<Asset>> {

	private static final String DESCENDING = "DESCENDING";

	private Specification<Asset> contains(final String key, final Supplier<List<?>> supplier) {
		return (root, query, criteriaBuilder) -> root.get(key).in(supplier.get());
	}

	private Specification<Asset> equals(final String key, final Supplier<String> supplier) {
		return (root, query, builder) -> builder.equal(root.get(key), supplier.get());
	}

	private Specification<Asset> sort(final String sortBy, final String sortDirection) {
		return (root, query, builder) -> {
			if (DESCENDING.equalsIgnoreCase(sortDirection)) {
				query.orderBy(builder.desc(root.get(sortBy)));
			} else {
				query.orderBy(builder.asc(root.get(sortBy)));
			}
			return builder.and();
		};
	}

	@Override
	public Specification<Asset> apply(final AssetFilter asset) {

		Specification<Asset> spec = equals(IConstant.STATUS, asset::getStatus);

		spec = contains(spec, IConstant.INSTRUMENT, asset::getInstrument);
		spec = contains(spec, IConstant.INSTITUTION, asset::getInstitution);
		spec = contains(spec, IConstant.HOLDER, asset::getHolder);
		spec = contains(spec, IConstant.PORTFOLIO, asset::getPortfolio);

		if (!Objects.isNull(asset.getSortBy())) {
			spec = spec.and(sort(asset.getSortBy(), asset.getSortDirection()));
		}

		return spec;

	}

	private Specification<Asset> contains(Specification<Asset> spec, String key, Supplier<List<?>> supplier) {
		return isEmpty(supplier) ? spec : spec.and(contains(key, supplier));
	}

	private boolean isEmpty(Supplier<List<?>> supplier) {
		List<?> target = supplier.get();
		return Objects.isNull(target) || target.isEmpty();
	}
}
