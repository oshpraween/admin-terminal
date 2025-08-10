export enum BinaryType {
  blob,
  arraybuffer,
}

export enum AuthenticationMode {
  None,
  Require,
}

export enum SortOrder {
  Ascending = 1,
  Descending = -1,
}

export enum CashAdjustmentType {
  Charge = 1,
  CashAdjustment = 2,
}

export enum HoldingAdjustmentType {
  HoldingAdjustment = 1,
  HoldingPayment = 2,
}

export enum BeneficiaryType {
  CashAccounts = 1,
  BrokerageAccounts = 2,
  OtherAccounts = 3,
  GTN = 4,
}

export enum ChargeCodes {
  Cash_Transfer_Fee_Between_Brokerage_Accounts = 'CTRFEE_BNK',
  Cash_Transfer_Fee_Between_Other_Accounts = 'CTRFEE_OTR',
  Cash_Transfer_Fee_Between_Cash_Accounts = 'CTRFEE_INT',
  Stock_Adjustment_Fee_Stock_Deposit = 'STPFEE_DEP',
  Stocks_Transfer_Fee_Within_customer = 'STPFEE_INT',
  Stocks_Transfer_Fee_Murabaha_Movement = 'STPFEE_MUR',
  Stocks_Transfer_Fee_Between_OMS_Customers = 'STPFEE_CUS',
  Stocks_Transfer_Fee_Between_Brokers_Different_Customers = 'STPFEE_BRD',
  Stocks_Transfer_Fee_Between_Brokers_Same_Customer = 'STPFEE_BRS',
  Stocks_Transfer_Fee_Between_OMS_Customers_Corporate_to_Individual = 'STPFEE_CTI',
  Stock_Adjustment_Fee_Stock_Withdrawal = 'STPFEE_WDR',
  Cash_Transfer = 'CSHTRN',
  Withdraw = 'WITHDR',
  Deposit = 'DEPOST',
  Pledge_Processing_Fee_Pledge_Out = 'PLGFEE_OUT',
  Pledge_Processing_Fee_Pledge_In = 'PLGFEE_IN',
  Withdraw_Fee = 'WITHDR_FEE',
  Brokerage_Bank_Cash_Transfer = 'CSHTRNCOP',
}

export enum LogDataType {
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
}

export const Languages = {
  EN: 'en',
  AR: 'ar',
  FR: 'fr',
};

export enum Language {
  Customer_Preferred = 0,
  English = 1,
  Arabic = 2,
  French = 3,
}

export enum FormMode {
  AddNew,
  Edit,
}

export enum ItemStatus {
  None,
  InActive,
  Active,
  Deleted,
  WaitForActivating,
}

export enum DialogMode {
  add = 0,
  view = 1,
  edit = 2,
  delete = 3,
  approve = 4,
  reject = 5,
  status = 6,
}

export enum EmployeeType {
  ATUser = 1,
  Dealer = 2,
  SystemUsers = 3,
}

export enum MarginProductType {
  CoverageRatio = 1,
  InitialMargin = 2,
}

export enum SortType {
  unSort = 0,
  sortByValue = 1,
  sortByLabel = 2,
}

export enum CashAdjustmentMode {
  Pay = 1,
  Deduct = 2,
}

export enum HoldingAdjustmentMode {
  Pay = 1,
  Deduct = 2,
  Split = 3,
}

export enum GridViewActionText {
  Approve = 'Approve',
  Reject = 'Reject',
  Grant = 'Grant',
  MarkForDelete = 'Mark for Delete',
  Restore = 'Restore',
  Delete = 'Delete',
  ApproveL1 = 'Approve L1',
  ApproveL2 = 'Approve L2',
}

export enum GridViewAction {
  Add = 1,
  Edit = 2,
  View = 3,
  Approve = 4,
  Reject = 5,
  Grant = 6,
  MarkForDelete = 7,
  Restore = 8,
  Delete = 9,
  StatusChange = 10,
  ApproveL1 = 11,
  ApproveL2 = 12,
  ApproveL3 = 13,
  ApproveL4 = 14,
  ApproveL5 = 15,
  ApproveL6 = 16,
  ApproveL7 = 17,
  ApproveL8 = 18,
  ApproveL9 = 19,
  ApproveL10 = 20,
  RequestForDelete = 21,
  DeleteL1 = 22,
  DeleteL2 = 23,
  DeleteL3 = 24,
  DeleteL4 = 25,
  DeleteL5 = 26,
  DeleteL6 = 27,
  DeleteL7 = 28,
  DeleteL8 = 29,
  DeleteL9 = 30,
  DeleteL10 = 31,
}

export enum CustomerContactDescription {
  MailingAddress = 1,
  OfficeAddress = 2,
  ResidentialAddress = 3,
  WaselAddress = 4,
  CountryOfOriginAddress = 5,
}

export enum SymbolRestrictions {
  BuyRestriction = 12,
  SellRestriction = 13,
}

export enum InstrumentTypeRestrictions {
  BuyRestriction = 14,
  SellRestriction = 15,
}

export enum ChannelRestrictions {
  BuyRestriction = 16,
  SellRestriction = 17,
}

export enum ApprovalStatus {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
  MarkedAsDeleted = 4,
  Deleted = 5,
  SentToExchange = 6,
  SentToBank = 7,
  Suspended = 8,
  Expired = 9,
  Active = 10,
  Inactive = 11,
  Dormant = 12,
  InactiveApprovedL1 = 13,
  DormantApprovedL1 = 14,
  InactiveRejected = 15,
  DormantRejected = 16,
  Processed = 17,
  Processing = 18,
  Canceled = 19,
  Invalidated = 20,
  PendingApprove = 21,
  Closed = 22,
  MarkedAsClosed = 23,
  PendingSettle = 24,
  Settled = 25,
  Frozen = 26,
  PartiallyProcessed = 27,
  Uploaded = 28,
  PendingTrigger = 30,
  Failed = 31,
  Staged = 32,
  RequestToCancel = 35,
  BuyOrderComplete = 36,
  InProgress = 38,
  OnHold = 42,
  Reversed = 43,
  Terminated = 44,
  PendingTerminate = 47,
  Success = 48,
  Accepted = 49,
  Passed = 54,
  Open = 56,
  ApprovedL1 = 101,
  ApprovedL2 = 102,
  ApprovedL3 = 103,
  ApprovedL4 = 104,
  ApprovedL5 = 105,
  ApprovedL6 = 106,
  ApprovedL7 = 107,
  ApprovedL8 = 108,
  ApprovedL9 = 109,
  ApprovedL10 = 110,
  RequestedForDelete = 200, // TODO : Check & confirm
  DeletedL1 = 201,
  DeletedL2 = 202,
  DeletedL3 = 203,
  DeletedL4 = 204,
  DeletedL5 = 205,
  DeletedL6 = 206,
  DeletedL7 = 207,
  DeletedL8 = 208,
  DeletedL9 = 209,
  DeletedL10 = 210,
}

export enum ScheduleStatus {
  Pending = 1,
  Active = 2,
  Rejected = 3,
  MarkedAsDeleted = 4,
  Deleted = 5,
  Sent = 6,
}

export enum SwitchType {
  Yes = 1,
  No = 0,
}

export enum ActionResultStatus {
  SUCCESS,
  ERROR,
  WARNING,
}

export enum ApprovalType {
  NONE = 0,
  ROW_WISE = 1,
  COLUMN_WISE = 2,
  FUNCTION = 3,
}

