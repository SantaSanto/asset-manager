package com.santo.portfolio.dao;

import org.springframework.stereotype.Repository;

import com.santo.portfolio.model.domain.txn.Fixed;

@Repository
public interface FixedDao extends TxnDao<Fixed> {

}
