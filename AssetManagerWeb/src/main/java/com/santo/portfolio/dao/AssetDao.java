package com.santo.portfolio.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.Asset;

@Repository
public interface AssetDao extends CrudRepository<Asset, Long> {

	@Override
	List<Asset> findAll();	

}