export enum ExecutingBrokerType {
  Broker = 1,
  Custody = 2,
  BrokerCustody = 3,
}

export enum ApprovalFunctions {
  REVBUY = 5,
  SUBFEE = 6,
  WITHDR = 2,
  CASHBLOCK = 7,
  CSHTRN = 3,
  DEPOST = 1,
  ODWITHDRAW = 4,
  CA_TDWL_REQUEST = 15,
  CHRREF = 16,
  ACCOUNTCLOSURE = 9,
  SHAREDEPOSIT = 10,
  SHAREWITHDRAW = 11,
  SHARETRANSFER = 12,
  SHAREPLEDGEIN = 13,
  SHAREPLEDGEOUT = 14,
  CUSTOMER_MARGIN = 17,
}

export enum ApprovalRequiredTables {
  M01_EXCHANGES = 1,
  M02_INSTITUTE = 2,
  M03_CURRENCY = 3,
  M04_CURRENCY_RATES = 4,
  M05_COUNTRY = 5,
  M06_CITY = 6,
  M07_LOCATION = 7,
  M08_TRADING_GROUP = 8,
  M09_COMPANY = 9,
  M10_RELATIONSHIP_MANAGER = 10,
  M12_EMPLOYEE_DEPARTMENT = 12,
  M14_ISSUE_LOCATION = 14,
  M15_IDENTITY_TYPE = 15,
  M19_ROUTING_DATA = 19,
  M20_SYMBOL = 20,
  M21_INTRODUCING_BROKER = 21,
  M22_COMMISSION_GROUP = 22,
  M23_COMMISSION_SLABS = 23,
  M24_COMMISSION_DISCOUNT_GROUP = 24,
  M25_COMMISSION_DISCOUNT_SLABS = 25,
  M26_EXECUTING_BROKER = 26,
  M28_CUSTOMER_GRADE_DATA = 28,
  M29_MARKETS = 29,
  M30_EX_BOARD_PERMISSIONS = 30,
  M31_EXEC_BROKER_ROUTING = 31,
  M32_EX_BOARD_STATUS_TIF = 32,
  M33_NATIONALITY_CATEGORY = 33,
  M34_EXEC_BROKER_COMMISSION = 34,
  M35_CUSTOMER_SETTL_GROUP = 35,
  M36_SETTLEMENT_CALENDAR = 36,
  M43_INSTITUTE_EXCHANGES = 43,
  M45_PERMISSION_GROUPS = 45,
  M46_PERMISSION_GRP_ENTLEMENTS = 46,
  M47_PERMISSION_GRP_USERS = 47,
  M50_EMPLOYEE_TRD_LIMITS = 50,
  M51_EMPLOYEE_TRADING_GROUPS = 51,
  M54_BOARDS = 54,
  M57_EXCHANGE_ORDER_TYPES = 57,
  M61_UPLOADABLE_DOCUMENTS = 61,
  M63_SECTORS = 63,
  M67_FIX_LOGINS = 67,
  M72_EXEC_BROKER_CASH_ACCOUNT = 72,
  M73_MARGIN_PRODUCTS = 73,
  M74_INTEREST_GROUP = 74,
  M76_STOCK_CONC_SYMBOL_DETAILS = 76,
  M77_SYMBOL_MARGINABILITY_GRPS = 77,
  M75_STOCK_CONCENTRATION_GROUP = 75,
  M78_SYMBOL_MARGINABILITY = 78,
  M93_BROKERAGE_BANK_ACCOUNTS = 93,
  M95_SETTLEMENT_CALENDAR_CONFIG = 95,
  M97_TRANSACTION_CODES = 97,
  M98_INSTITUTION_TXN_CODES = 98,
  M105_EXCHANGE_BROKER = 105,
  M110_REASONS = 110,
  M114_COMPANY_POSITIONS = 114,
  M117_CHARGE_GROUPS = 117,
  M118_CHARGE_FEE_STRUCTURE = 118,
  M120_SHARIA_COMPLIANT_GROUP = 120,
  M122_EXCHANGE_TICK_SIZES = 122,
  M125_EXCHANGE_INSTRUMENT_TYPE = 125,
  M128_MARITAL_STATUS = 128,
  M130_TITLES = 130,
  M131_MARKET_MAKER_GRPS = 131,
  M132_MARKET_MAKER_GRP_DETAILS = 132,
  M133_GL_ACCOUNT_TYPES = 133,
  M151_TRADE_CONFIRM_CONFIG = 151,
  M162_INCENTIVE_GROUP = 162,
  M163_INCENTIVE_SLABS = 163,
  U01_CUSTOMER = 1001,
  U02_CUSTOMER_CONTACT_INFO = 1002,
  U06_CASH_ACCOUNT = 1006,
  U07_TRADING_ACCOUNT = 1007,
  U08_CUSTOMER_BENEFICIARY_ACC = 1008,
  U09_CUSTOMER_LOGIN = 1009,
  U10_LOGIN_TRADING_ACC = 1010,
  U11_CASH_RESTRICTION = 1011,
  U12_TRADING_RESTRICTION = 1012,
  U17_EMPLOYEE = 1017,
  U20_LOGIN_CASH_RESTRICTION = 1020,
  U21_LOGIN_TRADING_RESTRICTION = 1021,
  U23_CUSTOMER_MARGIN_PRODUCT = 1023,
  U30_LOGIN_CASH_ACC = 1030,
  U43_USER_CASH_ACCOUNTS = 1043,
  U47_POWER_OF_ATTORNEY = 1047,
  U48_CUSTOMER_CORP_CONTACT = 1048,
  U49_POA_TRADING_PRIVILEGES = 1049,
  U50_KYC_ECDD_ANNUAL_REVIEW = 1050,
  U51_POA_SYMBOL_RESTRICTION = 1051,
  U55_POA_SYMBOL_RESTRICTIONS = 1055,
  U59_TRADING_ACC_FIX_LOGINS = 1059,
  V00_SYS_CONFIG = 2000,
  V00_SYS_CONFIG_BROKER_WISE = 2001,
  V09_INSTRUMENT_TYPES = 2009,
  T15_AUTHORIZATION_REQUEST = 3015,
  U06_CASH_ACCOUNT_DORMANT = 91006,
  M16_BANK = 16,
  M17_BANK_BRANCHES = 17,
  M27_IB_COMMISSION_STRUCTURES = 27,
  M140_CORP_ACTION_TEMPLATES = 140,
  M141_CUST_CORPORATE_ACTION = 141,
  M135_GL_ACCOUNTS = 135,
  M134_GL_ACCOUNT_CATEGORIES = 134,
  T42_CUST_CORP_ACT_HOLD_ADJUST = 3042,
  T43_CUST_CORP_ACT_CASH_ADJUST = 3043,
  T20_PENDING_PLEDGE = 3020,
  U28_EMPLOYEE_EXCHANGES = 1028,
  M150_Broker = 150,
  M70_CUSTODY_EXCHANGE = 70,
  M136_GL_EVENT_CATEGORIES = 136,
  M116_HIJRI_ADJUSTMENTS = 116,
  M90_REGION = 90,
  M87_EXEC_BROKER_EXCHANGE = 87,
  M65_SAIBOR_BASIS_RATES = 65,
  M154_SUBSCRIPTION_WAIVEOFF_GRP = 154,
  M155_PRODUCT_WAIVEOFF_DETAILS = 155,
  M156_EXCHANGE_WAIVEOFF_DETAILS = 156,
  M164_CUST_CHARGE_DISCOUNTS = 164,
  M166_CUSTODY_CHARGES_GROUP = 166,
  M167_CUSTODY_CHARGES_GROUP_SLAB = 167,
  U24_HOLDINGS = 1024,
  M165_DISCOUNT_CHARGE_GROUPS = 165,
  M168_OTC_TRADING_INSTRUMENTS = 168,
  M169_OTC_TRADING_COMMISSION = 169,
  T69_MONEY_MARKET_CONTRACT = 3069,
  M171_BOND_ISSUE_CONFIG = 171,
  M172_BOND_ISSUE_TERM_STRUCTURE = 172,
  T68_BOND_CONTRACT = 3068,
  M176_ORDER_LIMIT_GROUP = 176,
  M177_CASH_TRANSFER_LIMIT_GROUP = 177,
  M39_PRICE_QTY_FACTORS = 39,
  M170_INSTITUTE_CASH_ACC_CONFIG = 170,
  M179_FEATURE_CHANNEL_RESTRICT = 179,
  M183_OM_QUESTIONNAIRE = 183,
  M18_DERIVATIVE_SPREAD_MATRIX = 18,
  M184_CHANNEL_WISE_SYMBOL_RESTR = 184,
  M178_ASSET_MANAGEMENT_COMPANY = 178,
  M52_NOTIFICATION_GROUP = 52,
  M185_CUSTODY_EXCB_CASH_ACCOUNT = 185,
  M186_EXG_TRADING_ACC_TYPES = 186,
  M181_MURABAHA_BASKETS = 181,
  M40_FILE_PROCESSING_JOB_CONFIG = 40,
  M104_CUST_NOTIFICATION_SCHEDUL = 104,
  M189_LIMIT_ADJUST_REQUESTS = 189,
  M192_LOGIN_PROFILES = 192,
  M152_PRODUCTS = 152,
  M194_ASL_GROUPS = 194,
  M195_CUSTODY_EXCB_BANK_ACCOUNT = 195,
  M203_STATEMENT_TEMPLATE_GROUPS = 203,
  Z11_DYNAMIC_FORM_CONFIG = 4011,
  Z16_DYNAMIC_FORM_FIELDS = 4016,
  M41_FILE_PROCESSING_JOB_PARA = 41,
  U41_NOTIFICATION_CONFIGURATION = 1041,
  M88_TRANSACTION_APPROVAL = 88,
  M211_COMMISSION_REBATE_GROUP = 211,
  M212_COMMISSION_REBATE_STRUCT = 212,
  M214_EXG_ORDER_HANDLING_INST = 214,
  M215_AGING_REPORTS_TEMPLATES = 215,
  M216_AGING_REPORTS_SLABS = 216,
  M222_INSTITUTE_TRADE_ACCOUNT = 222,
  M221_SBL_INT_CHARGE_STRUCTURE = 221,
  M223_ROUTING_TRADER_ID_DETAILS = 223,
  M00_USER_MASTER_DATA = 0,
  M109_CUSTOMER_FAMILY_MEMBERS = 109,
  M220_SBL_INT_CHARGE_GROUP = 220,
  M230_SCHEDULE_NOTIFICATION = 230,
  M238_BILATERAL_PLEDGEE = 238,
  M244_POA_TYPES = 244,
  M241_FUND_ID = 241,
  M248_CUSTOMER_CATEGORY = 248,
  M253_CHANNEL_WISE_CASH_RESTR = 253,
  M250_COND_ORD_SUB_PCKG = 250,
  M257_FUND_MANAGER = 257,
  M258_INST_KYC_RENEW_CONFIG = 258,
  M259_EMPLOYMENT_TYPE = 259,
  M263_SWIFT_RECIPIENT = 263,
  M240_WAIVE_OFF_BULK_ASSIGNMENT = 240,
  U79_CUSTOMER_EFI_DETAILS = 1079,
  V15_SCHEDULER_CONFIGS = 2015,
  U16_TRADING_INSTRUMENT_RESTRIC = 1016,
  U18_TRADING_CHANNEL_RESTRICT = 1018,
  U31_CASH_SYMBOL_RESTRICTION = 1031,
  M261_INSTITUTE_ORDER_LIMITS = 261,
}

