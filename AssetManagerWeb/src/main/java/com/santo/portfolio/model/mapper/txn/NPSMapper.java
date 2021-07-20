package com.santo.portfolio.model.mapper.txn;

import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.txn.NPS;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.dto.txn.TxnForm;
import com.santo.portfolio.model.mapper.ITxnMapper;

@Component
public class NPSMapper extends AbstractMapper implements ITxnMapper<NPS> {

	@Override
	public NPS toDomain(final TxnForm txnForm) {
		NPS nps = toDomain(txnForm, new NPS());
		nps.setCategory(txnForm.getCategoryId());
		nps.setEquity(txnForm.getEquity());
		nps.setDebt(txnForm.getDebt());
		nps.setGlit(txnForm.getGlit());
		return nps;
	}

	@Override
	public TxnForm toForm(final NPS nps) {
		final TxnForm txnForm = (TxnForm) toDTO(nps, new TxnForm());
		txnForm.setCategoryId(nps.getCategory());	
		txnForm.setEquity(nps.getEquity());
		txnForm.setDebt(nps.getDebt());
		txnForm.setGlit(nps.getGlit());
		return txnForm;
	}

	@Override
	public TxnDetail toDTO(final NPS nps) {
		final TxnDetail txnDetail = (TxnDetail) toDTO(nps, new TxnDetail());
		txnDetail.setCategory(txnConfig.getById(nps.getCategory()));	
		txnDetail.setEquity(nps.getEquity());
		txnDetail.setDebt(nps.getDebt());
		txnDetail.setGlit(nps.getGlit());
		return txnDetail;
	}

}
