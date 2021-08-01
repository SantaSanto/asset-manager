package com.santo.portfolio.service.txn;

import static org.springframework.data.domain.Sort.by;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.decampo.xirr.Transaction;
import org.decampo.xirr.Xirr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;

import com.santo.portfolio.dao.TxnDao;
import com.santo.portfolio.model.domain.Asset;
import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.service.AssetService;
import com.santo.portfolio.service.ITxnService;

public abstract class AbstractTxnService<Domain extends Txn> implements ITxnService<Domain> {

	@Autowired
	private AssetService assetService;

	protected abstract TxnDao<Domain> getDao();

	@Override
	public final void create(final Domain domain) {
		getDao().save(domain);
	}

	@Override
	public List<Domain> getAll(final Long assetId) {
		return getDao().findByAssetId(assetId, by(Direction.DESC, DATE));
	}

	@Override
	public final Domain get(final Long id) {
		return getDao().findById(id).orElse(null);
	}

	@Override
	public Optional<Domain> getLatestNav(final Long assetId) {
		return Optional.empty();
	}

	public final void updateStats(final Long assetId) {
		final Asset asset = assetService.getAsset(assetId);
		updateStat(asset);
		assetService.save(asset);
	}

	protected abstract void updateStat(Asset asset);

	/** Common Implementation */

	protected final List<Domain> getCashflows(final Long assetId, List<String> categorys) {
		return getDao().findByAssetIdAndCategoryIn(assetId, categorys, by(Direction.ASC, DATE));
	}

	protected final Double calculateXirr(final List<Transaction> xirrTxns) {
		try {
			final Double xirr = new Xirr(xirrTxns).xirr();
			return (xirr * 100);
		} catch (Exception e) {
			System.out.println(e);
		}
		return 0d;
	}

	protected final Integer signAmount(final String category, final int... amounts) {
		final Integer total = sumAmount(amounts);
		return DEPOSIT.equalsIgnoreCase(category) ? Math.negateExact(total) : total;
	}

	protected Integer sumAmount(final int... amounts) {
		return Arrays.stream(amounts).sum();
	}

}