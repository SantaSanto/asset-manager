package com.santo.portfolio.service.txn;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.decampo.xirr.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.dao.EPFDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.domain.txn.EPF;
import com.santo.portfolio.model.domain.txn.Txn;

@Component
public class EPFService extends AbstractTxnService<EPF> {

	@Autowired
	private EPFDao txnDao;

	@Override
	protected EPFDao getDao() {
		return txnDao;
	}

	@Override
	protected void updateStat(final Asset asset) {
		final List<EPF> cashFlows = getCashflows(asset.getId(), Arrays.asList(DEPOSIT, CREDIT));
		asset.setEmployee(cashFlows.stream().mapToInt(EPF::getEmployee).sum());
		asset.setEmployer(cashFlows.stream().mapToInt(EPF::getEmployer).sum());
		asset.setCurrent(sumAmount(asset.getEmployee(), asset.getEmployer()));
		asset.setProjected(asset.getCurrent());

		final List<Transaction> xirrTxns = cashFlows.stream().filter(this::isDeposit).map(this::createXirrTxn)
				.collect(Collectors.toList());
		xirrTxns.add(new Transaction(asset.getCurrent(), LocalDate.now()));
		asset.setXirr(calculateXirr(xirrTxns));
	}

	protected final Transaction createXirrTxn(final EPF epf) {
		final Integer amount = signAmount(epf.getCategory(), sumAmount(epf.getEmployee(), epf.getEmployer()));
		return new Transaction(amount, new Date(epf.getDate().getTime()));
	}

	private boolean isDeposit(final Txn txn) {
		return DEPOSIT.equalsIgnoreCase(txn.getCategory());
	}

}
