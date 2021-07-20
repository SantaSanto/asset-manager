package com.santo.portfolio.model.mapper.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.asset.AssetType;
import com.santo.portfolio.model.mapper.ITxnMapper;
import com.santo.portfolio.model.mapper.txn.EPFMapper;
import com.santo.portfolio.model.mapper.txn.FixedMapper;
import com.santo.portfolio.model.mapper.txn.NPSMapper;
import com.santo.portfolio.model.mapper.txn.UnitMapper;

@Component
public class TxnMapper {

	@Autowired
	private FixedMapper fixedMapper;

	@Autowired
	private EPFMapper epf;

	@Autowired
	private UnitMapper unitMapper;

	@Autowired
	private NPSMapper npsMapper;

	public ITxnMapper<? extends Txn> by(final AssetType assetType) {
		switch (assetType) {
		case FIXED:
		case SCHEME:
			return fixedMapper;

		case EPF:
			return epf;

		case NPS:
			return npsMapper;

		case UNIT:
		case BULLION:
			return unitMapper;

		default:
			throw new RuntimeException("Txn Mapper not defined for " + assetType);
		}
	}

}