export enum AccountCategory {
  Individual = 1,
  Corporate = 2,
  Both = 3,
}

export enum LoginAuthenticationType {
  Password = 1,
  PasswordAndOTP = 2,
}

export enum TransactionAuthenticationType {
  NoPassword = 1,
  PasswordOnce = 2,
  PasswordEachTime = 3,
  USB = 4,
  OTP = 5,
}

export enum AccountType {
  Master = 1,
  Sub = 2,
}

export enum TransferType {
  Cash = 1,
  Beneficiary = 2,
}

export enum DepositWithdrawType {
  Deposit = 1,
  Withdraw = 2,
}

export enum ChargeRefund {
  Charge = 1,
  Refund = 2,
}

export enum Restrictions {
  Stock_Deposit = 6,
  Stock_Withdraw = 7,
  Stock_Transfer = 8,
  Cash_Deposit = 9,
  Cash_Withdraw = 10,
  Cash_Transfer = 11,
  Pledge_In = 18,
  Pledge_Out = 19,
  POA_Cash_Deposit = 23,
  POA_Cash_Withdraw = 24,
  POA_Cash_Transfer = 25,
  POA_Share_Transfer_Between_OMS_Customer = 27,
  POA_Share_Transfer_Within_Customer = 26,
  POA_Share_Transfer_Between_Brokers = 28,
}

export enum CustomerRestrictionType {
  Cash = 1,
  Trading = 2,
  LoginCash = 3,
  LoginTrading = 4,
  PoaTrading = 5,
  TradingAccountSymbol = 6,
  PoaAccountSymbol = 7,
}

export enum RestrictionType {
  Trading = 1,
  Cash = 2,
  TradingSymbol = 3,
  TradingInstrumentType = 4,
  TradingChannel = 5,
  POA = 6,
}

export enum CashBlockType {
  CashTransferBlock = 1,
  CashBlock = 2,
  CashTradeBlock = 3,
}

export enum Channel {
  External = 0,
  Web = 1,
  System = 4,
  FIX = 5,
  TWS = 6,
  AT = 7,
  Mobile = 9,
  IVR = 10,
  Applet = 11,
  DT = 12,
  All = -1,
}

export enum DealerId {
  System = 0,
}

export enum OrderStatus {
  CancelWaitingForConfirmation = 'D',
  AmendWaitingForConfirmation = 'N',
  New = '0',
  PartiallyFilled = '1',
  Filled = '2',
  Canceled = '4',
  Replaced = '5',
  PendingCancel = '6',
  Stopped = '7',
  Rejected = '8',
  Suspended = '9',
  Reversed = 'h',
  PendingNew = 'A',
  WaitingForApproval = 'c',
  Expired = 'C',
  OmsReceived = 'K',
  SendToOmsNew = 'M',
  OmsAccepted = 'O',
  SendToCancel = 'P',
  SendToAmend = 'Q',
  UnPlaced = 'U',
  Initiated = 'Z',
}

export enum TradeProcessingStatus {
  Pending = 1,
  Pending_Approve = 21,
  Approved = 2,
  Rejected = 3,
  Pending_Settle = 24,
  Settled = 25,
}

export enum OrderType {
  Market = 1,
  Limit = 2,
}

export enum TifType {
  Day = 0,
  GTC = 1,
  IOC = 3,
  GTD = 6,
  EOW = 7,
  EOM = 8,
  GTT = 10,
}

