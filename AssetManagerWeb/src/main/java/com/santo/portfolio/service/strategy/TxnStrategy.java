package com.santo.portfolio.service.strategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.asset.AssetType;
import com.santo.portfolio.service.ITxnService;
import com.santo.portfolio.service.txn.EPFService;
import com.santo.portfolio.service.txn.FixedService;
import com.santo.portfolio.service.txn.NPSService;
import com.santo.portfolio.service.txn.SchemeService;
import com.santo.portfolio.service.txn.UnitService;

@Service
public class TxnStrategy {

	@Autowired
	private FixedService fixedService;

	@Autowired
	private SchemeService schemeService;

	@Autowired
	private EPFService epfService;

	@Autowired
	private UnitService unitService;

	@Autowired
	private NPSService npsService;

	public ITxnService<? extends Txn> by(final AssetType assetType) {
		switch (assetType) {
		case FIXED:
			return fixedService;

		case SCHEME:
			return schemeService;

		case EPF:
			return epfService;

		case UNIT:
		case BULLION:
			return unitService;

		case NPS:
			return npsService;

		default:
			throw new RuntimeException("Service Mapping not found for " + assetType);
		}
	}

}
