import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyTabBar from './BottomItem';

import Complain from '../screens/Complain';
import Login from '../screens/Auth/Login';
import UserHome from '../screens/UserHome';
import Visitors from '../screens/Visitors';
import Announcement from '../screens/Announcement';
import MyUnits from '../screens/MyUnits';
import EBilling from '../screens/E-Billing';
import MyUnitsAddNew from '../screens/MyUnitsAddNew';
import Residents from '../screens/Resident';
import EFormsSubmit from '../screens/E-Forms';
import ResidentRegistration from '../screens/ResidentRegistrationForm';
import AddVisitors from '../screens/Addvisitor';
import AddWalkinVisitor from '../screens/AddWalkinvisitor';
import AddComplain from '../screens/AddnewComplain';
import ComplainSubmit from '../screens/ComplainSubmit';
import Events from '../screens/Events';
import FacilityBooking from '../screens/FacilityBooking';
import Discussions from '../screens/Discussion';
import EDocuments from '../screens/Documents';
import Selectcalendar from '../screens/Calendar';
import AddvisitorsORcode from '../screens/AddVisitorORCode';
import EnterAmount from '../screens/EntertheAmount';
import Codeverification from '../screens/CardVerification';
import PaymentSuccessful from '../screens/PaymentSuccessful';
import Tutorial from '../screens/Tutorial';
import EmergencyContacts from '../screens/Emergency Contacts';
import Notifications from '../screens/Notifications';
import BookingSuccessful from '../screens/FacilityBookingSuccessful';
import FeedBackPolling from '../screens/EPollingSubmit';
import ResidentAddSuccessful from '../screens/ResidentAddSuccessful';
import MarketSquare from '../screens/MarketSquare';
import AddCreditBebitCard from '../screens/AddCreditBebitCard';
import Cafeteria from '../screens/Cafeteria';
import ReceiptRecieved from '../screens/ReceiptRecieved';
import CommunityHall from '../screens/CommunityHall';
import UserProfile from '../screens/Profile';
import EPolling from '../screens/E-Polling';
import EventDetail from '../screens/EventDetail';
import AdminHome from '../screens/AdminHome';
import {Fragment} from 'react';
import Community from '../screens/Community';
import {useSelector} from 'react-redux';
import AdminFacilityBooking from '../screens/AdminFacilityBooking';
import FacilityBookingDetail from '../screens/AdminFacilityBooking/FacilityBookingDetail';
import CreateEvent from '../screens/Events/createEvent';
import AddOwner from '../screens/AddOwner';
import AddEmployee from '../screens/AddEmployee';
import AddContact from '../screens/Emergency Contacts/addContact';
import AddCafeteriaContact from '../screens/Cafeteria/addCafeteriaContact';
import CreateForm from '../screens/E-Forms/components/createForm';
import SubmitEForm from '../screens/E-Forms/components/submitEForm';
import FormList from '../screens/E-Forms/components/formList';
import Employee from '../screens/Employee';
import FormDetail from '../screens/E-Forms/components/FormDetail';
import UpdateEmployee from '../screens/UpdateEmployee';
import MyUnitDetail from '../screens/MyUnits/MyUnitDetail';
import MyUnitsUpdate from '../screens/MyUnitsUpdate';
import Accounts from '../screens/Accounts';
import Invoices from '../screens/Invoices';
import CreateInvoice from '../screens/Invoices/CreateInvoice';
import UpdateInvoice from '../screens/Invoices/UpdateInvoice';
import Expenses from '../screens/Expenses';
import CreateExpense from '../screens/Expenses/CreateExpense';
import UpdateExpense from '../screens/Expenses/UpdateExpense';
import Purchases from '../screens/Purchases';
import CreatePurchase from '../screens/Purchases/CreatePurchase';
import UpdatePurchase from '../screens/Purchases/UpdatePurchase';
import Vendors from '../screens/Vendors';
import CreateVendor from '../screens/Vendors/CreateVendor';
import UpdateVendor from '../screens/Vendors/UpdateVendor';
import Banks from '../screens/Banks';
import CreateBank from '../screens/Banks/CreateBank';
import UpdateBank from '../screens/Banks/UpdateBank';
import ExpenseAccount from '../screens/ExpenseAccount';
import CreateExpenseAccount from '../screens/ExpenseAccount/CreateExpenseAccount';
import UpdateExpenseAccount from '../screens/ExpenseAccount/UpdateExpenseAccount';
import Vouchers from '../screens/Vouchers';
import CashPaymentVoucher from '../screens/CashPaymentVoucher';
import CreateCashPaymentVoucher from '../screens/CashPaymentVoucher/CreateCashPaymentVoucher';
import BankPaymentVoucher from '../screens/BankPaymentVoucher';
import CreateBankPaymentVoucher from '../screens/BankPaymentVoucher/CreateBankPaymentVoucher';
import CashReceivingVoucher from '../screens/CashReceivingVoucher';
import CreateCashReceivingVoucher from '../screens/CashReceivingVoucher/CreateCashReceivingVoucher';
import BankReceivingVoucher from '../screens/BankReceivingVoucher';
import CreateBankReceivingVoucher from '../screens/BankReceivingVoucher/CreateBankPaymentVoucher';
import Receiving from '../screens/Receiving';
import ReceivingDetail from '../screens/Receiving/ReceivingDetail';
import ExpenseDetail from '../screens/Expenses/ExpenseDetail';
import ExpenseAccountDetail from '../screens/ExpenseAccount/ExpenseAccountDetail';
import InvoiceDetail from '../screens/Invoices/InvoiceDetail';
import BankDetail from '../screens/Banks/BankDetail';
import VendorDetail from '../screens/Vendors/VendorDetail';
import PurchaseDetail from '../screens/Purchases/PurchaseDetail';
import Reports from '../screens/Reports';
import CustomerStatements from '../screens/CustomerStatements';
import VendorStatements from '../screens/VendorStatements';
import JournalVoucher from '../screens/JournalVoucher';
import CreateJournalVoucher from '../screens/JournalVoucher/CreateJournalVoucher';
import UpdateOwner from '../screens/UpdateOwner';
import Amenities from '../screens/Amenities';
import CreateAmenity from '../screens/Amenities/CreateAmenity';
import UpdateAmenity from '../screens/Amenities/UpdateAmenity';
import AmenityDetail from '../screens/Amenities/AmenityDetail';
import AnnouncementDetail from '../screens/Announcement/AnnouncementDetail';
import ServicePaymentVoucher from '../screens/ServicePaymentVouchers';
import CreateServicePaymentVoucher from '../screens/ServicePaymentVouchers/CreateServicePaymentVoucher';
import ServiceContract from '../screens/ServiceContract';
import CreateServiceContract from '../screens/ServiceContract/CreateServiceContract';
import UpdateServiceContract from '../screens/ServiceContract/UpdateServiceContract';
import ServiceContractDetail from '../screens/ServiceContract/ServiceContractDetail';
import Owners from '../screens/owners';
import EmployeeList from '../screens/EmployeeList';
import GenerateSalary from '../screens/GenerateSalary';
import EmployeeLedger from '../screens/employeeLedger/index.js';
import EmployeeSalary from '../screens/employeeLedger/EmployeeSalary';
import UpdateCafeteria from '../screens/Cafeteria/updateCafeteria';
import ContactType from '../screens/Emergency Contacts/ContactType';
import EFormForAdmin from '../screens/E-Forms/components/EFormForAdmin';
import EditEvent from '../screens/EventDetail/EditEvent';
import filter from '../screens/Visitors/filter';
import EditEmergencyContact from '../screens/Emergency Contacts/EditEmergencyContact';
import EditEventAdmin from '../screens/Events/EditEvent';
import UpdateAnnouncement from '../screens/Announcement/updateAnnouncement.js';
import employeeDetails from '../screens/UpdateEmployee';
import UpdateEmployeeDetails from '../screens/UpdateEmployee/updateEmployeeDetails';
import EditCommunityEvent from '../screens/EventDetail/EditCommunityEvent';
import ComplainDetails from '../screens/Complain/ComplainDetails';
import NewPwd from '../screens/Auth/newPwd/index.js';
import Registrations from '../screens/Registrations/index.js';
import TenantRegistration from '../screens/tenantRegistration/index.js';
import CashStatement from '../screens/CashStatement';
import ExpenseStatement from '../screens/ExpenseStatement.js';
import BankStatement from '../screens/BankStatement';
import ResidentHistory from '../screens/residentHistory/index.js';
import TrialBalance from '../screens/TrialBalance.js';
import AmenityDetailScreen from '../screens/Amenities/AmenityDetailScreen.js';
import {color} from 'react-native-reanimated';
import {colors} from '../styles/colors.js';
import DrawerScreenWrapper from '../components/DrawerScreenWrapper.js';