export enum LoginStatus {
  Pending = 0,
  Active = 1,
  Locked = 2,
  Suspended = 3,
  Deleted = 4,
}

export enum SecTransferType {
  Within_customer = 1,
  Between_oms_customer = 2,
  Between_brokers = 3,
}

export enum PoaCategory {
  Internal = 0,
  External = 1,
}

export enum ChargeType {
  None = 0,
  Broker_Only = 1,
  Exchange_and_Broker_Both = 2,
  Interest_Charge = 3,
}

export enum PledgeAction {
  Add_Pledge = 8,
  Release_Pledge = 9,
  Pledge_Call = 10,
}

export enum ReasonType {
  Cash_Transfer_Block = 1,
  Holding_Pledge = 2,
  Customer_Suspension = 4,
  Cash_Transaction_Block = 5,
  Stock_Transaction_Block = 6,
  Stock_Transfer_Block = 7,
  Pledge_Transaction_Block = 8,
  Trading_Transaction_Block = 9,
  Account_Closure_Reject = 15,
  Holding_Pledge_CMA = 19,
}

export enum PledgeType {
  None = -1,
  Pledge_In = 0,
  Pledge_Out = 1,
}

export enum PledgeMethod {
  UNILATERAL = 1,
  BILATERAL = 2,
}

export enum PledgeeType {
  INTERNAL = 0,
  EXTERNAL = 1,
}

export enum PledgeChargeFromType {
  NONE = 0,
  PLEDGOR = 1,
  PLEDGEE = 2,
}

export enum DateSelectorType {
  month = 1,
  dateRange = 2,
}

export enum AlertType {
  UMessages = 1,
}

export enum MarketStatus {
  PRE_OPEN = 4,
  OPEN = 2,
  CLOSED = 3,
  PRE_CLOSED = 5,
  HALTED = 1,
  TERMINATING = 7,
  CLOSING_AUCTION = 27,
  TRADE_AT_LAST = 20,
}

export enum CorporateActionType {
  International = 0,
  Local_TDWL = 1,
}

export enum OmsResponseStatus {
  Success = 1,
  Error = -1,
  Approved = 2,
  Rejected = 3,
  AccountAlreadyApproved = 4, // from create account
  OmsNotSync = 5,
  ShareTransferInitiated = 33,
}

export enum M31Type {
  U_Message = 1,
  other = 2,
}

export enum LocalCorporateActionTypes {
  Bonus_Issue = 101,
  Reverse_Split = 102,
  Right_Conversion = 103,
  Right_Issue = 104,
  Right_Subscription = 105,
  Stock_Dividends = 106,
  Stock_Split = 107,
  IPO_Holding = 301,
}

export enum CorporateActionTypes {
  Name_Change = 1,
  Exchange_Offer = 2,
  Capital_Increase = 3,
  Capital_Reduction = 4,
  Coupon_Payment = 5,
  Liquidation = 6,
  Rights_Exercise = 7,
  Spin_Off = 8,
  Cash_Dividends = 9,
  Stock_Dividends = 10,
  Stock_Split = 11,
  Rights_Distribution = 12,
  Cash_Merger = 13,
  Stock_Merger = 14,
  Warrants_Exercise = 15,
  Tender = 16,
  Dividend_Reinvestment = 17,
  Bonus_Issue = 18,
  Reverse_Split = 19,
  Warrant_Distribution = 20,
  Take_Over = 21,
  Optional_Dividend = 22,
  Interest_Payment = 23,
  Partial_Liquidation = 24,
  Income_Distribution = 25,
  Conversion = 26,
  Full_Redemption = 27,
  Stock_Split_With_New_Symbol = 60,
  Reverse_Split_With_New_Symbol = 61,
}

export enum InstrumentType {
  RHT = 1,
  OPT = 2,
  ETF = 3,
  CS = 4,
  MF = 5,
  BN = 6,
  REIT = 7,
  FUT = 8,
  WR = 9,
  SSF = 10,
}

export enum BankAccountType {
  Current = 1,
  Savings = 2,
  Investment = 3,
}

export enum ICMFailManagementStatus {
  Reject = 1,
  Settle = 2,
  BuyIn = 3,
  FailChain = 4,
  RecaptureReject = 5,
}

export enum NotificationType {
  Email = 2,
  Sms = 3,
  EmailSms = 6,
  PushNotification = 7,
}

export enum CustodianType {
  None = 0,
  ICM = 1,
  Holding = 2,
  Cash = 3,
  Full = 4,
}

export enum ExportType {
  CSV = 1,
  EXCEL = 2,
}

export enum ActiveUserType {
  ACTIVE = 0,
  DEACTIVATE = 1,
  SUSPENDED = 2,
}

export enum AddOrSubToSaiborRate {
  Add = 0,
  Sub = 1,
}

export enum TradingAccountType {
  FULLY_DISCLOSED = 1,
  NON_DISCLOSED = 2,
  SWAP = 3,
}

export enum MarginCallLevel {
  Notify = 1,
  Remind = 2,
  Liquidate = 3,
}

export enum SymbolPriceUploadFileType {
  Isin_Currency_Code = 1,
  Reuters_Code = 2,
  Exchange_Symbol = 3,
}

export enum PriceUserPoolStatus {
  Invalid = -1,
  Not_Used = 0,
  Reserved = 1,
  Using = 2,
}

export enum PriceUserPoolStatusText {
  Invalid = 'Invalid',
  Not_Used = 'Not Used',
  Reserved = 'Reserved',
  Using = 'Using',
}

export enum CustodyChargesGroupType {
  BrokerageSafekeepingChargesGroup = 1,
  CustodyHoldingChargesGroup = 2,
  CustodyBillingChargesGroup = 3,
  CustodyTransactionChargesGroup = 6,
}

export enum PostTradeAllocationAction {
  MERGE_ALLOCATE = 1,
  SPLIT = 2,
  MERGE = 3,
}

export enum PostTradeAllocationMethod {
  PRO_RATA = 1,
  MANUAL = 2,
}

export enum PostTradeAllocationRoundMethod {
  ROUND_TO_NEAREST_LOT_SIZE = 1,
  ROUND_TO_ABSOLUTE_VALUE = 2,
}

export enum TradeProcessNavigationPath {
  TradeProcess = 1,
  OrderMaster = 2,
}

export enum FileNames {
  UserSettings = 'userSettings',
  UserPreferences = 'userPreferences',
  UserInstitution = 'userInstitution',
  UserRecentMenus = 'userRecentMenus',
  UserPreferencesColumnSettings = 'userPreferencesColumnSettings',
  SavedState = 'savedState',
  MenusData = 'menusData',
  ColorsData = 'colorsData',
  FormData = 'formData',
  ColumnsData = 'columnsData',
  MainMenuData = 'mainMenuData',
  PrimaryInstitution = 'primaryInstitution',
  VersionData = 'versionData',
  UserTiles = 'userTiles',
  Entitlements = 'entitlements',
  IdToken = 'idToken',
  Tenant = 'tenant',
  Broker = 'broker',
}

export enum StorageScope {
  App = '1',
  User = '2',
}

export enum VatCollectedReportFilterCategory {
  CustomerNo = '1',
  AccountNo = '2',
  PortfolioNo = '3',
}

export enum HoldingFileType {
  CorporateAction = 1,
  WeeklyReconciliation = 2, // Still Not Use
  IPOHolding = 3,
}

