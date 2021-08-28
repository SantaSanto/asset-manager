package com.santo.portfolio.common.config;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import com.santo.portfolio.model.dto.config.Instrument;
import com.santo.portfolio.model.dto.config.NameValue;

import lombok.Data;

@Component("assetConfig")
@ConfigurationProperties("com.santo.portfolio.config.asset")
@Data
public class AssetConfig {

	private List<Instrument> instruments;
	private List<NameValue> institutions;
	private List<String> holders;
	private List<String> portfolios;
	private List<NameValue> status;
	private List<NameValue> sortBy;
	private List<String> sortDirection;

	public Instrument getInstrument(final String id) {
		return getInstrumentMap().get(id).get(0);
	}

	@Cacheable
	private Map<String, List<Instrument>> getInstrumentMap() {
		return instruments.stream().collect(Collectors.groupingBy(Instrument::getId));
	}

	public NameValue getInstitution(final String id) {
		return getInstitutionMap().get(id).get(0);
	}

	@Cacheable
	private Map<String, List<NameValue>> getInstitutionMap() {
		return institutions.stream().collect(Collectors.groupingBy(NameValue::getId));
	}

	@Cacheable
	public Set<String> getAssetClass() {
		return instruments.stream().map(Instrument::getType).collect(Collectors.toSet());
	}

	@Cacheable
	private Map<String, List<NameValue>> getStatusMap() {
		return status.stream().collect(Collectors.groupingBy(NameValue::getId));
	}

	@Cacheable
	private Map<String, List<NameValue>> getSortByMap() {
		return sortBy.stream().collect(Collectors.groupingBy(NameValue::getId));
	}

}
