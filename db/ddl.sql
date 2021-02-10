CREATE TABLE ASSET (
  ID             INT            NOT NULL    AUTO_INCREMENT,  
  NAME           VARCHAR(50)    NOT NULL,
  CATEGORY       VARCHAR(10)    NOT NULL,
  INSTRUMENT     VARCHAR(10)    NOT NULL,
  HOLDER         VARCHAR(10)    NOT NULL,
  INSTITUTION    VARCHAR(10)    NOT NULL,
  FUND_HOUSE     VARCHAR(10)    NOT NULL,
  PORTFOLIO      VARCHAR(99)    NOT NULL,
  START_DATE     DATE           NOT NULL,
  END_DATE       DATE           NOT NULL,
  STATUS         VARCHAR(1)     NOT NULL,
  DIRTY          VARCHAR(1)     NOT NULL,
  CURRENT        NUMERIC(8,2)   NOT NULL,
  ROI            NUMERIC(5,2)   NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY UK_NAME (NAME) 
);

CREATE TABLE TXN (
  ID          INT             NOT NULL    AUTO_INCREMENT,  
  ASSET_ID    INT             NOT NULL,
  DATE        DATE            NOT NULL,
  CATEGORY    VARCHAR(15)     NOT NULL,
  TIMELINE    VARCHAR(15)     NOT NULL,
  UNIT        NUMERIC(8,2)    NOT NULL,
  VALUE       NUMERIC(8,2)    NOT NULL,
  AMOUNT      NUMERIC(8,2)    NOT NULL,
  COMMENTS    VARCHAR(99)     NOT NULL,
  STATUS      VARCHAR(1)      NOT NULL,
  PRIMARY KEY (ID)
);


CREATE TABLE PORTFOLIO (
  ID         INT            NOT NULL  AUTO_INCREMENT,
  NAME       VARCHAR(25)    NOT NULL,
  ASSETS     INT            NOT NULL,
  INVESTED   NUMERIC(8,2)   NOT NULL,
  CURRENT    NUMERIC(8,2)   NOT NULL,
  ROI        NUMERIC(8,2)   NOT NULL,

  PRIMARY KEY (ID),
  UNIQUE (NAME)
);

