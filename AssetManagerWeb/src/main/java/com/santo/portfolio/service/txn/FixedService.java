package com.santo.portfolio.service.txn;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.decampo.xirr.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.dao.FixedDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.domain.txn.Fixed;
import com.santo.portfolio.model.domain.txn.Txn;

@Component
public class FixedService extends AbstractTxnService<Fixed> {

	@Autowired
	private FixedDao txnDao;

	@Override
	protected FixedDao getDao() {
		return txnDao;
	}
	
	public List<Fixed> getAllRedeem(final Long assetId) {	
		return getCashflows(assetId, Arrays.asList(REDEEM));
	}

	@Override
	protected void updateStat(final Asset asset) {

		final List<Fixed> cashFlows = getCashflows(asset.getId(), Arrays.asList(DEPOSIT, REDEEM));

		asset.setCurrent(cashFlows.stream().filter(this::isCurrent).mapToInt(Fixed::getAmount).sum());
		asset.setProjected(cashFlows.stream().filter(this::isProjected).mapToInt(Fixed::getAmount).sum());

		final List<Transaction> xirrTxns = cashFlows.stream().map(this::createXirrTxn).collect(Collectors.toList());
		asset.setXirr(calculateXirr(xirrTxns));
	}

	protected final Transaction createXirrTxn(final Fixed fixed) {
		final Integer amount = signAmount(fixed.getCategory(), fixed.getAmount());
		return new Transaction(amount, new Date(fixed.getDate().getTime()));
	}

	protected boolean isCurrent(final Txn txn) {
		return DEPOSIT.equalsIgnoreCase(txn.getCategory());
	}

	private boolean isProjected(final Txn txn) {
		return REDEEM.equalsIgnoreCase(txn.getCategory());
	}



}
