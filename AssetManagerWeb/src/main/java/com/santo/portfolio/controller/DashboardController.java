package com.santo.portfolio.controller;

import java.util.List;
import java.util.Optional;
import java.util.function.ToIntFunction;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.dto.asset.AssetFilter;
import com.santo.portfolio.model.dto.asset.BaseAsset;
import com.santo.portfolio.model.mapper.AssetMapper;
import com.santo.portfolio.service.AssetService;

@Controller
@RequestMapping(IConstant.DASHBOARD)
public class DashboardController {

	@Autowired
	private AssetService assetService;

	@Autowired
	private HttpSession httpSession;

	@Autowired
	private AssetMapper assetMapper;

	@GetMapping
	public String view(final ModelMap model, HttpSession session) {

		final AssetFilter assetFilter = getAssetFilter();

		final List<BaseAsset> baseAssets = assetService.getAssets(assetFilter).stream().map(assetMapper::toBaseAsset)
				.collect(Collectors.toList());

		final Integer current = sum(baseAssets, BaseAsset::getCurrent);
		final Integer projected = sum(baseAssets, BaseAsset::getProjected);
		final Double xirr = baseAssets.stream().mapToDouble(asset -> {
			return Double.valueOf(asset.getCurrent()) / current * asset.getXirr();
		}).sum();

		model.addAttribute(IConstant.CURRENT, current);
		model.addAttribute(IConstant.PROJECTED, projected);
		model.addAttribute(IConstant.XIRR, xirr);
		model.addAttribute(IConstant.BASE_ASSETS, baseAssets);
		model.addAttribute(IConstant.ASSET_FILTER, assetFilter);

		return IConstant.DASHBOARD_VIEW;
	}

	@PostMapping("/filter")
	public String filterAsset(final AssetFilter assetFilter) {
		httpSession.setAttribute(AssetFilter.class.getName(), assetFilter);
		return IConstant.REDIRECT_DASHBOARD;
	}

	private final AssetFilter getAssetFilter() {
		final AssetFilter assetFilter = (AssetFilter) httpSession.getAttribute(AssetFilter.class.getName());
		return Optional.ofNullable(assetFilter).orElseGet(AssetFilter::new);
	}

	private Integer sum(final List<BaseAsset> baseAssets, ToIntFunction<BaseAsset> sunFuntion) {
		return baseAssets.stream().mapToInt(sunFuntion).sum();
	}

}