export enum DataLoaderTemplateType {
  WeeklyReconciliation = 1,
  CorporateAction = 2,
  SymbolPriceUpload = 3,
  PriceIndices = 4,
  IPOHoldingUpload = 5,
  CustomerUpload = 6,
  PriceUserUpload = 7,
  InterestIndicesUpload = 8,
  EodReconciliation = 9,
  DailyHoldingReconciliation = 10,
  EodTradeReconciliation = 11,
  EodOrderReconciliation = 12,
  SymbolUpload = 13,
  SymbolStockConcentrationUpload = 15,
  CurrencyRatesUpload = 16,
  CustomerIdExpiryUpload = 17,
}

export enum OnlineMarginApprovalDocumentTypes {
  SIMAH = 1,
  BSFRemedial = 2,
  CreditApproval = 3,
}

export enum MarginProductCategory {
  Murabaha = 1,
  ConventionalMargin = 2,
  MurabahaWithFutures = 3,
  ConventionalMarginWithFutures = 4,
}

export enum AppSettingKey {
  Language = 'language',
  Theme = 'theme',
  IdleTimeout = 'idleTimeout',
  MenuStyle = 'menuStyle',
  MenuOrientation = 'menuOrientation',
  ConnectionSettings = 'connectionSettings',
}

export enum IpcRequests {
  StorageRead = 'storage-read',
  StorageWrite = 'storage-write',
  StorageReset = 'storage-reset',
  UpdateRestart = 'update-restart',
  AppRunning = 'app-running',
  CheckForUpdates = 'check-updates',
  ShowHelpGuide = 'show-help-guide',
}

export enum IpcResponses {
  StorageReadResponse = 'storage-read-response',
  StorageWriteResponse = 'storage-write-response',
  StorageResetResponse = 'storage-reset-response',
  NewUpdateAvailable = 'update-available',
}

export enum Z02ColumnType {
  Normal = 1,
  Number = 2,
  Date = 3,
  Currency = 4,
  CheckBox = 5,
  DropDown = 6,
  Button = 7,
  Hidden = 8,
  InputTextField = 9,
}

export enum ConnectionType {
  SOCKET = 100,
  REST = 199,
}

export enum ConnectionState {
  CONNECTING = 0,
  CONNECTED = 1,
  DISCONNECTING = 2,
  DISCONNECTED = 3,
  FALLBACK = 5,
}

export enum TradingAccountType {
  CLIENT = '1',
  HOUSE = '3',
  MARKET_MAKER = '101',
  REPURCHASING = '102',
  TRIANGULAR = '103',
  LIQUIDITY_PROVIDER = '104',
  LIQUIDITY_CONTRACT = '105',
}

export enum ReportFormat {
  crystalReports = 0,
  MSWord = 1,
  MSExcel = 2,
  RTF = 3,
  PDF = 5,
  recordToMSExcel = 6,
  text = 7,
  characterSeparatedValues = 8,
  tabSeparatedText = 9,
  editableRTF = 10,
  XML = 11,
}

export enum Z01SourceType {
  VIEW = 1,
  SP = 2,
}

export enum OrderMode {
  Online = 0,
  Offline = 1,
}

export enum ServiceId {
  SETTLEMENT_CALENDAR_SERVICE = 700,
  CUSTOMER_SUMMARY_FILE_UPLOAD = 702,
  INSTITUTE_DOCUMENT = 703,
  WEEKLY_RECONCILIATION = 704,
  CORPORATE_ACTIONS_LOCAL_FILES = 705,
  SMS_EMAIL_NOTIFICATIONS = 706,
  UPLOAD_PRICE_USERS = 707,
  IPO_CUSTOMERS_FILE_UPLOAD = 708,
  ONLINE_MARGIN_REQUEST = 709,
  MARGIN_PRODUCT_LIST = 710,
  INSTITUTE_REPORT = 711,
  INSTITUTE_LEVEL_DOCUMENT = 712,
  UPLOAD_MARGINABLE_SYMBOLS = 713,
  DAILY_HOLDINGS_RECON = 714,
  CRYPTO_SERVICE = 719,
}

export enum FormControlStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED',
}

export enum GridSelectionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export enum FileProcessingConfigType {
  WEEKLY_RECONCILIATION = 1,
  CUSTOMER_UPLOAD = 2,
  PRICE_USER_UPLOAD = 3,
  INTEREST_INDICES_UPLOAD = 4,
  IPO_HOLDING_UPLOAD = 5,
  EOD_RECONCILIATION = 6,
  CORPORATE_ACTION = 7,
  DAILY_HOLDINGS_RECONCILIATION = 8,
  EOD_TRADE_FILE_UPLOAD = 9,
  SYMBOL_STOCK_CONCENTRATION_UPLOAD = 15,
  CURRENCY_RATES_UPLOAD = 16,
  CUSTOMER_ID_EXPIRY_UPLOAD = 17,
}

export enum MovementTypes {
  Off_Market_Trade = 'U',
  Murabaha_Movement = 'M',
  Special_Account = 'S',
  Others = 'A',
}

export enum FileProcessingBatchType {
  AUTO = 1,
  MANUAL = 2,
}

export enum CashOrderLimitAdjustmentType {
  Order = 1,
  Cash = 2,
}

export enum ASLGroupLevel {
  NONE = 0,
  CASH_ACCOUNT = 1,
  TRADING_ACCOUNT = 2,
  GROUP = 3,
}

export enum TxnTypes {
  STOCK_DEPOSIT = 1,
  STOCK_WITHDRAW = 2,
  BONUS_ISSUE = 3,
  STOCK_ADJUSTMENT = 4,
  STOCK_SPLIT = 5,
  SPLIT = 6,
  STOCK_TRANSFER = 7,
  RIGHTS_SUBSCRIPTION = 13,
  RIGHTS_CONVERSION = 14,
  RIGHTS_REVERSAL = 15,
}

export enum SettlementTypes {
  NET_ORDER_VALUE = 1,
  COMMISSION_VAT = 2,
  BUY = 3,
}

export enum GridColumnTRanslateType {
  NO_TRANSLATE = 0,
  TRANSLATE_BY_APP = 1,
  TRANSLATE_BY_COLUMN = 2,
  TRANSLATE_BY_UNICODE_COLUMN = 3,
  TRANSLATE_BY_DYNAMIC_MENU = 4,
}

export enum MenuOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export enum MenuStyle {
  WINDOWS = 'windows',
  DROPDOWN = 'dropdown',
}

export enum CommissionTypes {
  COMMISSION = 0,
  TAX = 1,
  BOTH = 2,
}

export enum CommissionCategory {
  COMMISSION = 1,
  DISCOUNT = 2,
  TAX = 3,
  REBATE = 4,
  INCENTIVE = 5,
}

export enum ExtFieldDefType {
  TEXT = 1,
  DROPDOWN = 2,
  DATE = 3,
  TOGGLE = 4,
  CHECKBOX = 5,
}

export enum ExtFieldDefSubType {
  // TEXT
  TEXT = 1,
  NUMBER = 2,
  PHONE = 3,
  EMAIL = 4,
  // DATE
  DATE = 5,
  TIME = 6,
  DATETIME = 7,
  HIJRI = 8,
  // CHECKBOX/DROPDOWN
  SINGLE = 9,
  MULTI = 10,
  SINGLEFILTER = 11,
  MULTIFILTER = 12,
  // TOGGLE
  TOGGLE = 13,
}

export enum ExtOptionType {
  COUNTRY = 2,
  GENDER = 38,
  MARITALSTATUS = 19,
  TITLES = 18,
  CITY = 34,
  IDTYPE = 33,
  ISSUELOCATION = 101,
}

