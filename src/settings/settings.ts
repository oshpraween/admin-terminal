import { EncryptionMethods, Languages, SolutionType } from 'src/enum/settings';

export class Settings {
  public static auth = { token: undefined };

  public static api = {
    baseUrl: 'http://127.0.0.1:8082/aura-server',
    websocketUrl: 'ws://192.168.14.214:9080/streaming-api',
    secondaryBaseUrl: 'http://127.0.0.1:8082/aura-server',
    secondaryWebsocketUrl: 'ws://192.168.14.214:9080/streaming-api',
    restApiTimeout: 60 * 1000,
    websocketRequestTimeout: 60000,
  };

  public static app = {
    version: '10.035.0.0',
    buildVersionInfo: [],
    builtDate: new Date(), // this will be overridden by an app config, hence will be constant value
  };

  // solutionType will be SolutionType.SAAS in saas environments
  public static solutionType = SolutionType.GENERAL;
  public static brokerCode = '';
  public static countryCode = null;
  public static KycMandatory = false; // TODO: [YD]
  public static enableNasdaq = true;
  public static applicationDateFormat = 'dd/MM/yyyy';
  public static applicationDateTimeFormat = 'dd/MM/yyyy HH:mm:ss';
  public static sqlDateFormat = 'dd-MMM-yyyy';
  public static sqlDateTimeFormat = 'dd-MMM-yyyy HH:mm:ss';
  public static sqlDBDateFormat = 'DD-MON-YYYY';
  public static sqlDBDateTimeFormat = 'DD-MON-YYYY HH24:MI:SS';
  public static applicationTimeFormat = 'HH:mm:ss';
  public static hijriDateSeparator = '/';
  public static tenantCode = 'DEFAULT_TENANT';
  public static localRootFilePath = 'D:\\';
  public static freezeCustodian = 0;
  public static hashMethod: EncryptionMethods = EncryptionMethods.SHA256;
  public static isSaltedPassword = false;
  public static publicKey = '';
  public static esbPublicKey = '';
  public static tenantSelectionText = 'Select Tenant';
  public static enableBrokerSelection = false;
  public static brokers = [];
  public static backOfficeServerReady = false;

  public static default = {
    // Application Specific Settings
    language: Languages.EN,
    secondLanguage: Languages.AR,
    secondLanguageDirection: 'rtl',
    theme: 'light',
    idleTimeout: 15, // In minutes
    menuOrientation: 'horizontal',
    menuStyle: 'windows',
    timeZone: { value: '+0000' },

    // Currency Specific
    currency: { value: 17 },
    internationalCurrency: { value: 21 },
    currencyCode: 'SAR',
    currencyName: 'RIYAL',
    currencyMinorUnitName: 'HALALA',
    decimalForCurrencyValue: 2,
    decimalForPriceInputFields: 8,
    minimumCommissionBulkApplyDefaultCurrency: 'USD',

    // Customer Creation Specific Settings
    customerLoginAutoTradingAcc: true,

    // Gridview Specific Settings
    numberOfRowsPerPage: 20,
    advancedFilterMinLen: 1,
    advancedFilterSeparator: ',',

    // Dropdown Default Values
    country: { value: 390 },
    nationality: { value: 390 },
    region: { value: 1 },
    accountCategory: { value: 1 },
    accountCategoryType: { value: 2 },
    tradingAccountType: { value: 1 },
    grade: { value: 'A' },
    gender: { value: 'M' },
    maritalStatus: { value: 1 },
    preferredLanguage: { value: 1 },
    location: { value: 1 },
    idType: { value: 2 },
    accessLevel: { value: 1 },
    city: { value: 416 },
    masterAccounts: { value: null },
    employeeTypeAtUser: { value: 1 },
    employeeTypeDealer: { value: 3 },
    employeeTypeSystemUser: { value: 14 },
    employeeDepartment: { value: 1 },
    employeeLoginStatus: { value: 0 },
    passwordComplexityLevels: { value: 0 },
    priceBlockTypes: { value: 0 },
    documentTypes: { value: 1 },
    customerLoginStatus: { value: 1 },
    loginAuthenticationType: { value: 1 },
    transactionAuthenticationType: { value: 1 },
    instrumentType: { value: 4 },
    exchange: { value: 1 },
    exchangeCode: { value: 'X' },
    saiborBasisDurations: { value: 0 },
    marginProduct: { value: 1 },
    lossCategory: { value: 1 },
    settleCategory: { value: 0 },
    marketSegment: { value: 1 },
    markets: { value: 1 },
    bondTradeType: { value: 1 },
    clientType: { value: 1 },
    depositWithdrawRequstChannel: { value: 1 },
    depositWithdrawTransactionType: { value: 1 },
    manualOrderExecutionStatus: { value: 2 },
    exchangeBrokers: { value: 2 },
    kycQuestion: { value: -1 },
    kycClientRiskAssessment: { value: 1 },
    themeType: { value: 'light' },
    bankAccountType: { value: 3 },
    cashAccountType: { value: 1 },
    beneficiaryType: { value: 2 },
    docContentType: { value: 1 },
    custodianType: { value: 0 },
    defaultCustodian: { value: 1 },
    formSourceType: { value: 1 },
    formType: { value: 1 },
    applyRounding: false,
    restrictToNoOfDecimals: true,
    commissionCategory: { value: 0 },
    eODSettleAccountType: { value: 0 },
    priceTypes: { value: 0 },
    prefredInstType: { value: 0 },
    positionSide: { value: 1 },
    issueLocation: { value: undefined },
    customerCategory: { value: 0 },
    entitlementCategory: { value: 1 },
    isFilterAlwaysVisible: false,
    supportMultiLanguage: true,
    orderSide: { value: 1 },
    agentTypes: { value: 0 },
    commissionStructureTransactionType: { value: 0 },
    ageCategory: { value: 3 },
    costCalculationMethod: { value: 1 },
    passwordAuthenticationType: { value: 2 },
  };

