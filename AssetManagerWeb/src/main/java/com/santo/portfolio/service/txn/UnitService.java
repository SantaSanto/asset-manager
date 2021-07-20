package com.santo.portfolio.service.txn;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.decampo.xirr.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.dao.UnitDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.domain.txn.Unit;

@Component
public class UnitService extends AbstractTxnService<Unit> {

	private static final String NAV = "NAV";

	@Autowired
	private UnitDao txnDao;

	@Override
	protected UnitDao getDao() {
		return txnDao;
	}

	@Override
	public Optional<Unit> getLatestNav(final Long assetId) {
		return txnDao.findByAssetIdAndCategory(assetId, NAV);
	}

	@Override
	protected void updateStat(final Asset asset) {
		getLatestNav(asset.getId()).ifPresent((latestNav) -> {
			asset.setCurrent(latestNav.getAmount());
			asset.setProjected(latestNav.getAmount());
			asset.setUnit(latestNav.getUnit());			
		});

		final List<Unit> cashFlows = getCashflows(asset.getId(), Arrays.asList(DEPOSIT, REDEEM, NAV));
		List<Transaction> xirrTxns = cashFlows.stream().map(this::createXirrTxn).collect(Collectors.toList());
		asset.setXirr(calculateXirr(xirrTxns));
	}

	protected final Transaction createXirrTxn(final Unit unit) {
		final Integer amount = signAmount(unit.getCategory(), Optional.ofNullable(unit.getAmount()).orElse(0));
		return new Transaction(amount, new Date(unit.getDate().getTime()));
	}

}
