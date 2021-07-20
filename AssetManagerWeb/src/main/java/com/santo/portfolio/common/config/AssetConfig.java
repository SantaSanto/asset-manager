package com.santo.portfolio.common.config;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.dto.config.Account;
import com.santo.portfolio.model.dto.config.Instrument;
import com.santo.portfolio.model.dto.config.NameValue;

import lombok.Data;

@Component("assetConfig")
@ConfigurationProperties("com.santo.portfolio.config.asset")
@Data
public class AssetConfig {

	private List<NameValue> portfolio;
	private List<Account> accounts;
	private List<Instrument> instruments;
	private List<NameValue> status;

	public NameValue getPortfolio(final String portfolioId) {
		return getPortfolioMap().get(portfolioId).get(0);
	}

	public Account getAccount(final String accountId) {
		return getAccountMap().get(accountId).get(0);
	}

	public Instrument getInstrument(final String instrumentId) {
		return getInstrumentMap().get(instrumentId).get(0);
	}

	@Cacheable
	private Map<String, List<NameValue>> getPortfolioMap() {
		return portfolio.stream().collect(Collectors.groupingBy(NameValue::getId));
	}
	
	@Cacheable
	private Map<String, List<NameValue>> getStatusMap() {
		return status.stream().collect(Collectors.groupingBy(NameValue::getId));
	}

	@Cacheable
	private Map<String, List<Account>> getAccountMap() {
		return accounts.stream().collect(Collectors.groupingBy(Account::getId));
	}

	@Cacheable
	private Map<String, List<Instrument>> getInstrumentMap() {
		return instruments.stream().collect(Collectors.groupingBy(Instrument::getId));
	}
	
	public static final String UAN_ACCOUNT = "UXX7208";
	
	public static boolean isEPF(final Asset asset) {
		return UAN_ACCOUNT.equalsIgnoreCase(asset.getAccount());
	}

}
