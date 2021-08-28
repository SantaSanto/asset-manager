package com.santo.portfolio.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.ToIntFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.santo.portfolio.common.IConstant;
import com.santo.portfolio.model.domain.txn.Fixed;
import com.santo.portfolio.model.dto.asset.AssetFilter;
import com.santo.portfolio.model.dto.asset.BaseAsset;
import com.santo.portfolio.model.mapper.AssetMapper;
import com.santo.portfolio.service.AssetService;
import com.santo.portfolio.service.txn.FixedService;

import lombok.Getter;

@Controller
@RequestMapping(IConstant.DASHBOARD)
public class DashboardController {

	@Autowired
	private AssetService assetService;

	@Autowired
	private FixedService fixedService;

	@Autowired
	@Getter
	private HttpSession httpSession;

	@Autowired
	private AssetMapper assetMapper;

	@GetMapping
	public String view(final ModelMap model) {
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

	@GetMapping(IConstant.CHART)
	public String chart(final ModelMap model) {
		final AssetFilter assetFilter = getAssetFilter();
		final List<BaseAsset> baseAssets = assetService.getAssets(assetFilter).stream().map(assetMapper::toBaseAsset)
				.collect(Collectors.toList());

		final Integer current = sum(baseAssets, BaseAsset::getCurrent);

		final List<String[]> instruments = groupBy(baseAssets, current, BaseAsset::getInstrumentLabel);
		final List<String[]> institutions = groupBy(baseAssets, current, BaseAsset::getInstitutionLabel);
		final List<String[]> holders = groupBy(baseAssets, current, BaseAsset::getHolder);
		final List<String[]> portfolios = groupBy(baseAssets, current, BaseAsset::getPortfolio);
		final List<String[]> xirrs = getROI(baseAssets);

		model.addAttribute("instruments", toJsonString(instruments));
		model.addAttribute("institutions", toJsonString(institutions));
		model.addAttribute("holders", toJsonString(holders));
		model.addAttribute("portfolios", toJsonString(portfolios));
		model.addAttribute("xirrs", toJsonString(xirrs));
		model.addAttribute(IConstant.ASSET_FILTER, assetFilter);
		return "chart";
	}

	final Function<Long, Stream<Fixed>> getAllRedeem = (id) -> fixedService.getAllRedeem(id).stream();

	@GetMapping(IConstant.CALENDER)
	public String calendar(final ModelMap model) {

		final AssetFilter assetFilter = getAssetFilter();
		final List<BaseAsset> baseAssets = assetService.getAssets(assetFilter).stream().map(assetMapper::toBaseAsset)
				.collect(Collectors.toList());

		final List<Fixed> redeems = baseAssets.stream().map(BaseAsset::getId).flatMap(getAllRedeem)
				.collect(Collectors.toList());

		model.addAttribute("redeemJSON", toJsonString(redeems));
		model.addAttribute(IConstant.ASSET_FILTER, assetFilter);
		return "calender";
	}

	@PostMapping(IConstant.FILTER)
	public String filterAsset(final AssetFilter assetFilter) {
		getHttpSession().setAttribute(AssetFilter.class.getName(), assetFilter);
		return IConstant.REDIRECT_DASHBOARD;
	}

	private List<String[]> groupBy(final List<BaseAsset> baseAssets, final Integer current,
			Function<BaseAsset, String> classifier) {
		final Map<String, Integer> dataMap = baseAssets.stream()
				.collect(Collectors.groupingBy(classifier, Collectors.summingInt(BaseAsset::getCurrent)));

		return dataMap.keySet().stream().map(key -> {
			final Integer value = dataMap.get(key);
			final Double percent = Double.valueOf(value * 100 / current);
			return new String[] { key, String.valueOf(value), String.valueOf(percent) };
		}).collect(Collectors.toList());

	}

	private List<String[]> getROI(final List<BaseAsset> baseAssets) {
		return baseAssets.stream().map(asset -> {
			return new String[] { asset.getName(), String.valueOf(asset.getCurrent()),
					String.valueOf(asset.getXirr()) };
		}).collect(Collectors.toList());

	}

	private final AssetFilter getAssetFilter() {
		final AssetFilter sessionFilter = (AssetFilter) getHttpSession().getAttribute(AssetFilter.class.getName());
		return Optional.ofNullable(sessionFilter).orElseGet(() -> {
			final AssetFilter assetFilter = new AssetFilter();
			assetFilter.setStatus(IConstant.DEFAULT_STATUS);
			assetFilter.setSortBy(IConstant.DEFAULT_SORT_BY);
			assetFilter.setSortDirection(IConstant.DEFAULT_SORT_DIRECTION);
			return assetFilter;
		});

	}

	private Integer sum(final List<BaseAsset> baseAssets, ToIntFunction<BaseAsset> sunFuntion) {
		return baseAssets.stream().mapToInt(sunFuntion).sum();
	}

	private String toJsonString(final Object obj) {
		final ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			return null;
		}
	}

}
