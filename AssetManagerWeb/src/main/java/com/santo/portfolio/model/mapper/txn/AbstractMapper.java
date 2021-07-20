package com.santo.portfolio.model.mapper.txn;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.santo.portfolio.common.config.TxnConfig;
import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.txn.AbstractTxn;
import com.santo.portfolio.model.dto.txn.BaseTxn;

public abstract class AbstractMapper {

	private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

	@Autowired
	protected TxnConfig txnConfig;

	private Date toDate(final String date) {
		try {
			return simpleDateFormat.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	protected <Domain extends Txn> Domain toDomain(final BaseTxn form, final Domain domain) {
		domain.setId(form.getId());
		domain.setAssetId(form.getAssetId());
		domain.setDate(toDate(form.getDate()));		
		return domain;
	}

	protected AbstractTxn toDTO(final Txn domain, final AbstractTxn dto) {
		dto.setId(domain.getId());
		dto.setAssetId(domain.getAssetId());
		dto.setDate(simpleDateFormat.format(domain.getDate()));		
		return dto;
	}

}
