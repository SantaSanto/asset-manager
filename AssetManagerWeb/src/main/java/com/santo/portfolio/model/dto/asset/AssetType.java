package com.santo.portfolio.model.dto.asset;

import com.santo.portfolio.common.IConstant;

public enum AssetType {

	FIXED, PPF, SSA, EPF, UNIT, BULLION, NPS,;

	public static AssetType getType(final BaseAsset baseAsset) {

		if (IConstant.FIXED.equalsIgnoreCase(baseAsset.getInstrument().getType())) {

			switch (baseAsset.getInstrument().getId()) {
			case IConstant.FIXED:
				return FIXED;
			case IConstant.PPF:
				return PPF;
			case IConstant.SSA:
				return SSA;
			case IConstant.EPF:
				return EPF;
			default:
				throw new RuntimeException("No matching asset mapping");
			}

		}

		if (IConstant.NPS.equalsIgnoreCase(baseAsset.getInstrument().getId()))
			return NPS;

		if (IConstant.EQUITY.equalsIgnoreCase(baseAsset.getInstrument().getType()))
			return UNIT;
		
		if (IConstant.DEBT.equalsIgnoreCase(baseAsset.getInstrument().getType()))
			return UNIT;

		if (IConstant.BULLION.equalsIgnoreCase(baseAsset.getInstrument().getType()))
			return BULLION;

		throw new RuntimeException("No matching asset mapping");
	}
}