const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  const role = useSelector(state => state.userDataReducer.userRole);
  // console.log('file: BottomTab.js:59 => HomeStackScreen => role:', role)
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={role === 'User' ? 'home' : 'AdminHome'}
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
        animation: 'none',
      }}>
      <Stack.Screen name="home" component={UserHome} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="visitors" component={Visitors} />
      <Stack.Screen name="announcement" component={Announcement} />
      <Stack.Screen name="complain" component={Complain} />
      <Stack.Screen name="myUnits" component={MyUnits} />
      <Stack.Screen name="eBilling" component={EBilling} />
      <Stack.Screen name="myUnitsAdd" component={MyUnitsAddNew} />
      <Stack.Screen name="myUnitsUpdate" component={MyUnitsUpdate} />
      <Stack.Screen name="resident" component={Residents} />
      <Stack.Screen name="myUnitDetail" component={MyUnitDetail} />
      <Stack.Screen name="eForms" component={EFormsSubmit} />

      <Stack.Screen name="NewPwd" component={NewPwd} />
      <Stack.Screen name="registration" component={Registrations} />
      <Stack.Screen
        name="residentRegistration"
        component={ResidentRegistration}
      />
      <Stack.Screen name="addVisitors" component={AddVisitors} />
      <Stack.Screen name="AddWalkinVisitor" component={AddWalkinVisitor} />
      <Stack.Screen name="events" component={Events} />
      <Stack.Screen
        name="facilityBooking"
        component={role === 'User' ? FacilityBooking : AdminFacilityBooking}
      />
      <Stack.Screen name="discussion" component={Discussions} />
      <Stack.Screen name="edocuments" component={EDocuments} />
      <Stack.Screen name="calender" component={Selectcalendar} />
      <Stack.Screen name="visitorQRcode" component={AddvisitorsORcode} />
      <Stack.Screen name="enterAmount" component={EnterAmount} />
      <Stack.Screen name="codeverification" component={Codeverification} />
      <Stack.Screen name="paymentSuccessful" component={PaymentSuccessful} />
      <Stack.Screen name="addComplain" component={AddComplain} />
      <Stack.Screen name="complainSubmit" component={ComplainSubmit} />
      <Stack.Screen name="tutorial" component={Tutorial} />
      <Stack.Screen name="emergency" component={EmergencyContacts} />
      <Stack.Screen name="notifications" component={Notifications} />
      {/* <Stack.Screen name="bookingSuccessfully" component={BookingSuccessful} /> */}
      <Stack.Screen name="feedBack" component={FeedBackPolling} />
      <Stack.Screen
        name="residentAddSuccessfully"
        component={ResidentAddSuccessful}
      />
      <Stack.Screen name="addCreditBebitCard" component={AddCreditBebitCard} />
      <Stack.Screen name="cafeteria" component={Cafeteria} />
      <Stack.Screen name="receiptrecieved" component={ReceiptRecieved} />
      <Stack.Screen name="communityHall" component={CommunityHall} />
      <Stack.Screen
        name="facilityBookingDetail"
        component={FacilityBookingDetail}
      />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="ePolling" component={EPolling} />
      <Stack.Screen name="eventDetail" component={EventDetail} />
      <Stack.Screen name="createEvent" component={CreateEvent} />
      <Stack.Screen name="addOwner" component={AddOwner} />
      <Stack.Screen name="updateOwner" component={UpdateOwner} />
      <Stack.Screen name="employeeList" component={Employee} />
      <Stack.Screen name="addEmployee" component={AddEmployee} />
      <Stack.Screen name="updateEmployee" component={UpdateEmployee} />
      <Stack.Screen name="addContact" component={AddContact} />
      <Stack.Screen
        name="addCafeteriaContact"
        component={AddCafeteriaContact}
      />
      <Stack.Screen name="createForm" component={CreateForm} />
      <Stack.Screen name="submitEForm" component={SubmitEForm} />
      <Stack.Screen name="formList" component={FormList} />
      <Stack.Screen name="formDetail" component={FormDetail} />
      <Stack.Screen name="accounts" component={Accounts} />
      <Stack.Screen name="invoices" component={Invoices} />
      <Stack.Screen name="createInvoice" component={CreateInvoice} />
      <Stack.Screen name="updateInvoice" component={UpdateInvoice} />
      <Stack.Screen name="invoiceDetail" component={InvoiceDetail} />
      <Stack.Screen name="expenses" component={Expenses} />
      <Stack.Screen name="createExpense" component={CreateExpense} />
      <Stack.Screen name="updateExpense" component={UpdateExpense} />
      <Stack.Screen name="expenseDetail" component={ExpenseDetail} />
      <Stack.Screen name="purchases" component={Purchases} />
      <Stack.Screen name="createPurchase" component={CreatePurchase} />
      <Stack.Screen name="updatePurchase" component={UpdatePurchase} />
      <Stack.Screen name="purchaseDetail" component={PurchaseDetail} />
      <Stack.Screen name="vendors" component={Vendors} />
      <Stack.Screen name="createVendor" component={CreateVendor} />
      <Stack.Screen name="updateVendor" component={UpdateVendor} />
      <Stack.Screen name="vendorDetail" component={VendorDetail} />
      <Stack.Screen name="banks" component={Banks} />
      <Stack.Screen name="createBank" component={CreateBank} />
      <Stack.Screen name="updateBank" component={UpdateBank} />
      <Stack.Screen name="bankDetail" component={BankDetail} />
      <Stack.Screen name="expenseAccounts" component={ExpenseAccount} />
      <Stack.Screen name="tenantRegistration" component={TenantRegistration} />
      <Stack.Screen
        name="createExpenseAccount"
        component={CreateExpenseAccount}
      />
      <Stack.Screen
        name="updateExpenseAccount"
        component={UpdateExpenseAccount}
      />
      <Stack.Screen
        name="expenseAccountDetail"
        component={ExpenseAccountDetail}
      />
      <Stack.Screen name="vouchers" component={Vouchers} />
      <Stack.Screen name="cashPaymentVouchers" component={CashPaymentVoucher} />
      <Stack.Screen
        name="createCashPaymentVoucher"
        component={CreateCashPaymentVoucher}
      />
      <Stack.Screen name="bankPaymentVouchers" component={BankPaymentVoucher} />
      <Stack.Screen
        name="createBankPaymentVoucher"
        component={CreateBankPaymentVoucher}
      />
      <Stack.Screen
        name="cashReceivingVouchers"
        component={CashReceivingVoucher}
      />
      <Stack.Screen
        name="createCashReceivingVoucher"
        component={CreateCashReceivingVoucher}
      />
      <Stack.Screen
        name="bankReceivingVouchers"
        component={BankReceivingVoucher}
      />
      <Stack.Screen
        name="createBankReceivingVoucher"
        component={CreateBankReceivingVoucher}
      />
      <Stack.Screen name="journalVouchers" component={JournalVoucher} />
      <Stack.Screen
        name="createJournalVoucher"
        component={CreateJournalVoucher}
      />
      <Stack.Screen
        name="servicePaymentVouchers"
        component={ServicePaymentVoucher}
      />
      <Stack.Screen
        name="createServicePaymentVoucher"
        component={CreateServicePaymentVoucher}
      />
      <Stack.Screen name="receiving" component={Receiving} />
      <Stack.Screen name="receivingDetail" component={ReceivingDetail} />
      <Stack.Screen name="reports" component={Reports} />
      <Stack.Screen name="customerStatements" component={CustomerStatements} />
      <Stack.Screen name="vendorStatements" component={VendorStatements} />
      <Stack.Screen name="community" component={Community} />
      <Stack.Screen name="amenities" component={Amenities} />
      <Stack.Screen name="createAmenity" component={CreateAmenity} />
      <Stack.Screen name="updateAmenity" component={UpdateAmenity} />
      <Stack.Screen name="amenityDetail" component={AmenityDetail} />
      <Stack.Screen
        name="amenityDetailScreen"
        component={AmenityDetailScreen}
      />
      <Stack.Screen name="announcementDetail" component={AnnouncementDetail} />
      <Stack.Screen name="serviceContracts" component={ServiceContract} />
      <Stack.Screen name="cashStatements" component={CashStatement} />
      <Stack.Screen name="expenseStatement" component={ExpenseStatement} />
      <Stack.Screen name="bankStatements" component={BankStatement} />
      <Stack.Screen name="TrialBalance" component={TrialBalance} />
      <Stack.Screen
        name="createServiceContract"
        component={CreateServiceContract}
      />
      <Stack.Screen
        name="updateServiceContract"
        component={UpdateServiceContract}
      />
      <Stack.Screen
        name="serviceContractDetail"
        component={ServiceContractDetail}
      />
      <Stack.Screen name="employee" component={EmployeeList} />
      <Stack.Screen name="generateSalary" component={GenerateSalary} />
      <Stack.Screen name="employeeLedger" component={EmployeeLedger} />
      <Stack.Screen name="EmployeeSalary" component={EmployeeSalary} />
      <Stack.Screen name="updateCafeteria" component={UpdateCafeteria} />
      <Stack.Screen name="ContactType" component={ContactType} />
      <Stack.Screen name="EFormForAdmin" component={EFormForAdmin} />
      <Stack.Screen name="EditEvent" component={EditEvent} />
      <Stack.Screen name="Filter" component={filter} />
      <Stack.Screen
        name="EditEmergencyContact"
        component={EditEmergencyContact}
      />
      <Stack.Screen name="EditEventAdmin" component={EditEventAdmin} />
      <Stack.Screen name="updateAnnouncement" component={UpdateAnnouncement} />
      <Stack.Screen
        name="UpdateEmployeeDetails"
        component={UpdateEmployeeDetails}
      />
      <Stack.Screen name="EditCommunityEvent" component={EditCommunityEvent} />
      <Stack.Screen name="ComplainDetails" component={ComplainDetails} />

      <Stack.Screen name="owners" component={Owners} />
      <Stack.Screen name="ResidentHistory" component={ResidentHistory} />
    </Stack.Navigator>
  );
};

export function BottomTab() {
  const role = useSelector(state => state.userDataReducer.userRole);

  return (
    <DrawerScreenWrapper>
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName={'userHome'}
      screenOptions={{
        headerShown: false,
        headerBackButtonMenuEnabled: true,
        animation: 'none',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="userHome" component={HomeStackScreen} />
      {/* {role === 'User' ? (
        <Fragment>
          <Tab.Screen name="marketSquare" component={MarketSquare} />
        </Fragment>
      ) : (
        <Fragment>
        </Fragment>
        )} */}
      <Tab.Screen name="community" component={Community} />
      <Tab.Screen name="discussion" component={Discussions} />
      <Tab.Screen name="profile" component={UserProfile} />
    </Tab.Navigator>
    </DrawerScreenWrapper>
  );
}
