import { ajax } from "./ajax";

const BASE = "";
const BASEADMIN = "/admin";
const BASEAPI = BASE + "/api";
export const reqLoginAdmin = (username, password) =>
  ajax(BASEAPI + "/loginadmin", { username, password }, "POST");
export const reqLoginCust = (username, password) =>
  ajax(BASEAPI + "/logincust", { username, password }, "POST");
export const reqRegisterUser = (user) =>
  ajax(BASEAPI + "/reguser", user, "POST");
export const reqRegisterCust = (customer) =>
  ajax(BASEAPI + "/regcust", customer, "POST");

const CATE = BASEADMIN + "/cate";
export const reqCateList = () => ajax(CATE);
export const reqAddCate = (nombre) => ajax(CATE, { nombre }, "POST");
export const reqUpdateCate = (cate) => ajax(CATE, cate, "PUT");

const BASEUSER = BASEADMIN + "/user";
export const reqUserList = (id_rol) => ajax(BASEUSER, { id_rol });
export const reqDisableUser = (id_user, habilitado) =>
  ajax(BASEUSER + "/disable", { id_user, habilitado }, "PUT");
export const reqChangePwd = (user) => ajax(BASEUSER + "/pwd", user, "PUT");

const BASEROLE = BASEADMIN + "/role";
export const reqRoleList = () => ajax(BASEROLE);
export const reqAddRole = (nombre) =>
  ajax(BASEROLE + "/addRole", nombre, "POST");
export const reqUpdatePermissions = (id, permisos) =>
  ajax(BASEROLE + "/updateRole", { id, permisos }, "PUT");

const BASECUSTOMER = BASEADMIN + "/customer";
export const reqCustomerList = () => ajax(BASECUSTOMER);
export const reqSearchCustomer = (str) =>
  ajax(BASECUSTOMER + "/search", { str });

const BASEPRODUCT = BASEADMIN + "/book";
export const reqBookList = () => ajax(BASEPRODUCT);
export const reqAddBook = (book) => ajax(BASEPRODUCT, book, "POST");
export const reqUpdateBook = (book) => ajax(BASEPRODUCT, book, "PUT");
export const reqSearchBooks = (str) => ajax(BASEPRODUCT + "/search", { str });

const BASEORDER = BASEADMIN + "/order";
export const reqOrderList = () => ajax(BASEORDER);
export const reqChangeEnvio = (value) =>
  ajax(BASEORDER + "/shipping", value, "PUT");
export const reqChangePago = (value) =>
  ajax(BASEORDER + "/payment", value, "PUT");
export const reqSearchOrders = (str) => ajax(BASEORDER + "/search", { str });

const BASEREPORT = BASEADMIN + "/report";
export const reqSales = (start, end) => ajax(BASEREPORT, { start, end });
export const reqSalesGraph = (intervalo, unidad) =>
  ajax(BASEREPORT + "/sales", { intervalo, unidad });
export const reqBooksGraph = (intervalo) =>
  ajax(BASEREPORT + "/books", { intervalo });
export const reqAll = () => ajax(BASEREPORT + "/all");
