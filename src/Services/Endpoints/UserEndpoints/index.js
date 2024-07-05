export const Apis = {
  login: '/Account/Login',
  register: '/Account/Register',
  accountDetails: '/Account/GetAccountDetails',
  visitor: '/Visitor/GetMyVisitors',
  getAllVisitors: '/Visitor/GetAllVisitors',
  visitorInvites: '/Visitor/GetInvites',
  purposeList: '/Visitor/GetVisitPurpose',
  submitPurposeForm: '/Visitor/AddVisitor',
  addWalkinVisitor: '/Visitor/AddWalkInVisitor',
  AddGroupInvite: '/Visitor/AddGroupInvite',
  delVisitor: '/Visitor/DeleteVisitor?VisitId=',
  editVisitor: '/Visitor/EditVisitor',
  statusVisitor: '/Visitor/ChangeVisitorStatus?',
  walkInStatus: '/Visitor/ChangeWalkInVisitorStatus?',
  // residentRegistrationStatus: '/Apartment/ApproveOwnerRegistration?',
  residentRegistrationStatus: '/Registration/ApproveOwnerRegistration?',
  getWalkingVisitor: '/Visitor/GetWalkInVisitors',
  // getAllResidentRegistrationRequest: '/Apartment/GetAllOwnerRegistration',
  getAllResidentRegistrationRequest: '/Registration/GetAllOwnerRegistration',
  DeletePoll: '/Polling/DeletePoll',
  getMyComplains: '/Complain/GetMyComplains',
  getAllComplains: '/Complain/GetAllComplains',
  addComplains: '/Complain/AddComplain',
  uploadAttachmentComplain: '/Complain/UploadAttachment',
  getLocations: '/Complain/GetLocation',
  getAnnouncement: '/Announcement/GetAnnouncements?AccountID=',
  getDocument: '/Document/GetDocuments',
  getPolling: '/Polling/GetPollingsByUser',
  getAdminPolling: '/Polling/GetPollingsByAdmin',
  addPolling: '/Polling/CreatePolling',
  getEvents: '/Event/GetEvents',
  changeEventStatus: '/Event/ChangeEventStatus',
  getAmenities: '/Amenities/GetAmenities',
  createAmenity: '/Amenities/AddAmenity',
  updateAmenity: '/Amenities/EditAmenity',
  ReadAnnouncement: '/Announcement/ReadAnnouncement?',
  deleteAmenity: '/Amenities/DeleteAmenity',
  DeleteEForm: '/EForm/DeleteEForm',
  // DeleteAdmin: '/Account/DeleteAdmin',
  DeleteAdmin: '/Employee/DeleteAdmin',
  deleteDocument: '/Document/DeleteDocument',
  DeleteContactType: '/EmergencyContact/DeleteContactType',
  addBooking: '/FacilityBooking/AddBooking',
  addAnnouncement: '/Announcement/AddAnnouncement',
  changeComplainStatus: '/Complain/ChangeComplaintStatus?',
  ReadNotification: '/Notification/ReadNotification',
  approvedBookingStatus: '/FacilityBooking/ChangeBookingStatus',
  ViewNotification: '/Notification/ViewNotification',
  addDocPict: '/Document/UploadAttachment',
  // uploadRegistrationDoc: '/Apartment/UploadFile',
  uploadRegistrationDoc: '/Registration/UploadFile',
  addDoc: '/Document/AddDocument',
  getFacilityBooking: '/FacilityBooking/GetBookingsByAdmin',
  GetAllAdmins: '/Employee/GetAllAdmins',
  // GetAllAdmins: '/Account/GetAllAdmins',
  getFacilityBookingByUser: '/FacilityBooking/GetBookingsByUser',
  changeBookingStatus: '/FacilityBooking/ChangeBookingStatus',
  EditBooking: '/FacilityBooking/EditBooking',
  getVenue: '/Event/GetVenue',
  createEvent: '/Event/AddEvent',
  EditEvent: '/Event/EditEvent',
  CancelBookingRequest: '/FacilityBooking/CancelBookingRequest',
  uploadEventImage: '/Event/UploadImage',
  verifyOtp: '/Account/VerifyAccount',
  getBuildings: '/Apartment/GetAllBuildingsAndApartments',
  getAppartmentHistory: '/Apartment/GetApartmentHistory',
  getOwners: '/Account/GetPaidnUnpaidAccounts',
  getOwnerDetail: '/Apartment/GetApartmentOwner',
  createOwner: '/Apartment/AddOwner',
  updateOwner: '/Apartment/EditOwner',
  resentOtp: '/Apartment/ResendOTPOwner',
  unitMemberResentOtp: '/Apartment/ResendOTPUnit',
  // employeeResentOtp: '/Account/ResendOTPAdmin',
  employeeResentOtp: '/Employee/ResendOTPAdmin',
  // residentregistrationRequest: '/Apartment/AddOwnerRegistration',
  residentregistrationRequest: '/Registration/AddOwnerRegistration',
  deleteOwner: '/Apartment/DeleteOwner',
  SubmitVote: '/Polling/SubmitVote?OptionId=',
  getContacts: '/EmergencyContact/GetContacts',
  getContactTypes: '/EmergencyContact/GetContactType',
  addEmergencyContact: '/EmergencyContact/AddContact',
  editContact: '/EmergencyContact/EditContact',
  AddContactType: '/EmergencyContact/AddContactType',
  getCafeteriaContacts: '/Cafeteria/GetCafeteria',
  addCafeteriaContact: '/Cafeteria/AddCafeteria',
  EditCafeteria: '/Cafeteria/EditCafeteria',
  // DeleteAdmin: '/Account/DeleteAdmin',
  DeleteAdmin: '/Employee/DeleteAdmin',
  uploadCafeteriaImage: '/Cafeteria/UploadFile',
  uploadAmenityImage: '/Amenities/UploadFile',
  uploadReceipt: '/CustomerPayment/UploadAttachment',
  getBookingsDate: '/FacilityBooking/GetBookingDates',
  getServices: '/Account/GetModules',
  // createEmployee: '/Account/RegisterAdmin',
  createEmployee: '/Employee/RegisterAdmin',
  // updateEmployee: '/Account/EditAdmin',
  updateEmployee: '/Employee/EditAdmin',
  getEForm: '/EForm/GetEFroms',
  createEForm: '/EForm/AddEFrom',
  submitEForm: '/EForm/SubmitEForm',
  getSubmittedEForm: '/EForm/GetSubmitedEForms',
  getAllEmployee: '/Employee/GetAllAdmins',
  // getAllEmployee: '/Account/GetAllAdmins',
  GetPayRoll: './PayRoll/GetPayRoll',
  GetNotifications: '/Notification/GetNotifications',
  getMyUnits: '/Apartment/GetMyResident',
  getUnitTypes: '/Apartment/GetUnitTypes',
  addResident: '/Apartment/AddUnits',
  getApartmentOwner: '/Apartment/GetApartmentOwner',
  getUnitDetail: '/Apartment/GetUnitDetails?',
  updateResident: '/Apartment/EditUnit',
  deleteResident: '/Apartment/DeleteUnit',
  getRecentPayment: '/CustomerPayment/GetRecentRecievings',
  getStatements: '/CustomerPayment/GetMyStatement',
  addReceiving: '/CustomerPayment/AddReceiving',
  getAccountsDetail: '/Account/GetSocietyAccountDetails',
  getSoldApartment: '/Apartment/GetSoldApartments',
  GetSoldApartmentsByBuildings: '/Apartment/GetSoldApartmentsByBuildings',
  getAvailableAppartment: '/Apartment/GetAvailableApartmentsByBuildings',
  //tenant apis
  getAvailableAppartmentForTenant: '/Apartment/GetSoldApartmentsByBuildingsWithoutAuth',
  uploadTenantDoc: '/Tenant/UploadFile',
  tenantRegistrationRequest: '/Tenant/AddRentalRegistration',
  getAllTenantRegistration: '/Tenant/GetAllRentalRegistration',
  tenantRegistrationStatus: '/Tenant/ApproveRentalRegistration?',
  tenentResentOtp: '/Apartment/ResendOTPRentalOwner',
  getRentalUnitDetail: '/Apartment/GetRentalUnitDetails?',
  addRentalResident: '/Apartment/AddRentalUnits',
  updateRentalResident: '/Apartment/EditRentalUnit',
  allotMachineId: '/Apartment/UpdateRentalOwnerMachineID',
  deleteRentalResident: '/Apartment/DeleteRentalUnit',
  getRentalUnits: '/Apartment/GetMyRentalResident',
  getRentalDetail: '/Apartment/GetRentalOwner?',
  getSociety: '/Society/GetSocieties',
  getExpenses: '/Expense/GetExpenses',
  getExpenseByAccountId: '/Expense/GetExpensesAccountWise',
  createExpense: '/Expense/AddExpense',
  updateExpense: '/Expense/EditExpense',
  deleteExpense: '/Expense/DeleteExpense',
  getInvoices: '/Invoice/GetInvoices',
  createInvoice: '/Invoice/AddMultipleInvoices',
  updateInvoice: '/Invoice/EditInvoice',
  deleteInvoice: '/Invoice/DeleteInvoice',
  getPurchases: '/Purchase/GetPurchases',
  createPurchase: '/Purchase/AddPurchase',
  AddPayRoll: '/PayRoll/AddPayRoll',
  updatePurchase: '/Purchase/EditPurchase',
  deletePurchase: '/Purchase/DeletePurchase',
  getVendors: '/Vendor/GetVendors',
  createVendor: '/Vendor/AddVendor',
  updateVendor: '/Vendor/EditVendor',
  deleteVendor: '/Vendor/DeleteVendor',
  getPaymentTypes: '/Purchase/GetPaymentTypes',
  getPaymentStatus: '/Purchase/GetPaymentStatus',
  getBanks: '/BankAccount/GetBankAccounts',
  createBank: '/BankAccount/AddBankAccount',
  updateBank: '/BankAccount/EditBankAccount',
  deleteBank: '/BankAccount/DeleteBankAccount',
  getExpenseAccounts: '/ExpenseAccount/GetExpenseAccounts',
  createExpenseAccount: '/ExpenseAccount/AddExpenseBankAccount',
  updateExpenseAccount: '/ExpenseAccount/EditExpenseAccount',
  deleteExpenseAccount: '/ExpenseAccount/DeleteExpenseAccount',
  getCashPaymentVouchers: '/Voucher/GetCashPaymentVoucher',
  createCashPaymentVoucher: '/Voucher/AddCashPaymentVoucher',
  getBankPaymentVouchers: '/Voucher/GetBankPaymentVoucher',
  createBankPaymentVoucher: '/Voucher/AddBankPaymentVoucher',
  getCashReceivingVouchers: '/Voucher/GetCashReceivingVoucher',
  createCashReceivingVoucher: '/Voucher/AddCashReceivingVoucher',
  getBankReceivingVouchers: '/Voucher/GetBankReceivingVoucher',
  createBankReceivingVoucher: '/Voucher/AddBankReceivingVoucher',
  getJournalVouchers: '/Voucher/GetJournalVouchers',
  createJournalVoucher: '/Voucher/AddJournalVoucher',
  getServicePaymentVouchers: '/Voucher/GetServicePaymentVoucher',
  createServicePaymentVoucher: '/Voucher/AddServicePaymentVoucher',
  getReceiving: '/CustomerPayment/GetReceivings',
  verifyReceiving: '/CustomerPayment/VerifyReceiving',
  getCustomerStatements: '/CustomerPayment/GetCustomerStatement',
  //changes
  getStatementDues: '/CustomerPayment/GetCustomerStatement',
  getCashStatements: '/Reports/GetStatementByPaymentType',
  getExpenseStatment: '/Reports/GetAccountLedger',
  getVendorStatements: '/Vendor/GetVendorStatement',
  readAnnouncement: '/Announcement/ReadAnnouncement',
  deleteAnnouncement: '/Announcement/DeleteAnnouncement',
  deleteBooking: '/FacilityBooking/DeleteBooking',
  DeleteEvent: '/Event/DeleteEvent',
  deleteContact: '/EmergencyContact/DeleteContact',
  deleteCafeteria: '/Cafeteria/DeleteCafeteria',
  getServiceContracts: '/Purchase/GetServiceContract',
  getServiceContractDetail: '/Purchase/GetServiceContractDetail',
  getServiceContractPayable: '/Purchase/GetServiceContractPayables',
  createServiceContract: '/Purchase/AddServiceContract',
  updateServiceContract: '/Purchase/EditServiceContract',
  deleteServiceContract: '/Purchase/DeleteServiceContract',
  notification: '/Account/RegisterDevice4Notifications',
  logout: '/Account/Logout',
  forgetPwd: '/Account/ForgetPassword',
  forgetPwdOtp: '/Account/VerifyOTP',
  resetPwd: '/Account/ResetPassword',
  changePwd: '/Account/ChangePassword',
  getComplainById: '/Complain/GetComplain',
};