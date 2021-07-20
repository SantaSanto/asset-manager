package com.santo.portfolio.model.mapper.txn;

import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.txn.EPF;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.dto.txn.TxnForm;
import com.santo.portfolio.model.mapper.ITxnMapper;

@Component
public class EPFMapper extends AbstractMapper implements ITxnMapper<EPF> {

	@Override
	public EPF toDomain(final TxnForm txnForm) {		
		EPF epf = toDomain(txnForm, new EPF());
		epf.setCategory(txnForm.getCategoryId());
		return epf;
	}

	@Override
	public TxnForm toForm(final EPF epf) {
		final TxnForm txnForm = (TxnForm) toDTO(epf, new TxnForm());
		txnForm.setCategoryId(epf.getCategory());
		txnForm.setEmployee(epf.getEmployer());
		txnForm.setCompany(epf.getCompany());
		return txnForm;
	}

	@Override
	public TxnDetail toDTO(final EPF epf) {
		final TxnDetail txnDetail = (TxnDetail) toDTO(epf, new TxnDetail());
		txnDetail.setCategory(txnConfig.getById(epf.getCategory()));
		txnDetail.setEmployee(epf.getEmployer());
		txnDetail.setCompany(epf.getCompany());
		return txnDetail;
	}

}
