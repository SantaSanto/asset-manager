package com.santo.portfolio.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.Asset;

@Repository
public interface AssetDao extends JpaRepository<Asset, Long>, JpaSpecificationExecutor<Asset> {
	


}
