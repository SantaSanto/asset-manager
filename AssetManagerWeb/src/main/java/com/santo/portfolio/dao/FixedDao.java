package com.santo.portfolio.dao;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.txn.Fixed;

@Repository
public interface FixedDao extends TxnDao<Fixed> {
	
	List<Fixed> findByCategory(final String category, final Sort sort);

}