  public static user = {
    userIsFirstLogin: false,
    userPasswordExpired: false,
    userId: 3, // TODO: [YD] Check why this can't be -1
    userFullName: '',
    userAllowAllInstitutionView: false,
    displayDecimalNumber: 2,
    userName: '',
    clientIp: null,
    loginBroker: '',
    usrType: '',
  };

  public static userInstitution = {
    institutionId: null,
    institutionName: '',
    brokerCode: '',
    institutionEmail: '',
    institutionTelephone: '',
    enableMakerChecker: 0,
    enableGroupBuyingPower: 0,
    minCoverageRatio: 0,
    passwordWarningDays: 0,
    allowMultiCashTradingAccountLink: 0,
    isRootInstitution: false,
    nextKycRenewalYearsForIndividualClients: 0,
    nextKycRenewalYearsForCorporateClients: 0,
    autoGenerateInvestmentAccountNo: false,
    primaryInstitutionId: null,
    isPrimaryInstituteUser: false,
    underageToMinorYears: 0,
    minorToMajorYears: 0,
    productName: '',
    institutionAddress: '',
    institutionFaxNo: '',
  };

  public static approvalStatusText = {
    Pending: 'Pending',
    Approved: 'Approved',
    Rejected: 'Rejected',
    MarkedAsDeleted: 'Marked As Deleted',
    Deleted: 'Deleted',
    SentToExchange: 'Sent To Exchange',
    SentToBank: 'Sent to bank',
    Suspended: 'Suspended',
    Expired: 'Expired',
    Active: 'Active',
    Inactive: 'Inactive',
    Dormant: 'Dormant',
    InactiveApprovedL1: 'Inactive Approved L1',
    DormantApprovedL1: 'Dormant Approved L1',
    InactiveRejected: 'Inactive Rejected',
    DormantRejected: 'Dormant Rejected',
    Processed: 'Processed',
    Processing: 'Processing',
    Canceled: 'Canceled',
    Invalidated: 'Invalidated',
    PendingApprove: 'Pending Approve',
    Closed: 'Closed',
    MarkedAsClosed: 'Marked As Closed',
    PendingSettle: 'Pending Settle',
    Settled: 'Settled',
    Frozen: 'Frozen',
    PartiallyProcessed: 'Partially Processed',
    Uploaded: 'Uploaded',
    Staged: 'Staged',
    Grant: 'Granted',
    PendingTrigger: 'Pending Trigger',
    OnHold: 'On Hold',
    Open: 'Open',
    ApprovedL1: 'Approved L1',
    ApprovedL2: 'Approved L2',
    ApprovedL3: 'Approved L3',
    ApprovedL4: 'Approved L4',
    ApprovedL5: 'Approved L5',
    ApprovedL6: 'Approved L6',
    ApprovedL7: 'Approved L7',
    ApprovedL8: 'Approved L8',
    ApprovedL9: 'Approved L9',
    ApprovedL10: 'Approved L10',
    RequestedForDelete: 'Requested for Delete',
    DeletedL1: 'Deleted L1',
    DeletedL2: 'Deleted L2',
    DeletedL3: 'Deleted L3',
    DeletedL4: 'Deleted L4',
    DeletedL5: 'Deleted L5',
    DeletedL6: 'Deleted L6',
    DeletedL7: 'Deleted L7',
    DeletedL8: 'Deleted L8',
    DeletedL9: 'Deleted L9',
    DeletedL10: 'Deleted L10',
    Terminated: 'Terminated',
    PendingTerminate: 'Pending Terminate',
    Passed: 'Passed',
    Reversed: 'Reversed',
  };

