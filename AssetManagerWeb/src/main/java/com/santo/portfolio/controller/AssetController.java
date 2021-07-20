package com.santo.portfolio.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.domain.txn.Txn;
import com.santo.portfolio.model.dto.asset.AssetDetail;
import com.santo.portfolio.model.dto.asset.AssetForm;
import com.santo.portfolio.model.dto.asset.AssetType;
import com.santo.portfolio.model.dto.txn.TxnDetail;
import com.santo.portfolio.model.mapper.AssetMapper;
import com.santo.portfolio.service.AssetService;

@Controller
@RequestMapping(IConstant.ASSET)
public class AssetController extends AbstractController {

	@Autowired
	private AssetService assetService;

	@Autowired
	private AssetMapper assetMapper;

	@GetMapping(IConstant.NEW)
	public String newAssetForm(final ModelMap model) {
		final AssetForm assetForm = new AssetForm();
		model.addAttribute(IConstant.ASSET_FORM, assetForm);
		return IConstant.ASSET_FORM_VIEW;
	}

	@GetMapping(IConstant.UPDATE)
	public String updateAssetForm(final ModelMap model, @RequestParam final Long assetId) {
		final AssetForm assetForm = assetMapper.toForm(assetService.getAsset(assetId));
		model.addAttribute(IConstant.ASSET_FORM, assetForm);
		return IConstant.ASSET_FORM_VIEW;
	}

	@PostMapping(IConstant.SAVE)
	public String saveAsset(final AssetForm assetForm) {
		assetService.save(assetMapper.toDomain(assetForm));
		return IConstant.REDIRECT_DASHBOARD;
	}

	@GetMapping(IConstant.VIEW)
	public String viewAsset(final ModelMap model, @RequestParam final Long assetId) {
		final AssetDetail assetDetail = assetMapper.toDTO(assetService.getAsset(assetId));
		final AssetType assetType = AssetType.getType(assetDetail);
		model.addAttribute(IConstant.ASSET_TYPE, assetType);
		model.addAttribute(IConstant.ASSET_DETAIL, assetDetail);

		final List<Txn> txnDomains = txnStrategy(assetType).getAll(assetId);
		final List<TxnDetail> txns = txnDomains.stream().map(txnMapper(assetType)::toDTO).collect(Collectors.toList());

		model.addAttribute(IConstant.TXNS, txns);

		return IConstant.ASSET_VIEW;
	}
}
