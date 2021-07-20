package com.santo.portfolio.controller;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.asset.AssetType;
import com.santo.portfolio.model.dto.txn.TxnForm;
import com.santo.portfolio.service.ITxnService;

@Controller
@RequestMapping(IConstant.TXN)
public class TxnController extends AbstractController {

	private static final String NAV = "NAV";

	@GetMapping(IConstant.NEW)
	public String newTxn(final ModelMap model, @RequestParam final Long assetId,
			@RequestParam final AssetType assetType) {
		final TxnForm txnForm = new TxnForm();
		txnForm.setAssetId(assetId);
		txnForm.setAssetType(assetType);
		model.addAttribute(IConstant.TXN_FORM, txnForm);
		return IConstant.TXN_FORM_VIEW;
	}

	@GetMapping(IConstant.UPDATE)
	public String updateTxn(final ModelMap model, @RequestParam final Long txnId,
			@RequestParam final AssetType assetType) {
		final TxnForm txnForm = txnMapper(assetType).toForm(txnStrategy(assetType).get(txnId));
		txnForm.setAssetType(assetType);
		model.addAttribute(IConstant.TXN_FORM, txnForm);
		return IConstant.TXN_FORM_VIEW;
	}

	@PostMapping(IConstant.SAVE)
	public String saveTxn(final RedirectAttributes attr, final TxnForm txnForm) {
		final AssetType assetType = txnForm.getAssetType();
		final ITxnService<Txn> txnService = txnStrategy(assetType);

		if (NAV.equalsIgnoreCase(txnForm.getCategoryId())) {
			final Optional<Txn> latestNav = txnService.getLatestNav(txnForm.getAssetId());
			latestNav.map(Txn::getId).ifPresent(txnForm::setId);
		}

		txnService.create(txnMapper(assetType).toDomain(txnForm));
		txnService.updateStats(txnForm.getAssetId());

		attr.addAttribute(IConstant.ASSET_ID, txnForm.getAssetId());
		return IConstant.REDIRECT_ASSET;
	}
}
