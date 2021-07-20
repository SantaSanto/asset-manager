package com.santo.portfolio.model.mapper;

import java.util.Optional;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.santo.portfolio.common.config.AssetConfig;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.dto.asset.AssetDetail;
import com.santo.portfolio.model.dto.asset.AssetForm;
import com.santo.portfolio.model.dto.asset.BaseAsset;

@Component
public class AssetMapper {
	
	@Autowired
	private AssetConfig assetConfig;

	public BaseAsset toBaseAsset(final Asset asset) {
		return toDTO(asset, new AssetDetail());
	}

	public BaseAsset toDTO(final Asset asset, final BaseAsset baseAsset) {
		baseAsset.setId(asset.getId());
		baseAsset.setName(asset.getName());
		baseAsset.setInstrument(assetConfig.getInstrument(asset.getInstrument()));
		baseAsset.setAccount(assetConfig.getAccount(asset.getAccount()));
		baseAsset.setPortfolio(assetConfig.getPortfolio(asset.getPortfolio()));

		baseAsset.setCurrent(withDefault(asset::getCurrent, 0));
		baseAsset.setProjected(withDefault(asset::getProjected, baseAsset.getCurrent()));
		baseAsset.setXirr(withDefault(asset::getXirr, 0d));
		return baseAsset;
	}

	public AssetDetail toDTO(final Asset asset) {
		final AssetDetail assetDetail = (AssetDetail) toDTO(asset, new AssetDetail());
		assetDetail.setUnit(asset.getUnit());
		assetDetail.setEmployee(asset.getEmployee());
		assetDetail.setCompany(asset.getCurrent());
		assetDetail.setEquity(asset.getEquity());
		assetDetail.setDebt(asset.getDebt());
		assetDetail.setGlit(asset.getGlit());
		return assetDetail;
	}

	public AssetForm toForm(final Asset asset) {
		final AssetForm assetForm = new AssetForm();
		assetForm.setId(asset.getId());
		assetForm.setName(asset.getName());
		assetForm.setInstrumentId(asset.getInstrument());
		assetForm.setAccountId(asset.getAccount());
		assetForm.setPortfolioId(asset.getPortfolio());
		assetForm.setStatus(asset.getStatus());
		return assetForm;
	}

	public Asset toDomain(final AssetForm assetForm) {
		final Asset asset = new Asset();
		asset.setId(assetForm.getId());
		asset.setName(assetForm.getName());
		asset.setInstrument(assetForm.getInstrumentId());
		asset.setAccount(assetForm.getAccountId());
		asset.setPortfolio(assetForm.getPortfolioId());
		asset.setStatus(assetForm.getStatus());
		return asset;
	}

	private <T> T withDefault(final Supplier<T> value, T defaultValue) {
		return Optional.ofNullable(value.get()).orElse(defaultValue);
	}

}
