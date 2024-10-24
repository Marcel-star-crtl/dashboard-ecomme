// import React, { useEffect, useState } from "react";
// import { Table, Select, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { getOrders, updateOrderStatus, confirmDelivery } from "../features/auth/authSlice";
// import CountdownTimer from "../components/CountdownTimer";

// const { Option } = Select;

// const Orders = () => {
//   const dispatch = useDispatch();
//   const orderState = useSelector((state) => state.auth.orders);
//   const [confirmationStep, setConfirmationStep] = useState('initial');
//   const [confirmationCode, setConfirmationCode] = useState('');
//   const [activeOrderId, setActiveOrderId] = useState(null);

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);

//   const handleStatusChange = (orderId, newStatus) => {
//     console.log(`Changing status for order ${orderId} to ${newStatus}`);
//     dispatch(updateOrderStatus({ orderId, status: newStatus })).then((result) => {
//       if (result.type === 'order/update-status/fulfilled') {
//         console.log('Update successful:', result.payload);
//       } else {
//         console.log('Update failed:', result.payload);
//       }
//     });
//   };

//   const submitConfirmation = () => {
//     dispatch(confirmDelivery({ orderId: activeOrderId, confirmationCode })).then((result) => {
//       if (result.type === 'auth/confirmDelivery/fulfilled') {
//         console.log('Delivery confirmation successful:', result.payload);
//         setConfirmationStep('initial');
//         setConfirmationCode('');
//         setActiveOrderId(null);
//       } else {
//         console.log('Delivery confirmation failed:', result.payload);
//       }
//     });
//   };

//   const initiateConfirmation = (orderId) => {
//     setConfirmationStep('codeEntry');
//     setActiveOrderId(orderId);
//   };

//   const handleConfirmDelivery = (orderId) => {
//     dispatch(confirmDelivery({ orderId }));
//   };

//   const columns = [
//     {
//       title: "SNo",
//       dataIndex: "key",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Product",
//       dataIndex: "product",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (text, record) => (
//         <div>
//           <Select
//             defaultValue={text}
//             style={{ width: 120 }}
//             onChange={(value) => handleStatusChange(record._id, value)}
//           >
//             <Option value="Not Processed">Not Processed</Option>
//             <Option value="Processing">Processing</Option>
//             <Option value="Dispatched">Dispatched</Option>
//             <Option value="Cancelled">Cancelled</Option>
//             <Option value="Delivered">Delivered</Option>
//           </Select>
//           {text === "Dispatched" && (
//             <div>
//               <p>Delivery Countdown:</p>
//               {console.log("Order data for CountdownTimer:", record)}
//               <CountdownTimer dispatchTime={record.dispatchTime} />
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       title: "Delivered",
//       dataIndex: "deliveryConfirmed",
//       render: (text, record) => (
//         <div>
//           {record.deliveryConfirmed ? (
//             <span>Confirmed</span>
//           ) : record.orderStatus === "Dispatched" ? (
//             <div>
//               <Button onClick={() => initiateConfirmation(record._id)}>
//                 Confirm Delivery
//               </Button>
//               {confirmationStep === 'codeEntry' && activeOrderId === record._id && (
//                 <div>
//                   <input 
//                     type="text" 
//                     value={confirmationCode}
//                     onChange={(e) => setConfirmationCode(e.target.value)}
//                     placeholder="Enter confirmation code"
//                   />
//                   <Button onClick={submitConfirmation}>
//                     Submit
//                   </Button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <span>Not Yet</span>
//           )}
//         </div>
//       )
//     },
//   ];

//   // const data = orderState.map((order, index) => {
//   //   console.log("Mapping order:", order); 
//   //   return {
//   //     key: index + 1,
//   //     _id: order._id,
//   //     name: order.orderby.firstname,
//   //     product: (
//   //       <Link to={`/admin/order/${order.orderby._id}`}>
//   //         View Orders
//   //       </Link>
//   //     ),
//   //     amount: order.paymentIntent.amount,
//   //     date: new Date(order.createdAt).toLocaleString(),
//   //     status: order.orderStatus,
//   //     dispatchTime: order.dispatchedAt, 
//   //     action: "",
//   //   };
//   // });
//   const data = orderState.map((order, index) => ({
//     key: index + 1,
//     _id: order._id,
//     name: `${order.orderby.firstname} ${order.orderby.lastname}`,
//     product: (
//       <Link to={`/admin/order/${order.orderby._id}`}>
//         View Orders
//       </Link>
//     ),
//     amount: order.paymentIntent.amount,
//     date: new Date(order.createdAt).toLocaleString(),
//     status: order.orderStatus,
//     dispatchTime: order.dispatchedAt,
//     deliveryConfirmed: order.deliveryConfirmed,
//   }));

//   return (
//     <div>
//       <h3 className="mb-4 title">Orders</h3>
//       <div>{<Table columns={columns} dataSource={data} />}</div>
//     </div>
//   );
// };

// export default Orders;






import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus, confirmDelivery } from "../features/auth/authSlice";
import CountdownTimer from "../components/CountdownTimer";

const { Option } = Select;

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.orders);
  const [confirmationStep, setConfirmationStep] = useState('initial');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [activeOrderId, setActiveOrderId] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const submitConfirmation = () => {
    dispatch(confirmDelivery({ orderId: activeOrderId, confirmationCode })).then((result) => {
      if (result.type === 'auth/confirmDelivery/fulfilled') {
        setConfirmationStep('initial');
        setConfirmationCode('');
        setActiveOrderId(null);
      }
    });
  };

  const initiateConfirmation = (orderId) => {
    setConfirmationStep('codeEntry');
    setActiveOrderId(orderId);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          <Select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record._id, value)}
          >
            <Option value="Not Processed">Not Processed</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Dispatched">Dispatched</Option>
            <Option value="Cancelled">Cancelled</Option>
            <Option value="Delivered">Delivered</Option>
          </Select>
          {text === "Dispatched" && (
            <div>
              <p>Delivery Countdown:</p>
              <CountdownTimer dispatchTime={record.dispatchTime} />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Delivered",
      dataIndex: "deliveryConfirmed",
      render: (text, record) => (
        <div>
          {record.deliveryConfirmed ? (
            <span>Confirmed</span>
          ) : record.orderStatus === "Dispatched" ? (
            <div>
              <Button onClick={() => initiateConfirmation(record._id)}>
                Confirm Delivery
              </Button>
              {confirmationStep === 'codeEntry' && activeOrderId === record._id && (
                <div>
                  <input 
                    type="text" 
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter confirmation code"
                  />
                  <Button onClick={submitConfirmation}>
                    Submit
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <span>Not Yet</span>
          )}
        </div>
      )
    },
  ];

  const data = orderState.map((order, index) => ({
    key: index + 1,
    _id: order._id,
    name: order.userDetails.name,
    product: (
      <Link to={`/admin/order/${order._id}`}>
        View Orders ({order.products.length} items)
      </Link>
    ),
    amount: order.paymentIntent.amount,
    date: new Date(order.createdAt).toLocaleString(),
    status: order.orderStatus,
    dispatchTime: order.dispatchedAt,
    deliveryConfirmed: order.deliveryConfirmed,
  }));

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data} />}</div>
    </div>
  );
};

export default Orders;
