package com.santo.portfolio.service;

import static org.springframework.data.domain.Sort.by;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public interface ITxnService<Domain> {

	String DEPOSIT = "DEPOSIT";
	String CREDIT = "CREDIT";	
	String REDEEM = "REDEEM";
	String NAV = "NAV";
	
	String DATE = "date";
	Sort CASHFLOW_SORT = by(Direction.ASC, DATE);

	void create(Domain domain);

	Domain get(Long id);

	List<Domain> getAll(Long assetId);

	Optional<Domain> getLatestNav(Long assetId);

	void updateStats(Long assetId);

}
