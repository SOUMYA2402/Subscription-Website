import TshirtImg from "./tshirt.svg";

function Product() {
  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_j0Ob3JTp9DoqKE", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Plan Purchase", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    
    <div className="subscription-plans">
  <div className="plan-card">
    <div className="plan-header basic-header">Basic</div>
    <p>For building personal projects</p>
    <p>₹1200 per month billed annually</p>
    <p>or ₹2000 billed monthly</p>
    <button onClick={paymentHandler}>Pay</button>
  </div>

  <div className="plan-card">
    <div className="plan-header standard-header">Standard</div>
    <p>For building small to medium projects</p>
    <p>₹2400 per month billed annually</p>
    <p>or ₹4000 billed monthly</p>
    <button onClick={paymentHandler}>Pay</button>
  </div>

  <div className="plan-card">
    <div className="plan-header premium-header">Premium</div>
    <p>For building large-scale applications</p>
    <p>₹3600 per month billed annually</p>
    <p>or ₹6000 billed monthly</p>
    <button onClick={paymentHandler}>Pay</button>
  </div>
</div>

  );
}

export default Product;