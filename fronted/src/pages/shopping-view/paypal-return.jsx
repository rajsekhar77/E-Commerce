import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/features/shop/order/order-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ payerId, paymentId, orderId })).then((data) => {
        if(data?.payload?.success) {
          sessionStorage.removeItem('currentOrderId');
          window.location.href = '/shop/payment-success'
        }
      })
    }
  }, [paymentId, payerId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment....Please Wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
