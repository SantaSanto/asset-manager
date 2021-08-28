package com.santo.portfolio.common;

public interface IConstant {

	/** URI Path */
	String NEW = "/new";
	String UPDATE = "/update";
	String SAVE = "/save";
	String VIEW = "/view";
	String FILTER = "/filter";
	String CHART = "/chart";
	String CALENDER = "/calender";
	
	/** URL Path */
	String DASHBOARD = "/dashboard";
	String ASSET = "/asset";
	String TXN = "/txn";

	/** Redirect */
	String REDIRECT_DASHBOARD = "redirect:/dashboard";
	String REDIRECT_ASSET = "redirect:/asset/view?assetId={assetId}";

	/** Model Attributes */
	String BASE_ASSETS = "baseAssets";
	String ASSET_DETAIL = "assetDetail";
	String ASSET_FORM = "assetForm";
	String ASSET_FILTER = "assetFilter";
	String ASSET_ID = "assetId";
	String ASSET_TYPE = "assetType";
	String TXN_FORM = "txnForm";
	String TXNS = "txns";
	String PROJECTED = "projected";
	String CURRENT = "current";
	String XIRR = "xirr";

	/** Views **/
	String DASHBOARD_VIEW = "dashboard-view";
	String ASSET_VIEW = "asset-view";
	String ASSET_FORM_VIEW = "asset-form";
	String TXN_FORM_VIEW = "txn-form";

	/** Asset Type **/
	String FIXED = "FIXED";
	String PPF = "PPF";
	String SSA = "SSA";	
	String EPF = "EPF";
	String EQUITY = "EQUITY";
	String DEBT = "DEBT";
	String NPS = "NPS";
	String BULLION = "BULLION";
	
	/** Asset Filter */
	String DEFAULT_STATUS = "A";
	String DEFAULT_SORT_BY = "name";
	String DEFAULT_SORT_DIRECTION = "Ascending";
	
	/** Asset Criteria */
	String STATUS = "status";
	String HOLDER = "holder";
	String PORTFOLIO = "portfolio";
	String INSTRUMENT = "instrument";
	String INSTITUTION = "institution";

	
	

}
