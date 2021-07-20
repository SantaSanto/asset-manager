package com.santo.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.asset.AssetType;
import com.santo.portfolio.model.mapper.ITxnMapper;
import com.santo.portfolio.model.mapper.strategy.TxnMapper;
import com.santo.portfolio.service.ITxnService;
import com.santo.portfolio.service.strategy.TxnStrategy;

public abstract class AbstractController {

	@Autowired
	private TxnStrategy txnStrategy;

	@Autowired
	private TxnMapper txnMapper;

	@SuppressWarnings("unchecked")
	protected ITxnService<Txn> txnStrategy(final AssetType assetType) {
		return (ITxnService<Txn>) txnStrategy.by(assetType);
	}	
	
	@SuppressWarnings("unchecked")
	protected ITxnMapper<Txn> txnMapper(final AssetType assetType) {
		return (ITxnMapper<Txn>) txnMapper.by(assetType);
	}

}
