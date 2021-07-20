package com.santo.portfolio.model.mapper.txn;

import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.txn.Unit;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.dto.txn.TxnForm;
import com.santo.portfolio.model.mapper.ITxnMapper;

@Component
public class UnitMapper extends AbstractMapper implements ITxnMapper<Unit> {

	@Override
	public Unit toDomain(final TxnForm txnForm) {		
		Unit unit = (Unit) toDomain(txnForm, new Unit());
		unit.setCategory(txnForm.getCategoryId());
		unit.setUnit(txnForm.getUnit());
		unit.setAmount(txnForm.getAmount());
		return unit;
	}

	@Override
	public TxnForm toForm(final Unit unit) {
		final TxnForm txnForm = (TxnForm) toDTO(unit, new TxnForm());
		txnForm.setCategoryId(unit.getCategory());
		txnForm.setUnit(unit.getUnit());
		txnForm.setAmount(unit.getAmount());
		return txnForm;
	}

	@Override
	public TxnDetail toDTO(final Unit unit) {
		final TxnDetail txnDetail = (TxnDetail) toDTO(unit, new TxnDetail());
		txnDetail.setCategory(txnConfig.getById(unit.getCategory()));
		txnDetail.setUnit(unit.getUnit());
		txnDetail.setAmount(unit.getAmount());
		return txnDetail;
	}

}
