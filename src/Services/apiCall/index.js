import { Apis } from '../Endpoints/UserEndpoints';
import { get, post, patch, deleted, documentPost } from '../Methods';

export const apiCall = {
  login: async obj => {
    let result = await post(Apis.login, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  forgetPwd: async obj => {
    let result = await post(Apis.forgetPwd, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  forgetPwdOtp: async obj => {
    let result = await post(Apis.forgetPwdOtp, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  resetPwd: async obj => {
    let result = await post(Apis.resetPwd, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  changePwd: async obj => {
    let result = await post(Apis.changePwd, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  register: async obj => {
    let result = await post(Apis.register, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getTrialData: async (society_id, fromDate, toDate) => {
    let result = await get('/Account/GetTrailBalance?society_id=' + society_id + `&from_date=${fromDate}to_date=${toDate}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAccountDetails: async id => {
    let result = await get(Apis.accountDetails + `/?AccountID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getVisitor: async (id, bool) => {
    let result = await get(Apis.visitor + `/?AccountID=${id}&Upcoming=${bool}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAllVisitor: async (bool, search, startTime, endTime) => {
    console.log(bool, search, '>>>>>>', startTime, endTime);
    let result = await get(
      Apis.getAllVisitors +
      `/?Upcoming=${bool}&Search=${search}&FromDate=${startTime}&ToDate=${endTime}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getInvitesVisitor: async () => {
    let result = await get(Apis.visitorInvites);
    if (result.status === 200) return result.data;
    else throw result;
  },

  getWalkingdata: async id => {
    let result = await get(Apis.getWalkingVisitor + `/?AccountID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAllWalkingdata: async id => {
    let result = await get(Apis.getWalkingVisitor);
    if (result.status === 200) return result.data;
    else throw result;
  },

  getAllResidentRegistrationRequest: async Status => {
    let result = await get(`${Apis.getAllResidentRegistrationRequest}?Status=${Status}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAllTenantRegistration: async (Status, ApartmentID) => {
    let result = await get(`${Apis.getAllTenantRegistration}?Status=${Status}&` + `ApartmentID=${ApartmentID}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getPurposeList: async () => {
    let result = await get(Apis.purposeList);
    if (result.status === 200) return result.data;
    else throw result;
  },
  postSingleForm: async obj => {
    let result = await post(Apis.submitPurposeForm, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },

  postWalkinVisitor: async obj => {
    let result = await post(Apis.addWalkinVisitor, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },

  postMultipleForm: async obj => {
    let result = await post(Apis.AddGroupInvite, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  changeStatusVisitor: async (id, status) => {
    let result = await post(
      Apis.statusVisitor + `VisitID=${id}&Status=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },

  changeWalkinStatus: async (id, status) => {
    let result = await patch(
      Apis.walkInStatus + `VisitID=${id}&Status=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  residentApproveRegistrationStatus: async (id, status) => {
    let result = await patch(
      Apis.residentRegistrationStatus + `RegistrationID=${id}&Status=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  residentRejectRegistrationStatus: async (id, status, reason) => {
    let result = await patch(
      Apis.residentRegistrationStatus + `RegistrationID=${id}&Status=${status}&Reason=${reason}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  tenantRejectRegistrationStatus: async (id, status, reason) => {
    let result = await patch(
      Apis.tenantRegistrationStatus + `RegistrationID=${id}&Status=${status}&Reason=${reason}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  tenantApproveRegistrationStatus: async (id, status) => {
    let result = await patch(
      Apis.tenantRegistrationStatus + `RegistrationID=${id}&Status=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  DeletePoll: async id => {
    console.log(id);
    let result = await deleted(Apis.DeletePoll + `?PollID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteVisitor: async id => {
    let result = await deleted(Apis.delVisitor + id);
    if (result.status === 200) return result.data;
    else throw result;
  },
  editVisitor: async obj => {
    let result = await patch(Apis.editVisitor, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getMyComplains: async (
    SocietyID,
    IsPagination,
    pageSize,
    pageNumber,
    search,
  ) => {
    let result = await get(
      Apis.getMyComplains +
      `/?SocietyID=${SocietyID}&IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}&Search=${search}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAllComplains: async (
    SocietyID,
    IsPagination,
    pageSize,
    pageNumber,
    search,
  ) => {
    let result = await get(
      Apis.getAllComplains +
      `/?SocietyID=${SocietyID}&IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}&Search=${search}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  addComplains: async obj => {
    let result = await post(Apis.addComplains, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addComplainsPicture: async obj => {
    let result = await documentPost(Apis.uploadAttachmentComplain, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getLocations: async () => {
    let result = await get(Apis.getLocations);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAnnouncement: async (id, text) => {
    let result = await get(Apis.getAnnouncement + `${id}&Search=${text}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getDocument: async () => {
    let result = await get(Apis.getDocument);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getPolling: async search => {
    let result = await get(
      Apis.getPolling + `/?Search=${search ? search : ''}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAdminPolling: async search => {
    let result = await get(
      Apis.getAdminPolling + `/?Search=${search ? search : ''}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  addPolling: async obj => {
    let result = await post(Apis.addPolling, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getEvents: async () => {
    let result = await get(Apis.getEvents);
    if (result.status === 200) return result.data;
    else throw result;
  },
  allotMachineId: async obj => {
    let result = await post(Apis.allotMachineId, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getFacilityBookingByUser: async (
    search,
    IsPagination,
    pageSize,
    pageNumber,
  ) => {
    let result = await get(
      Apis.getFacilityBookingByUser +
      `/?Search=${search}&IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  changeEventStatus: async (id, status) => {
    let result = await post(
      Apis.changeEventStatus + `?EventID=${id}&Status=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAmenities: async SocietyID => {
    let result = await get(Apis.getAmenities + `?SocietyID=${SocietyID}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createAmenity: async obj => {
    let result = await post(Apis.createAmenity, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateAmenity: async obj => {
    let result = await patch(Apis.updateAmenity, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  ReadAnnouncement: async obj => {
    let result = await patch(Apis.ReadAnnouncement, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteAmenity: async amenityId => {
    let result = await deleted(Apis.deleteAmenity + `?AmenityID=${amenityId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },

  DeleteEForm: async Id => {
    let result = await deleted(Apis.DeleteEForm + `?FormID=${Id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },

  DeleteAdmin: async Id => {
    let result = await deleted(Apis.DeleteAdmin + `?AdminID=${Id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteDocument: async documentId => {
    let result = await deleted(
      Apis.deleteDocument + `?DocumentID=${documentId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  DeleteContactType: async Id => {
    let result = await deleted(Apis.DeleteContactType + `?ContactTypeID=${Id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addBooking: async obj => {
    let result = await post(Apis.addBooking, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  GetAllAdmins: async search => {
    let result = await get(Apis.GetAllAdmins + `/?Search=${search}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getFacilityBooking: async (search, IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.getFacilityBooking +
      `/?Search=${search}&IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  changeBookingStatus: async (id, status, remarks) => {
    console.log(id, status, remarks);
    let result = await patch(
      Apis.changeBookingStatus +
      `/?BookingID=${id}&Status=${status}&Remarks=${remarks}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  EditBooking: async obj => {
    let result = await patch(Apis.EditBooking, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addDocument: async obj => {
    let result = await post(Apis.addDoc, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addAnnoucement: async obj => {
    let result = await post(Apis.addAnnouncement, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  changeComplainStatus: async (id, status, image) => {
    let result = await patch(
      Apis.changeComplainStatus +
      `ComplaintID=${id}&Status=${status}&Image=${image}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  ReadNotification: async status => {
    let result = await patch(
      Apis.ReadNotification + `?NotificationID=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  approvedBookingStatus: async (id, status, remarks) => {
    let result = await patch(
      Apis.changeBookingStatus +
      `?BookingID=${id}=&Status=${status}&Remarks=${remarks}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  ReadNotification: async status => {
    let result = await patch(
      Apis.ReadNotification + `?NotificationID=${status}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  ViewNotification: async status => {
    let result = await patch(Apis.ViewNotification);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addDocPicture: async obj => {
    let result = await documentPost(Apis.addDocPict, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadRegistrationDoc: async obj => {
    let result = await documentPost(Apis.uploadRegistrationDoc, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadTenantDoc: async obj => {
    let result = await documentPost(Apis.uploadTenantDoc, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getVenue: async () => {
    let result = await get(Apis.getVenue);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createEvent: async obj => {
    let result = await post(Apis.createEvent, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  EditEvent: async obj => {
    let result = await patch(Apis.EditEvent, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  CancelBookingRequest: async obj => {
    let result = await patch(Apis.CancelBookingRequest + `/?BookingID=${obj}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadEventImage: async obj => {
    let result = await documentPost(Apis.uploadEventImage, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  verifyOtp: async code => {
    let result = await post(Apis.verifyOtp + `/?code=${code}`, {});
    if (result.status === 200) return result.data;
    else throw result;
  },
  getBuildings: async (societyId, IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.getBuildings +
      `/?SocietyID=${societyId}&IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },



  getAppartmentHistory: async (id) => {
    let result = await get(
      Apis.getAppartmentHistory +
      `?id=${id}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },


  getOwners: async isPaid => {
    let result = await get(Apis.getOwners + `?IsPaid=${isPaid}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getOwnerDetail: async apartmentId => {
    let result = await get(
      Apis.getOwnerDetail + `/?ApartmentID=${apartmentId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  createOwner: async obj => {
    let result = await post(Apis.createOwner, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  residentregistrationRequest: async obj => {
    let result = await post(Apis.residentregistrationRequest, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  tenantRegistrationRequest: async obj => {
    let result = await post(Apis.tenantRegistrationRequest, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateOwner: async obj => {
    let result = await patch(Apis.updateOwner, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  resentOtp: async obj => {
    let result = await post(Apis.resentOtp, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  unitMemberResentOtp: async obj => {
    let result = await post(Apis?.unitMemberResentOtp, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },

  employeeResentOtp: async obj => {
    let result = await post(Apis?.employeeResentOtp, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  tenentResentOtp: async obj => {
    let result = await post(Apis?.tenentResentOtp, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteOwner: async ownerId => {
    let result = await deleted(Apis.deleteOwner + `?OwnerID=${ownerId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  SubmitVote: async code => {
    let result = await post(Apis.SubmitVote + `${code}`, {});
    if (result.status === 200) return result.data;
    else throw result;
  },
  getContacts: async () => {
    let result = await get(Apis.getContacts);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getContactTypes: async () => {
    let result = await get(Apis.getContactTypes);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addEmergencyContact: async obj => {
    let result = await post(Apis.addEmergencyContact, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  editContact: async obj => {
    let result = await patch(Apis.editContact, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  AddContactType: async obj => {
    let result = await post(Apis.AddContactType, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getCafeteriaContacts: async () => {
    let result = await get(Apis.getCafeteriaContacts);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addCafeteriaContact: async obj => {
    let result = await post(Apis.addCafeteriaContact, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  editCafeteria: async obj => {
    let result = await patch(Apis.EditCafeteria, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadCafeteriaImage: async obj => {
    let result = await documentPost(Apis.uploadCafeteriaImage, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadAmenityImage: async obj => {
    let result = await documentPost(Apis.uploadAmenityImage, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  uploadReceipt: async obj => {
    let result = await documentPost(Apis.uploadReceipt, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getBookingsDate: async () => {
    let result = await get(Apis.getBookingsDate);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getServices: async role => {
    let result = await get(Apis.getServices + `?role=${role}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createEmployee: async obj => {
    let result = await post(Apis.createEmployee, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateEmployee: async obj => {
    let result = await patch(Apis.updateEmployee, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getEForm: async () => {
    let result = await get(Apis.getEForm);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createEForm: async obj => {
    let result = await post(Apis.createEForm, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  submitEForm: async obj => {
    let result = await post(Apis.submitEForm, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getSubmittedEForm: async search => {
    let result = await get(Apis.getSubmittedEForm + `/?Search=${search}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAllEmployee: async search => {
    let result = await get(Apis.GetAllAdmins + `/?Search=${search}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  GetNotifications: async (IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.GetNotifications +
      `?IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  GetNotificationsBadge: async (IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.GetNotifications +
      `?IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result;
    else throw result;
  },
  GetPayRoll: async (getID, From, To) => {
    let result = await get(
      Apis.GetPayRoll + `?UserID=${getID}&From=${From}&To=${To}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getMyUnits: async (apartmentID, accountID) => {
    let result = await get(
      Apis.getMyUnits + `?ApartmentID=${apartmentID}&AccountID=${accountID}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getRentalUnits: async (apartmentID, accountID) => {
    let result = await get(
      Apis.getRentalUnits + `?ApartmentID=${apartmentID}&AccountID=${accountID}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getUnitTypes: async (isRental) => {
    let result = await get(Apis.getUnitTypes + `?isRental=${isRental}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addResident: async obj => {
    let result = await post(Apis.addResident, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  addRentalResident: async obj => {
    let result = await post(Apis.addRentalResident, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getUnitDetail: async (id, isRental) => {
    let result = await get(Apis.getUnitDetail + `UnitId=${id}&` + `isRental=${isRental}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getRentalUnitDetail: async (id, isRental) => {
    let result = await get(Apis.getRentalUnitDetail + `UnitId=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getRentalDetail: async id => {
    let result = await get(Apis.getRentalDetail + `RentalOwnerID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getApartmentOwner: async apartmentid => {
    let result = await get(
      Apis.getApartmentOwner + `?ApartmentID=${apartmentid}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateResident: async obj => {
    let result = await patch(Apis.updateResident, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateRentalResident: async obj => {
    let result = await patch(Apis.updateRentalResident, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteResident: async (deletedId, isRental) => {
    let result = await deleted(Apis.deleteResident + `?UnitID=${deletedId}&` + `isRental=${isRental}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteRentalResident: async (deletedId, isRental) => {
    let result = await deleted(Apis.deleteRentalResident + `?UnitID=${deletedId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getRecentPayment: async (IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.getRecentPayment +
      `/?IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getStatements: async (IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.getStatements +
      `/?IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  addReceiving: async obj => {
    let result = await post(Apis.addReceiving, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAccountsDetail: async () => {
    let result = await get(Apis.getAccountsDetail);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getSoldApartment: async () => {
    let result = await get(Apis.getSoldApartment);
    if (result.status === 200) return result.data;
    else throw result;
  },
  GetSoldApartmentsByBuildings: async () => {
    let result = await get(Apis.GetSoldApartmentsByBuildings);
    if (result.status === 200) return result.data;
    else throw result;
  },

  getAvailableAppartment: async SocietyID => {
    let result = await get(
      Apis.getAvailableAppartment + `?SocietyID=${SocietyID}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getAvailableAppartmentForTenant: async SocietyID => {
    let result = await get(
      Apis.getAvailableAppartmentForTenant + `?SocietyID=${SocietyID}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getSocieties: async projectName => {
    let result = await get(Apis.getSociety + `?projectName=${projectName}`);
    if (result.status === 200) return result.data;
    else throw result;
  },

  getExpenses: async () => {
    let result = await get(Apis.getExpenses);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getExpenseByAccountId: async id => {
    let result = await get(
      Apis.getExpenseByAccountId + `?ExpenseAccountID=${id}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  createExpense: async obj => {
    let result = await post(Apis.createExpense, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateExpense: async obj => {
    let result = await patch(Apis.updateExpense, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteExpense: async expenseId => {
    let result = await deleted(Apis.deleteExpense + `?ExpenseID=${expenseId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getInvoices: async (role, isPaid) => {
    let result = await get(Apis.getInvoices + `?role=${role}&IsPaid=${isPaid}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createInvoice: async obj => {
    let result = await post(Apis.createInvoice, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateInvoice: async obj => {
    let result = await patch(Apis.updateInvoice, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteInvoice: async invoiceId => {
    let result = await deleted(Apis.deleteInvoice + `?InvoiceID=${invoiceId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getPurchases: async (vendorId, status) => {
    let result = await get(
      Apis.getPurchases +
      `?Status=${status}${vendorId ? '&VendorID=' + vendorId : ''}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  createPurchase: async obj => {
    let result = await post(Apis.createPurchase, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  AddPayRoll: async obj => {
    let result = await post(Apis.AddPayRoll, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updatePurchase: async obj => {
    let result = await patch(Apis.updatePurchase, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deletePurchase: async purchaseId => {
    let result = await deleted(
      Apis.deletePurchase + `?purchaseID=${purchaseId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getVendors: async () => {
    let result = await get(Apis.getVendors);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createVendor: async obj => {
    let result = await post(Apis.createVendor, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateVendor: async obj => {
    let result = await patch(Apis.updateVendor, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteVendor: async vendorId => {
    let result = await deleted(Apis.deleteVendor + `?VendorID=${vendorId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getPaymentTypes: async () => {
    let result = await get(Apis.getPaymentTypes);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getPaymentStatus: async () => {
    let result = await get(Apis.getPaymentStatus);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getBanks: async () => {
    let result = await get(Apis.getBanks);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createBank: async obj => {
    let result = await post(Apis.createBank, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateBank: async obj => {
    let result = await patch(Apis.updateBank, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteBank: async bankId => {
    let result = await deleted(Apis.deleteBank + `?BankID=${bankId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getExpenseAccounts: async () => {
    let result = await get(Apis.getExpenseAccounts);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createExpenseAccount: async obj => {
    let result = await post(Apis.createExpenseAccount, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateExpenseAccount: async obj => {
    let result = await patch(Apis.updateExpenseAccount, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteExpenseAccount: async expenseAccountId => {
    let result = await deleted(
      Apis.deleteExpenseAccount + `?ExpenseAccountID=${expenseAccountId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getCashPaymentVouchers: async () => {
    let result = await get(Apis.getCashPaymentVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createCashPaymentVoucher: async obj => {
    let result = await post(Apis.createCashPaymentVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getBankPaymentVouchers: async () => {
    let result = await get(Apis.getBankPaymentVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createBankPaymentVoucher: async obj => {
    let result = await post(Apis.createBankPaymentVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getCashReceivingVouchers: async () => {
    let result = await get(Apis.getCashReceivingVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createCashReceivingVoucher: async obj => {
    let result = await post(Apis.createCashReceivingVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getBankReceivingVouchers: async () => {
    let result = await get(Apis.getBankReceivingVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createBankReceivingVoucher: async obj => {
    let result = await post(Apis.createBankReceivingVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getJournalVouchers: async () => {
    let result = await get(Apis.getJournalVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createJournalVoucher: async obj => {
    let result = await post(Apis.createJournalVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getServicePaymentVouchers: async () => {
    let result = await get(Apis.getServicePaymentVouchers);
    if (result.status === 200) return result.data;
    else throw result;
  },
  createServicePaymentVoucher: async obj => {
    let result = await post(Apis.createServicePaymentVoucher, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getReceiving: async role => {
    let result = await get(Apis.getReceiving + `?role=${role}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  verifyReceiving: async receivingId => {
    let result = await patch(
      Apis.verifyReceiving + `?ReceivingID=${receivingId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getCustomerStatements: async accountId => {
    let result = await get(
      Apis.getCustomerStatements + `?AccountID=${accountId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },

  getStatements: async paymentType => {
    let result = await get(
      Apis.getCashStatements + `?PaymentTypeID=${paymentType}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getExpenseStatment: async paymentType => {
    let result = await get(
      Apis.getExpenseStatment + `?CategoryID=${paymentType}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  //changes
  getStatementsDues: async (IsPagination, pageSize, pageNumber) => {
    let result = await get(
      Apis.getStatements +
      `/?IsPagination=${IsPagination}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getVendorStatements: async (vendorId, fromDate, toDate) => {
    let result = await get(Apis.getVendorStatements + `?VendorID=${vendorId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getComplainById: async complainId => {
    let result = await get(Apis.getComplainById + `/?ComplainID=${complainId}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  readAnnouncement: async announcementId => {
    let result = await patch(
      Apis.readAnnouncement + `?AnnouncementID=${announcementId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteAnnouncement: async announcementId => {
    let result = await deleted(
      Apis.deleteAnnouncement + `?AnnouncementID=${announcementId}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteBooking: async eventID => {
    let result = await deleted(Apis.deleteBooking + `?BookingID=${eventID}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  DeleteEvent: async eventID => {
    console.log('>>>>>>>>', eventID);
    let result = await deleted(Apis.DeleteEvent + `?EventID=${eventID}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteContact: async id => {
    let result = await deleted(Apis.deleteContact + `?ContactID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteCafeteria: async id => {
    let result = await deleted(Apis.deleteCafeteria + `?CafeteriaID=${id}`);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getServiceContracts: async () => {
    let result = await get(Apis.getServiceContracts);
    if (result.status === 200) return result.data;
    else throw result;
  },
  getServiceContractDetail: async id => {
    let result = await get(
      Apis.getServiceContractDetail + `?ServiceContractID=${id}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  getServiceContractPayable: async id => {
    let result = await get(
      Apis.getServiceContractPayable + `?ServiceContractID=${id}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  createServiceContract: async obj => {
    let result = await post(Apis.createServiceContract, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  updateServiceContracts: async obj => {
    let result = await patch(Apis.updateServiceContracts, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  deleteServiceContracts: async id => {
    let result = await deleted(
      Apis.deleteServiceContracts + `?serviceContractID=${id}`,
    );
    if (result.status === 200) return result.data;
    else throw result;
  },
  notification: async obj => {
    let result = await post(Apis.notification, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
  logout: async obj => {
    let result = await post(Apis.logout, obj);
    if (result.status === 200) return result.data;
    else throw result;
  },
};
