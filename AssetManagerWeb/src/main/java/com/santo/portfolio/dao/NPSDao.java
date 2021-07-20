package com.santo.portfolio.dao;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.txn.NPS;

@Repository
public interface NPSDao extends TxnDao<NPS> {

	Optional<NPS> findByAssetIdAndCategory(Long assetId, String category);

}
