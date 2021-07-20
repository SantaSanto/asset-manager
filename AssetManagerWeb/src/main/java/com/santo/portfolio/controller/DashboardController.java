package com.santo.portfolio.controller;

import java.util.List;
import java.util.function.ToIntFunction;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.dto.asset.BaseAsset;
import com.santo.portfolio.model.mapper.AssetMapper;
import com.santo.portfolio.service.AssetService;

@Controller
@RequestMapping(IConstant.DASHBOARD)
public class DashboardController {

	@Autowired
	private AssetService assetService;

	@Autowired
	private AssetMapper assetMapper;

	@GetMapping
	public String view(final ModelMap model) {

		final List<BaseAsset> baseAssets = assetService.getAssets().stream().map(assetMapper::toBaseAsset)
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

		return IConstant.DASHBOARD_VIEW;
	}

	private Integer sum(final List<BaseAsset> baseAssets, ToIntFunction<BaseAsset> sunFuntion) {
		return baseAssets.stream().mapToInt(sunFuntion).sum();
	}

}
