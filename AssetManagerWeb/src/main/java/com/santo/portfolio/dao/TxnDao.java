package com.santo.portfolio.dao;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface TxnDao<T> extends JpaRepository<T, Long> {
	
	List<T> findByAssetId(Long assetId, Sort sort);
	
	List<T> findByAssetIdAndCategoryIn(Long assetId, List<String> categorys, Sort sort);

}
