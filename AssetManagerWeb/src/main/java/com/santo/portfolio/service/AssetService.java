package com.santo.portfolio.service;

import static java.util.Optional.ofNullable;
import static org.springframework.data.domain.Sort.by;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.santo.portfolio.dao.AssetDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.dto.asset.AssetFilter;
import com.santo.portfolio.service.criteria.AssetCriteria;

@Service
public class AssetService {

	private static final String XIRR = "xirr";
	
	
	@Autowired
	private AssetCriteria critera;
	
	@Autowired
	private AssetDao assetDao;

	public List<Asset> getAssets(final AssetFilter assetFilter) {
		return assetDao.findAll(critera.apply(assetFilter) , by(Direction.DESC, XIRR));
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
		destAsset.setEmployee(srcAsset.getEmployee());
		destAsset.setEmployer(srcAsset.getEmployer());
		destAsset.setEquity(srcAsset.getEquity());
		destAsset.setDebt(srcAsset.getDebt());
		destAsset.setGlit(srcAsset.getGlit());
	}
}
