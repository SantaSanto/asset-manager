package com.santo.portfolio.model.mapper.txn;

import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.txn.Fixed;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.dto.txn.TxnForm;
import com.santo.portfolio.model.mapper.ITxnMapper;

@Component
public class FixedMapper extends AbstractMapper implements ITxnMapper<Fixed> {

	@Override
	public Fixed toDomain(final TxnForm txnForm) {		
		final Fixed txn = toDomain(txnForm, new Fixed());
		txn.setCategory(txnForm.getCategoryId());
		txn.setAmount(txnForm.getAmount());
		return txn;
	}

	@Override
	public TxnForm toForm(final Fixed fixed) {
		final TxnForm txnForm = (TxnForm) toDTO(fixed, new TxnForm());
		txnForm.setCategoryId(fixed.getCategory());	
		txnForm.setAmount(fixed.getAmount());
		return txnForm;
	}

	@Override
	public TxnDetail toDTO(final Fixed fixed) {
		final TxnDetail txnDetail = (TxnDetail) toDTO(fixed, new TxnDetail());
		txnDetail.setCategory(txnConfig.getById(fixed.getCategory()));
		txnDetail.setAmount(fixed.getAmount());
		return txnDetail;
	}

}
