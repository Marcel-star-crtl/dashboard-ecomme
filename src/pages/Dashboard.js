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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrders());
      const result = await dispatch(getTotalIncome());
      console.log('Total income after dispatch:', result.payload);

      // Ensure totalIncome is always a number
      const incomeValue = result.payload || 0;
      setTotalIncome(typeof incomeValue === 'number' ? incomeValue : 0);
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

  const data1 = (orders || []).map((order, index) => ({
    key: index + 1,
    name: order.userDetails?.name || 'N/A',
    product: order.paymentIntent || 'N/A',
    status: order.orderStatus || 'N/A',
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
    data: monthlyIncome.length > 0 ? monthlyIncome : data,
    xField: "type",
    yField: "sales",
    color: '#E8A5C4', 
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
      <h3 className="mb-4 title" style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontWeight: '400' }}>Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div
          className="d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3"
          style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <div>
            <p className="desc" style={{ fontSize: '14px', color: '#666', marginBottom: '5px', fontFamily: 'Arial, sans-serif' }}>Total Income</p>
            <h4 className="mb-0 sub-title" style={{ fontSize: '24px', color: '#E8A5C4', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
              ${(totalIncome && typeof totalIncome === 'number' ? totalIncome.toFixed(2) : '0.00')}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <BsArrowDownRight style={{ color: '#52c41a' }} />
            <p className="mb-0 desc" style={{ fontSize: '12px', color: '#999', fontFamily: 'Arial, sans-serif' }}>Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title" style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontWeight: '400' }}>Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title" style={{ color: '#333', fontFamily: 'Arial, sans-serif', fontWeight: '400' }}>Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;