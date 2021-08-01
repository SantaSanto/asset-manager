package com.santo.portfolio.service.txn;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.decampo.xirr.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.dao.NPSDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.domain.txn.NPS;

@Component
public class NPSService extends AbstractTxnService<NPS> {

	private static final String NAV = "NAV";

	@Autowired
	private NPSDao txnDao;

	@Override
	protected NPSDao getDao() {
		return txnDao;
	}

	@Override
	public Optional<NPS> getLatestNav(final Long assetId) {
		return txnDao.findByAssetIdAndCategory(assetId, NAV);
	}

	@Override
	protected void updateStat(final Asset asset) {
		getLatestNav(asset.getId()).ifPresent((latestNav) -> {
			asset.setCurrent(sumAmount(latestNav.getEquity(), latestNav.getDebt(), latestNav.getGlit()));
			asset.setProjected(asset.getCurrent());
			asset.setEquity(latestNav.getEquity());
			asset.setDebt(latestNav.getDebt());
			asset.setGlit(latestNav.getGlit());
		});

		final List<NPS> cashFlows = getCashflows(asset.getId(), Arrays.asList(DEPOSIT, NAV));
		List<Transaction> xirrTxns = cashFlows.stream().map(this::createXirrTxn).collect(Collectors.toList());
		asset.setXirr(calculateXirr(xirrTxns));
	}

	protected final Transaction createXirrTxn(final NPS nps) {
		final Integer amount = signAmount(nps.getCategory(), nps.getEquity() + nps.getDebt() + nps.getGlit());
		return new Transaction(amount, new Date(nps.getDate().getTime()));
	}

}
