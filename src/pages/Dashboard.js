// import React, { useEffect } from "react";
// import { BsArrowDownRight } from "react-icons/bs";
// import { Column } from "@ant-design/charts";
// import { Table } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { getOrders } from "../features/auth/authSlice"; 

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { orders, isLoading, isError } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);

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
//       title: "Payment",
//       dataIndex: "product",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
//   ];

//   const data1 = orders.map((order, index) => ({
//     key: index + 1,
//     name: order.userDetails.lastName, 
//     product: order.paymentIntent, 
//     status: order.orderStatus,
//   }));

//   const data = [
//     { type: "Jan", sales: 38 },
//     { type: "Feb", sales: 52 },
//     { type: "Mar", sales: 61 },
//     { type: "Apr", sales: 145 },
//     { type: "May", sales: 48 },
//     { type: "Jun", sales: 38 },
//     { type: "July", sales: 38 },
//     { type: "Aug", sales: 38 },
//     { type: "Sept", sales: 38 },
//     { type: "Oct", sales: 38 },
//     { type: "Nov", sales: 38 },
//     { type: "Dec", sales: 38 },
//   ];

//   const config = {
//     data,
//     xField: "type",
//     yField: "sales",
//     color: () => "#4B0082",
//     label: {
//       position: "middle",
//       style: {
//         fill: "#FFFFFF",
//         opacity: 1,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: { alias: "Month" },
//       sales: { alias: "Income" },
//     },
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3">
//         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total</p>
//             <h4 className="mb-0 sub-title">$1100</h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <h6>
//               <BsArrowDownRight /> 32%
//             </h6>
//             <p className="mb-0  desc">Compared To April 2022</p>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total</p>
//             <h4 className="mb-0 sub-title">$1100</h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <h6 className="red">
//               <BsArrowDownRight /> 32%
//             </h6>
//             <p className="mb-0  desc">Compared To April 2022</p>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total</p>
//             <h4 className="mb-0 sub-title">$1100</h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <h6 className="green">
//               <BsArrowDownRight /> 32%
//             </h6>
//             <p className="mb-0 desc">Compared To April 2022</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-5 title">Income Statics</h3>
//         <div>
//           <Column {...config} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-5 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} loading={isLoading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;













// import React, { useEffect } from "react";
// import { BsArrowDownRight } from "react-icons/bs";
// import { Column } from "@ant-design/charts";
// import { Table } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { getOrders } from "../features/auth/authSlice"; 

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { orders, isLoading, isError } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getOrders());
//   }, [dispatch]);

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
//       title: "Payment",
//       dataIndex: "product",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
//   ];

//   const data1 = orders.map((order, index) => ({
//     key: index + 1,
//     name: order.userDetails.lastName, 
//     product: order.paymentIntent, 
//     status: order.orderStatus,
//   }));

//   const data = [
//     { type: "Jan", sales: 38 },
//     { type: "Feb", sales: 52 },
//     { type: "Mar", sales: 61 },
//     { type: "Apr", sales: 145 },
//     { type: "May", sales: 48 },
//     { type: "Jun", sales: 38 },
//     { type: "July", sales: 38 },
//     { type: "Aug", sales: 38 },
//     { type: "Sept", sales: 38 },
//     { type: "Oct", sales: 38 },
//     { type: "Nov", sales: 38 },
//     { type: "Dec", sales: 38 },
//   ];

//   const config = {
//     data,
//     xField: "type",
//     yField: "sales",
//     color: () => "#4B0082",
//     label: {
//       position: "middle",
//       style: {
//         fill: "#FFFFFF",
//         opacity: 1,
//       },
//     },
//     xAxis: {
//       label: {
//         autoHide: true,
//         autoRotate: false,
//       },
//     },
//     meta: {
//       type: { alias: "Month" },
//       sales: { alias: "Income" },
//     },
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">Dashboard</h3>
//       <div className="d-flex justify-content-between align-items-center gap-3">
//         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
//           <div>
//             <p className="desc">Total</p>
//             <h4 className="mb-0 sub-title">$1100</h4>
//           </div>
//           <div className="d-flex flex-column align-items-end">
//             <h6>
//               <BsArrowDownRight /> 32%
//             </h6>
//             <p className="mb-0  desc">Compared To April 2022</p>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-5 title">Income Statics</h3>
//         <div>
//           <Column {...config} />
//         </div>
//       </div>
//       <div className="mt-4">
//         <h3 className="mb-5 title">Recent Orders</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} loading={isLoading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
















import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/charts";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, getTotalIncome } from "../features/auth/authSlice"; 
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.auth);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  // useEffect(() => {
  //   dispatch(getOrders());
  //   dispatch(getTotalIncome());
  //   fetchMonthlyIncome();
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrders());
      const result = await dispatch(getTotalIncome());
      console.log('Total income after dispatch:', result.payload);
      setTotalIncome(result.payload);
    };
    fetchData();
    fetchMonthlyIncome();
  }, [dispatch]);
  
  console.log('Total income in render:', totalIncome);

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axios.get('/api/order/monthly-income', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      setMonthlyIncome(response.data);
    } catch (error) {
      console.error('Error fetching monthly income:', error);
    }
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
      title: "Payment",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const data1 = orders.map((order, index) => ({
    key: index + 1,
    name: order.userDetails.name, 
    product: order.paymentIntent, 
    status: order.orderStatus,
  }));

  const data = [
    { type: "Jan", sales: 38 },
    { type: "Feb", sales: 52 },
    { type: "Mar", sales: 61 },
    { type: "Apr", sales: 145 },
    { type: "May", sales: 48 },
    { type: "Jun", sales: 38 },
    { type: "July", sales: 38 },
    { type: "Aug", sales: 38 },
    { type: "Sept", sales: 38 },
    { type: "Oct", sales: 38 },
    { type: "Nov", sales: 38 },
    { type: "Dec", sales: 38 },
  ];

  const config = {
    data: monthlyIncome,
    xField: "type",
    yField: "sales",
    color: () => "#4B0082",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: "Month" },
      sales: { alias: "Income" },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            {/* <p className="desc">Total Income</p> */}
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              ${totalIncome ? totalIncome.toFixed(2) : '0.00'}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