export enum ExtFieldBehaviorType {
  VISIBLE = 1,
  REQUIRED = 2,
  READ_ONLY = 3,
  FILTER_BY = 4,
}

export enum CashBlockTypeByTask {
  MANUAL = 0,
}

export enum OnlineTradingPreference {
  Currencies = 1,
  Exchanges = 2,
}

export enum DocContentType {
  IMAGE = 1,
  PDF = 2,
  WORD_DOC = 3,
}

export enum ScheduleFrequencyType {
  DAILY = 1,
  WEEKLY = 2,
  MONTHLY = 3,
  QUARTERLY = 4,
  SEMI_ANNUALLY = 5,
  ANNUALLY = 6,
  TIMELY = 7,
}

export enum ScheduleType {
  AUTO = 1,
  MANUAL = 2,
}

export enum ScheduleGroupCategory {
  USER = 1,
  CUSTOMER = 2,
  CUSTODIAN = 3,
}

export enum OrderSide {
  BUY = 1,
  SELL = 2,
  BOTH = 0,
}

export enum ScheduleGroupStatus {
  PENDING = 1,
  PROCESSESING = 2,
  PROCESSED = 3,
  ERROR = 4,
  REGENERATING = 6,
}

export enum EncryptionMethods {
  MD5 = 'MD5',
  SHA1 = 'SHA-1',
  SHA256 = 'SHA-256',
  SHA224 = 'SHA-224',
  SHA512 = 'SHA-512',
  SHA384 = 'SHA-384',
  SHA3 = 'SHA-3',
  RIPEMD160 = 'RIPEMD160',
}

export enum SolutionType {
  GENERAL = 0,
  SAAS = 1,
}

export enum CustomGridFilterOperators {
  STARTS_WITH = 'startsWith',
  EQUALS = 'equals',
  ENDS_WITH = 'endsWith',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  LIKE_OR = 'likeOr',
  BETWEEN = 'between',
}

export enum ImpactType {
  CASH_HOLDING_BOTH = 1,
  CASH_ONLY = 2,
  HOLDING_ONLY = 3,
}

export enum ReportDateFilter {
  TRADE_DATE = '1',
  SETTLE_DATE = '2',
}

export enum FunctionCodes {
  ACCOUNT_CLOSURE = 'ACCOUNTCLOSURE',
  CASH_ORDER_LIMIT_ADJUST = 'CSTRLIM',
  CUSTOMER_CORP_ACT_DISTRIBUTION = 'CUSTOMER_CORP_ACT_DISTRIBUTION',
  CUSTOMER_MARGIN = 'CUSTOMER_MARGIN',
  ONLINE_MARGIN = 'ONLINE_MARGIN',
  OD_WITHDRAW_LIMIT = 'ODWITHDRAW',
  CA_TDWL_REQUEST = 'CA_TDWL_REQUEST',
  WEEKLY_RECONCILIATION = 'WEEKLY_RECONCILIATION',
  COMMISSION_REBATE_DETAILS = 'CMRB',
  SBL_TERMINATION_REQUEST = 'SBLTERMREQ',
  INSTITUTIONAL_TRADE_PROCESSING = 'INSTRDPRO',
  CASH_BLOCK_REQUEST = 'CASHBLOCK',
  BLACKLISTED_CUSTOMER_REQUEST = 'BLKLSTCUST',
}

export enum NotificationCcType {
  SMS = 1,
  EMAIL = 2,
  SMS_AND_EMAIL = 3,
}

export enum CustomerActiveStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum DynamicMasterDataTemplateType {
  SymbolMasterDataUpload = 13,
  CustomerUpload = 6,
}

export enum FileUploadTemplateActionTypes {
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
}

export enum OmsApprovalType {
  Approve = 1,
  Reject = 2,
}

export enum OmsCorrectionType {
  HOLDING = 1,
  PRICE_COST = 3,
}

export enum OrderReversalStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum FileUploadTemplateDataTypes {
  UNIQUE_VALUE = 1,
  FOREIGN_KEY = 2,
  DATE = 3,
  MASTER_DATA_MAPPING = 4,
  FIXED_VALUE = 5,
  FILE_VALUE = 6,
  DIRECT_DATA_MAPPING = 7,
  MASTER_DATA_MAPPING_AUTO = 8,
  ONE_TO_MANY = 9,
  MANY_TO_ONE = 10,
  DATETIME = 11,
  DIRECT_TABLE_MAPPING = 12,
  EXTERNAL = 13,
  PASSWORD = 14,
}

export enum FileUploadTemplateDateTypes {
  TODAY = 1,
  CUSTOM_DATE = 2,
}

export enum FileUploadTemplateFileTypes {
  TRANSACTION = 1,
  MASTER_DATA = 2,
}

export enum ExternalTableSupport {
  ONLY_BY_EXTERNAL_TABLE = 1,
  DIRECT_INSERT = 2,
  BOTH = 3,
}

export enum AuthStatus {
  DEFAULT = -1,
  USER_PASSWORD_INCORRECT = 0,
  SUCCESSFUL = 1,
  FIRST_TIME_LOGIN = 2,
  ACCOUNT_LOCKED = 3,
  ALREADY_LOGGED_IN = 4,
  NOT_ACTIVATED = 5,
  SOFTWARE_VERSION_NOT_SUPPORTED = 6,
  EXPIRED = 7,
  INVALID_OTP = 8,
  OTP_ENABLED = 9,
  NOT_AUTHORIZED = 10,
  NOT_SUBSCRIBED_TO_PRODUCT = 13,
  CANNOT_LOGIN = 14,
  OTP_EXPIREDu0644 = 15,
  KYC_UPDATE_REQUIRED = 16,
  KYC_EXPIRED = 17,
  ACCOUNT_TEMPORARY_BLOCKED = 18,
  ACCOUNT_SUSPENDED = 19,
  PASSWORD_EXPIRED = 20,
  SESSION_EXPIRED = 21,
  LOGGED_IN_FROM_ANOTHER_DEVICE = 22,
  INVALID_SESSION = 23,
  ACCOUNT_DELETED = 24,
  LOGIN_FAILED = 25,
  AUTH_ERROR = 26,
}

export enum CustomizedTemplate {
  CUSTOMIZED = 1,
}

export enum NotificationTemplateStatus {
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
}

export enum ExchangeRateType {
  REGULAR_RATE = 'R',
  SELL_RATE = 'SR',
  BUY_RATE = 'BR',
  AVERAGE_RATE = 'AVG',
}

export enum MarginBuyOrderTifType {
  Day = 0,
  FAK = 3,
  FOK = 4,
}

export enum DashboardWidgetTypes {
  TOP_CUSTOMERS_BY_TRADED_COMMISSION = 1,
  TOP_CUSTOMERS_BY_TRADED_VOLUME = 2,
  TOP_CUSTOMERS_BY_TRADED_VALUE = 3,
  TOP_CUSTOMERS_BY_TRADED_EQUITY = 4,
  ACCOUNT_INFORMATION = 5,
  CASH_TRANSACTION_DISTRIBUTION = 6,
  FIVE_YEARS_MARKET_SHARES = 7,
  FIVE_YEAR_MARKET_COMMISSION = 8,
  ACTIVE_TRADING_CUSTOMER = 9,
  EXECUTION_AMOUNT_DISTRIBUTION = 10,
  HOLDINGS_SUMMARY = 11,
  DAILY_BUSINESS_SUMMARY = 12,
  TOP_TRADED_SYMBOLS_BY_VOLUME = 13,
  TOP_TRADED_SYMBOLS_BY_VALUE = 14,
  TOP_TRADED_SYMBOLS_BY_COMMISSION = 15,
  DEALER_WISE_COMMISSION = 16,
  TOP_PERFORMING_BRANCHES = 17,
  TOP_PERFORMING_RELATIONSHIP_MANAGER = 18,
}

