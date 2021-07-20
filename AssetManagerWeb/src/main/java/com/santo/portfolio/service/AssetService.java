package com.santo.portfolio.service;

import static java.util.Optional.ofNullable;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.santo.portfolio.dao.AssetDao;
import com.santo.portfolio.model.domain.Asset;

@Service
public class AssetService {

	@Autowired
	private AssetDao assetDao;

	public List<Asset> getAssets() {
		return assetDao.findAll();
	}

	public void save(final Asset asset) {

		ofNullable(asset.getId()).ifPresent(assetId -> copy(getAsset(assetId), asset));
		assetDao.save(asset);
	}

	public Asset getAsset(final Long assetId) {
		return assetDao.findById(assetId).get();
	}

	private void copy(final Asset srcAsset, final Asset destAsset) {
		destAsset.setCurrent(srcAsset.getCurrent());
		destAsset.setUnit(srcAsset.getUnit());
		destAsset.setProjected(srcAsset.getProjected());
		destAsset.setXirr(srcAsset.getXirr());
	}
}
