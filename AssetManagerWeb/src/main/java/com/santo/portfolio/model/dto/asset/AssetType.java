package com.santo.portfolio.model.dto.asset;

import com.santo.portfolio.common.IConstant;

public enum AssetType {

	FIXED, SCHEME, EPF, UNIT, BULLION, NPS,;

	public static AssetType getType(final BaseAsset baseAsset) {

		if (IConstant.FIXED.equalsIgnoreCase(baseAsset.getInstrument().getType())) {

			switch (baseAsset.getInstrument().getId()) {
			case IConstant.SAVING_SCHEME:
				return SCHEME;
			case IConstant.EPF:
				return EPF;
			default:
				return FIXED;
			}
		}
		
		if (IConstant.NPS.equalsIgnoreCase(baseAsset.getInstrument().getId()))
			return NPS;

		if (IConstant.EQUITY.equalsIgnoreCase(baseAsset.getInstrument().getType()))
			return UNIT;

		if (IConstant.BULLION.equalsIgnoreCase(baseAsset.getInstrument().getType()))
			return BULLION;

		throw new RuntimeException("No matching asset mapping");
	}
}