export enum AgingReportType {
  DEBTOR = 1,
  CREDITOR = 2,
}

export enum IncentiveGroupType {
  RELATIONSHIP_MANAGER = 1,
  DEALER = 2,
  INTRODUCING_BROKER = 3,
  REFERRAL_CUSTOMER = 4,
}

export enum ManualProcessType {
  MANUAL_APPROVE_TXN = 'MA',
  MANUAL_REJECT_TXN = 'MR',
  MANUAL_RESEND_TXN = 'MS',
}

export enum ExecuteBrokerRoutingType {
  TRADE = 1,
  U_MESSAGE = 2,
  ALGO = 3,
}

export enum NegotiatedDealReportType {
  ACCEPTED = 2,
  WAITING_FOR_APPROVE = 20,
  REJECTED = 21,
}

export enum UsersWithEntitlementsReportType {
  USER = 1,
  ENTITLEMENT = 2,
}

export enum POAActiveStatus {
  Inactive = 0,
  Active = 1,
}

export enum QuoteOrderType {
  NORMAL = '1',
  BY_INITIATOR = '2',
  BY_RESPONDENT = '3',
}

export enum NegotiatedSide {
  TWO_SIDED = 1,
  CROSSING = 2,
}

export enum MarginRenewTerminationType {
  RENEW = 0,
  TERMINATE = 1,
}

export enum KycComponentNames {
  AdditionalDetails = 'AdditionalDetailsComponent',
}

export enum TransferTypeForGL {
  BETWEEN_CORPORATE_ACCOUNT = 1,
  BETWEEN_CUSTOMER_ACCOUNTS = 2,
}

export enum TransferTypeForGLByCustomer {
  FROM_CUSTOMER = 0,
  TO_CUSTOMER = 1,
}

export enum LenderCategory {
  BROKERAGE = 1,
  LONG_TERM = 2,
  SHORT_TERM = 3,
}

export enum SblCustomerType {
  Borrower = 1,
  Lender = 2,
}

export enum PostTradeStatus {
  ALLOCATED = 1,
  CONFIRMATION_SENT = 2,
  SPLIT = 3,
  MERGED = 4,
  MODIFIED = 5,
  BULK_MODIFIED = 6,
  FAIL_TRADE = 7,
  ERROR_TRADE = 8,
  ROLLBACK = 9,
}

export enum TradeProcessingApprovalTypes {
  APPROVE_ALL = 1,
  REJECT_ALL = 2,
}

export enum TransactionApprovalFunction {
  INSTRDPRO = 70,
}

export enum DynamicFormMasterData {
  ONLINE_CUSTOMER_OPENING = 'ONLINE_CUSTOMER_OPENING',
  MARGIN_PRODUCT_DYNAMIC_QUESTIONNAIRE = 'MARGIN_PRODUCT_DYNAMIC_QUESTIONNAIRE',
}

export enum DynamicFormConfiguration {
  IS_USER_DEFINED_NO = '0',
  IS_USER_DEFINED_YES = '1',
}

export enum OnlineMarginRequestActionType {
  NEW = 1,
  RENEW = 2,
}

export enum CustodyChargeGroupFilterLevel {
  SAFEKEEPING_FILTER_LEVEL = 'safekeeping',
  BILLINGHOLDING_FILTER_LEVEL = 'billingHolding',
  BILLINGTXN_FILTER_LEVEL = 'billingTransaction',
  CUSTODYTXN_FILTER_LEVEL = 'transactional',
}

export enum OrderMasterAction {
  GENERATE = 1,
  CALCULATE_COMMISSIONS = 2,
  SEARCH = 3,
}

export enum TradeProcessingApprovalStatus {
  PROCESSED = 1,
  PARTIALLY_PROCESSED = 2,
  PROCESSING = 4,
  BULK_PROCESSED = 5,
}

export enum TradeAllocationMethod {
  EQUALLY_DISTRIBUTED = 0,
  PERCENTAGE_BASE = 1,
  VOLUME_BASE = 2,
}

export enum InstituteTradeAccountType {
  ERROR = 1,
  FAIL = 2,
}

export enum ProfitType {
  FLAT = 1,
  PERCENTAGE = 2,
}

export enum ShareTransferFeeStrategy {
  NONE = 1,
  FROM_ACCOUNT = 2,
  TO_ACCOUNT = 3,
}

export enum Jobs {
  ARCHIVE_TABLE_DATA = 29,
}

export enum splitTradeMethod {
  NO_OF_TRADES = 0,
  PERCENTAGE = 1,
}

export enum WeeklyReconciliationApprovalTypes {
  APPROVE_ALL = 1,
  REJECT_ALL = 2,
}

export enum RowUpdateStatus {
  INITIAL = 1,
  PARTIALLY_UPDATED = 2,
  UPDATED = 3,
  FAILED = 4,
  VALID = 6,
  INVALID = 7,
}

export enum RowUpdateStatusText {
  INITIAL = '',
  UPDATED = 'Updated',
  FAILED = 'Failed',
  VALID = 'Valid',
  INVALID = 'Invalid',
}

export enum SmsEmailStopStatus {
  StopEmail = 1,
  StopSms = 2,
  StopEmailSms = 3,
}

export enum PostTradeCommissionStatus {
  UPDATED = 1,
  FAILED = 2,
}

export enum PostTradeCommissionStatusText {
  UPDATED = 'Updated',
  FAILED = 'Failed',
}

export enum ProfitFundedOptions {
  LOAN = 0,
  CASH = 1,
}

export enum MutualFundActionsText {
  BOTH = 'Both',
  SUBSCRIPTION = 'Subscription',
  REDEMPTION = 'Redemption',
}

export enum MutualFundActions {
  BOTH = 0,
  SUBSCRIPTION = 1,
  REDEMPTION = 2,
}

export enum ReleaseEnvironment {
  DEV = 1,
  QA = 2,
  UAT = 3,
  SIT = 4,
  PROD = 5,
}

export enum AccruedMarginFeesButtonAction {
  CAPITALIZE = 'capitalize',
  RE_CALCULATE = 're_calculate',
}

export enum AttachmentAvailable {
  NO = 0,
  YES = 1,
}

export enum CommissionSlabLevel {
  DEFAULT = 1,
  ADDITIONAL = 0,
}

export enum CommissionSlabLevelText {
  DEFAULT = 'Default Slab',
  ADDITIONAL = 'Additional Slab',
}

export enum FailTradeType {
  CHANGE_SETTLEMENT_DATE = 1,
  ENTER_REASON = 2,
  CHANGE_TRADING_ACCOUNT = 3,
}

export enum TransactionCode {
  MGNBLK = 'MGNBLK',
}

export enum TradeProcessingConfirmationStatus {
  PROCESSING = 18,
  PROCESSED = 17,
  REJECTED = 3,
}

export enum TradeProcessingConfirmationType {
  CUSTOMER = 1,
  CUSTODIAN = 2,
  EXECUTING_BROKER = 3,
  MASTER_CUSTOMER = 4,
  EXCHANGE = 5,
  INTRODUCING_BROKER = 6,
  RELATIONSHIP_MANAGER = 7,
  DEALER = 8,
  REFERRAL_CUSTOMER = 9,
}
export enum DerivativeOptActionType {
  EXERCISE = 1,
  ASSIGNMENT = 2,
  DENY_EXERCISE = 3,
  CLOSE_SHORT_POSITION = 4,
}
export enum DerivativeOptionType {
  PUT = 0,
  CALL = 1,
}

