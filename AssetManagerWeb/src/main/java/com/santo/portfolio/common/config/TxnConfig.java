package com.santo.portfolio.common.config;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import com.santo.portfolio.model.dto.config.NameValue;

import lombok.Data;

@Data
@Component("txnConfig")
@ConfigurationProperties("com.santo.portfolio.config.txn")
public class TxnConfig {

	private List<NameValue> categories;

	public NameValue getById(final String txnCategoryId) {
		return getTxnCategoryMap().get(txnCategoryId).get(0);
	}

	@Cacheable
	private Map<String, List<NameValue>> getTxnCategoryMap() {
		return categories.stream().collect(Collectors.groupingBy(NameValue::getId));
	}

}
