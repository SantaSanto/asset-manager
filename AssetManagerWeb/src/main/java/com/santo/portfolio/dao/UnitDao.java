package com.santo.portfolio.dao;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.txn.Unit;

@Repository
public interface UnitDao extends TxnDao<Unit> {

	Optional<Unit> findByAssetIdAndCategory(Long assetId, String category);

}
