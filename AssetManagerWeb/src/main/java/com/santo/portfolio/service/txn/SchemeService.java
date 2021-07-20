package com.santo.portfolio.service.txn;

import java.time.LocalDate;
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
public class SchemeService extends AbstractTxnService<Fixed> {

	@Autowired
	private FixedDao txnDao;

	@Override
	protected FixedDao getDao() {
		return txnDao;
	}

	@Override
	protected void updateStat(final Asset asset) {
		final List<Fixed> cashFlows = getCashflows(asset.getId(), Arrays.asList(DEPOSIT, CREDIT));

		asset.setCurrent(cashFlows.stream().mapToInt(Fixed::getAmount).sum());
		asset.setProjected(asset.getCurrent());

		final List<Transaction> xirrTxns = cashFlows.stream().filter(this::isDeposit).map(this::createXirrTxn)
				.collect(Collectors.toList());
		xirrTxns.add(new Transaction(asset.getCurrent(), LocalDate.now()));
		asset.setXirr(calculateXirr(xirrTxns));
	}

	protected final Transaction createXirrTxn(final Fixed fixed) {
		final Integer amount = signAmount(fixed.getCategory(), fixed.getAmount());
		return new Transaction(amount, new Date(fixed.getDate().getTime()));
	}

	private boolean isDeposit(final Txn txn) {
		return DEPOSIT.equalsIgnoreCase(txn.getCategory());
	}

}
