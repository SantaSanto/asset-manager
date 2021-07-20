package com.santo.portfolio.model.mapper;

import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.dto.txn.TxnForm;

public interface ITxnMapper<Domain extends Txn> {

	Domain toDomain(TxnForm txnform);

	TxnForm toForm(final Domain txn);

	TxnDetail toDTO(final Domain txn);

}