export enum TransactionDefinedBy {
  MANUAL = 0,
  SYSTEM = 1,
}

export enum TradeProcessingConfirmationSettlementAction {
  GENERATE_CONFIRMATION = 1,
  CONFIRMATION_ROLLBACK = 2,
  MARK_SETTLEMENT = 3,
  SETTLEMENT_ROLLBACK = 4,
}

export enum DeliveryAccountAvailabilityType {
  NONE = 1,
  SINGLE = 2,
  MULTIPLE = 3,
}

export enum OptionsRiskManagementType {
  NAKED_CALL_WITH_INITIAL_MARGIN = 1,
  COVERED_CALL_WITHOUT_INITIAL_MARGIN = 2,
  COVERED_CALL_WITH_INITIAL_MARGIN = 3,
}

export enum MarketType {
  CASH_MARKET = 1,
  DERIVATIVE_MARKET = 2,
}

export enum DerivativeExerciseStrategy {
  DERV_STRATEGY_PROFIT_LOSS_AND_MARKET_PRICE_ORDER = 1,
  DERV_STRATEGY_STRIKE_PRICE_ORDER = 2,
}

export enum CommissionStructureTransactionType {
  TRADE = 0,
  EXERCISE = 1,
  ASSIGNMENT = 2,
}

export enum UserMasterData {
  USER_MASTER_DATA_TYPE = 1,
  USER_MASTER_DATA_TYPE_DETAILS = 2,
}

export enum BankAccountCategory {
  BROKERAGE = 1,
  BROKER_CUSTODY = 2,
  INTRODUCING_BROKER = 3,
}

export enum DerivativePositionType {
  SHORT_POSITION = 1,
  LONG_POSITION = 2,
}

export enum LockType {
  GATEWAY = 1,
  USER = 2,
  TIMEOUT = 3,
}

export enum FamilyMemberCategory {
  INTERNAL = 0,
  EXTERNAL = 1,
}

export enum PasswordAuthenticationType {
  INTERNAL = 2,
  ACTIVE_DIRECTORY = 3,
}

export enum FixMessageType {
  EOD_FIX_MESSAGE = 1,
  DROP_COPY_FIX_MESSAGE = 2,
}

export enum DynamicFormConfigData {
  ONLINE_CUSTOMER_OPENING = 1,
  MARGIN_PRODUCT_DYNAMIC_QUESTIONNAIRE = 2,
}

export enum FileUploadTemplateColumnMappingCategory {
  INTERNAL = 1,
  EXTERNAL = 2,
  BOTH = 3,
}

export enum ScheduleGroupTemplateCategory {
  CASH = 1,
  CUSTOMER = 2,
  TRADING = 3,
  CUSTODIAN = 4,
}

export enum ScheduleGroupTemplateExportType {
  PDF = 1,
  CSV = 2,
  EXCEL = 3,
  TEXT = 4,
}

export enum StatementTemplateCategory {
  ALL = 0,
  USER = 1,
  CUSTOMER = 2,
  CUSTODIAN = 3,
}

export enum StatementTempDesignerAggConditionType {
  TRADE = 1,
  ORDER = 2,
  SYMBOL_TRADE_SIDE = 3,
  CUSTOM = 4,
}

export enum StatementTempDesignerAggregationMethod {
  NONE = 0,
  SUM = 1,
  MAX = 2,
  LIST = 3,
}

export enum StatementTemplateDataSourceType {
  VIEW = 1,
  SP = 2,
}

export enum ScheduleMessageType {
  GENERAL = 1,
  PROMOTION = 2,
  GREETING = 3,
  BIRTHDAY = 4,
}

export enum ScheduleMessageSendOption {
  SMS = 1,
  EMAIL = 2,
  PUSH_NOTIFICATION = 3,
}

export enum SelectionMode {
  SYSTEM = 1,
  FILE_UPLOAD = 2,
}

export enum FileTemplateCustomColumnType {
  FORMULA = 1,
  TEXT = 2,
}

export enum FixLoginStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum BrokerageCategory {
  INTERNATIONAL = 1,
  LOCAL = 2,
}

export enum SubscriptionStatus {
  UNSUBSCRIBE = 0,
  SUBSCRIBE = 1,
}

export enum DynamicTemplateParamsValueType {
  DEFAULT = 'Default',
  REPORT_SERVER_META_DATA = 'Report Server Meta Data',
}

export enum UserCategory {
  LOCAL = 0,
  INTERNATIONAL = 1,
  BOTH = 2,
}

export enum RequestedByCmaOrOther {
  Other = 0,
  CMA = 1,
}

export enum MarketSessionType {
  NONE = 0,
  PRE = 1,
  POST = 2,
}

export enum AgeCategory {
  UNDERAGE = 1,
  MINOR = 2,
  ADULT = 3,
}

export enum BlacklistedCustomerType {
  INTERNAL = 1,
  EXTERNAL = 2,
}

export enum BlacklistedCustomerRequestType {
  ADD = 1,
  EDIT = 2,
  CLEAR = 3,
}

export enum CustomerStatus {
  ACTIVE = 0,
  FROZEN = 1,
  SUSPENDED = 2,
  BLACKLISTED = 3,
}

export enum BlacklistedOnlineCustomerCreationStatus {
  REJECTED = 1,
  WAITING_FOR_APPROVAL = 2,
}

export enum CustomerIdType {
  NIN = 1,
}

export enum RestrictionFrequency {
  DATE_WISE = 1,
  DAY_WISE = 2,
}

export enum RestrictionStatus {
  ENABLED = 1,
  DISABLED = 2,
  EXPIRED = 3,
}

export enum SubscriptionWaiveOffType {
  PRODUCT_CATEGORY = 1,
  PRODUCT = 2,
}

export enum WaiveOffType {
  PERMANENT = 0,
  TEMPORARY = 1,
}

export enum WaiveOffTypeText {
  PERMANENT = 'Permanently Override Previous Waive-Off',
  TEMPORARY = 'Rollback to Previous After Expiry',
}

export enum narrationOption {
  REASON_MESSAGE = 0,
  MSG_FROM_AXE_CAP = 1,
  WIX = 2,
}

export enum CommissionType {
  BROKER_COMMISSION_AND_TAX = 2,
  TOTAL_COMMISSION_AND_TAX = 8,
}

export enum TransactionLimitFrequency {
  CUMULATIVE = 1,
  PER_TRANSACTION = 2,
}
export enum InstrumentSubscriptionTypes {
  NONE = 0,
  SUBSCRIPTION = 1,
  SUBSCRIPTION_AND_REDEMPTION = 3,
}

export enum RiskStatus {
  NONE = -1,
  NEUTRAL = 1,
  HIGH = 2,
}

export enum CustomerGeneralChangeBehaviors {
  RISK_LEVEL_CHANGED = 1,
}

export enum ShowSummaryType {
  NONE = 0,
  SHOW_TOTAL_VALUE = 1,
  SHOW_NO_OF_DISTINCT_VALUES = 2,
}

export enum SymbolRestrictionType {
  BUY = 12,
  SELL = 13,
  BOTH = 0,
}

export enum TransactionLimitFreq {
  CUMULATIVE = 1,
  PER_TRANSACTION = 2,
}
