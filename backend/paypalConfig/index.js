import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "Afkpg9jfjKSBhuLsxpVdqtufO-_9-TthWdr7Ny1ffHOIjU-mQxF7GnL-IVqp1jnNfcO_xhN880u66bg8",
  client_secret:
    "EKR8cdYED2ffquhPgkg9uGTcWznAG2o-WVLYtUDqD3kOfChYOpMZ1LPd3tgf_6kpeu08PCvJfjyh0l_j",
});

export { paypal };