  public static approvalActionText = {
    Add: 'Add',
    Edit: 'Edit',
    View: 'View',
    Approve: 'Approve',
    Reject: 'Reject',
    Grant: 'Grant',
    MarkForDelete: 'Mark for Delete',
    Restore: 'Restore',
    Delete: 'Delete',
    ApproveL1: 'Approve L1',
    ApproveL2: 'Approve L2',
    ApproveL3: 'Approve L3',
    ApproveL4: 'Approve L4',
    ApproveL5: 'Approve L5',
    ApproveL6: 'Approve L6',
    ApproveL7: 'Approve L7',
    ApproveL8: 'Approve L8',
    ApproveL9: 'Approve L9',
    ApproveL10: 'Approve L10',
    RequestForDelete: 'Request for Delete',
    DeleteL1: 'Delete L1',
    DeleteL2: 'Delete L2',
    DeleteL3: 'Delete L3',
    DeleteL4: 'Delete L4',
    DeleteL5: 'Delete L5',
    DeleteL6: 'Delete L6',
    DeleteL7: 'Delete L7',
    DeleteL8: 'Delete L8',
    DeleteL9: 'Delete L9',
    DeleteL10: 'Delete L10',
    Terminate: 'Terminate',
  };

  public static approvalLevelMenuText = {
    Add: 'Add',
    Edit: 'Edit',
    View: 'View',
    Approve: 'Approve',
    Reject: 'Reject',
    Grant: 'Grant',
    MarkForDelete: 'Mark for Delete',
    Restore: 'Restore',
    Delete: 'Delete',
    ApproveL1: 'Level 1 Approve',
    ApproveL2: 'Level 2 Approve',
    ApproveL3: 'Level 3 Approve',
    ApproveL4: 'Level 4 Approve',
    ApproveL5: 'Level 5 Approve',
    ApproveL6: 'Level 6 Approve',
    ApproveL7: 'Level 7 Approve',
    ApproveL8: 'Level 8 Approve',
    ApproveL9: 'Level 9 Approve',
    ApproveL10: 'Level 10 Approve',
    RequestForDelete: 'Request for Release',
    DeleteL1: 'Level 1 Delete',
    DeleteL2: 'Level 2 Delete',
    DeleteL3: 'Level 3 Delete',
    DeleteL4: 'Level 4 Delete',
    DeleteL5: 'Level 5 Delete',
    DeleteL6: 'Level 6 Delete',
    DeleteL7: 'Level 7 Delete',
    DeleteL8: 'Level 8 Delete',
    DeleteL9: 'Level 9 Delete',
    DeleteL10: 'Level 10 Delete',
  };

  public static poaCategoryText = {
    Internal: 'Internal Customer',
    External: 'External Party',
  };

  public static employeeTradingLimits = {
    MaxOrderValue: 0,
    MaxBuyOrderValue: 0,
    MaxSellOrderValue: 0,
    PriceTolerence: 0,
    BpExceedLimit: 0,
    BreachCoverageRatio: 0,
    ApprovableOverdrawLimit: 0,
    ApprovableOrderLimit: 0,
    m50OrderValuePerDay: 0,
    m50OrderVolumePerDay: 0,
    m50MaxNegotiatedOrderValue: 0,
  };

  public static notifications = {
    stickyNotifications: false,
  };

  public static regEx = {
    telephoneNo: '^\\+{0,1}\\d+(\\-\\d+)*?$', // this regEx is incorrect (doesn't work at all)
    email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  };

  public static familyMemberCategoryText = {
    INTERNAL: 'Internal Customer',
    EXTERNAL: 'External Party',
  };

  public static scheduleStatusText = {
    Pending: 'Pending',
    Active: 'Active',
    Rejected: 'Rejected',
    MarkedAsDeleted: 'Marked As Deleted',
    Deleted: 'Deleted',
    Sent: 'Sent',
  };

  public static customerStatusText = {
    ACTIVE: 'Active',
    FROZEN: 'Frozen',
    SUSPENDED: 'Suspended',
    BLACKLISTED: 'Blacklisted',
  };

  public static appConfig = {
    enableMockData: true,
  };
}
