import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderById, confirmDelivery } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
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
    title: "Action",
    dataIndex: "action",
  },
  // {
  //   title: "Confirm Delivery",
  //   dataIndex: "confirm",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state.auth.orderbyuser);

  useEffect(() => {
    if (orderState && orderState.length > 0) {
      const productsData = orderState[0].products.map((product, productIndex) => ({
        key: `${productIndex + 1}`,
        name: product.product.title, // Adjust this according to the structure of the product object
        brand: product.product.brand, // Adjust if necessary
        count: product.count,
        amount: product.product.price, // Adjust this according to how the amount is stored
        color: product.color,
        date: new Date(orderState[0].createdAt).toLocaleString(),
        action: (
          <>
            <Link to="/" className="fs-3" style={{ color: "#4B0082" }}>
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3" to="/" style={{ color: "#4B0082" }}>
              <AiFillDelete />
            </Link>
          </>
        ),
        confirm: (
          <Button
            onClick={() => dispatch(confirmDelivery({ orderId: orderState[0]._id }))}
            disabled={orderState[0].deliveryConfirmed || orderState[0].orderStatus !== 'Dispatched'}
          >
            Confirm
          </Button>
        ),
      }));
      setOrderData(productsData);
    }
  }, [orderState, dispatch]);

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={orderData} />
      </div>
    </div>
  );
};

export default ViewOrder;







// import React, { useEffect, useState } from "react";
// import { Table, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link, useLocation } from "react-router-dom";
// import { getOrderByUser, confirmDelivery } from "../features/auth/authSlice";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Product Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Brand",
//     dataIndex: "brand",
//   },
//   {
//     title: "Count",
//     dataIndex: "count",
//   },
//   {
//     title: "Color",
//     dataIndex: "color",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
//   {
//     title: "Confirm Delivery",
//     dataIndex: "confirm",
//   },
// ];

// const ViewOrder = () => {
//   const location = useLocation();
//   const userId = location.pathname.split("/")[3];
//   const dispatch = useDispatch();
//   const [orderData, setOrderData] = useState([]);

//   useEffect(() => {
//     console.log("Fetching order for user ID:", userId);
//     dispatch(getOrderByUser(userId));
//   }, [dispatch, userId]);

//   const orderState = useSelector((state) => state.auth.orderbyuser);

//   useEffect(() => {
//     console.log("orderState:", orderState);

//     if (orderState && orderState.length > 0) {
//       const order = orderState[0]; 
//       console.log("Processing order:", order);

//       const productsData = order.products.map((product, index) => {
//         console.log("Processing product:", product);
//         return {
//           key: index + 1,
//           name: product.product?.title || 'N/A',
//           brand: product.product?.brand || 'N/A',
//           count: product.count || 0,
//           amount: product.price || 0,
//           color: product.color || 'N/A',
//           date: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
//           action: (
//             <>
//               <Link to="/" className="fs-3" style={{color: "#4B0082"}}>
//                 <BiEdit />
//               </Link>
//               <Link className="ms-3 fs-3" to="/" style={{color: "#4B0082"}}>
//                 <AiFillDelete />
//               </Link>
//             </>
//           ),
//           confirm: (
//             <Button 
//               onClick={() => dispatch(confirmDelivery({ orderId: order._id }))} 
//               disabled={order.deliveryConfirmed || order.orderStatus !== 'Dispatched'}
//             >
//               Confirm
//             </Button>
//           ),
//         };
//       });

//       console.log("Processed products data:", productsData);
//       setOrderData(productsData);
//     }
//   }, [orderState, dispatch]);

//   console.log("Final orderData:", orderData);

//   return (
//     <div>
//       <h3 className="mb-4 title">View Order</h3>
//       <div>
//         <Table columns={columns} dataSource={orderData} />
//       </div>
//     </div>
//   );
// };

// export default ViewOrder;

















// import React, { useEffect, useState } from "react";
// import { Table, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link, useLocation } from "react-router-dom";
// import { getOrderByUser, confirmDelivery } from "../features/auth/authSlice";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Product Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Brand",
//     dataIndex: "brand",
//   },
//   {
//     title: "Count",
//     dataIndex: "count",
//   },
//   {
//     title: "Color",
//     dataIndex: "color",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
//   {
//     title: "Confirm Delivery",
//     dataIndex: "confirm",
//   },
// ];


// const ViewOrder = () => {
//   const location = useLocation();
//   const userId = location.pathname.split("/")[3];
//   const dispatch = useDispatch();
//   const [orderData, setOrderData] = useState([]);

//   useEffect(() => {
//     console.log("Fetching order for user ID:", userId);
//     dispatch(getOrderByUser(userId));
//   }, [dispatch, userId]);

//   const orderState = useSelector((state) => state.auth.orderbyuser);

//   useEffect(() => {
//     console.log("orderState:", orderState);

//     if (Array.isArray(orderState) && orderState.length > 0) {
//       const productsData = orderState.flatMap((order, orderIndex) => 
//         order.products.map((product, productIndex) => ({
//           key: `${orderIndex}-${productIndex}`,
//           name: product.product?.title || 'N/A',
//           brand: product.product?.brand || 'N/A',
//           count: product.count || 0,
//           amount: product.price || 0,
//           color: product.color || 'N/A',
//           date: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
//           action: (
//             <>
//               <Link to="/" className="fs-3" style={{color: "#4B0082"}}>
//                 <BiEdit />
//               </Link>
//               <Link className="ms-3 fs-3" to="/" style={{color: "#4B0082"}}>
//                 <AiFillDelete />
//               </Link>
//             </>
//           ),
//           confirm: (
//             <Button 
//               onClick={() => dispatch(confirmDelivery({ orderId: order._id }))} 
//               disabled={order.deliveryConfirmed || order.orderStatus !== 'Dispatched'}
//             >
//               Confirm
//             </Button>
//           ),
//         }))
//       );

//       console.log("Processed products data:", productsData);
//       setOrderData(productsData);
//     }
//   }, [orderState, dispatch]);

//   console.log("Final orderData:", orderData);

//   return (
//     <div>
//       <h3 className="mb-4 title">View Order</h3>
//       <div>
//         <Table columns={columns} dataSource={orderData} />
//       </div>
//     </div>
//   );
// };

// export default ViewOrder;