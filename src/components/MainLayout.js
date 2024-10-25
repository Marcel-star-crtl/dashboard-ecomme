// import React, { useState } from "react";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import {
//   AiOutlineDashboard,
//   AiOutlineShoppingCart,
//   AiOutlineUser,
//   AiOutlineBgColors,
// } from "react-icons/ai";
// import { RiCouponLine } from "react-icons/ri";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import { ImBlog } from "react-icons/im";
// import { IoIosNotifications } from "react-icons/io";
// import { FaClipboardList, FaBloggerB } from "react-icons/fa";
// import { SiBrandfolder } from "react-icons/si";
// import { BiCategoryAlt } from "react-icons/bi";
// import { Layout, Menu, theme } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Header, Sider, Content } = Layout;
// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const navigate = useNavigate();
//   return (
//     <Layout /* onContextMenu={(e) => e.preventDefault()} */>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo">
//           <h2 className="text-white fs-5 text-center py-3 mb-0">
//             <span className="sm-logo">AB</span>
//             <span className="lg-logo">Annies Boutique</span>
//           </h2>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={[""]}
//           onClick={({ key }) => {
//             if (key == "signout") {
//             } else {
//               navigate(key);
//             }
//           }}
//           items={[
//             {
//               key: "",
//               icon: <AiOutlineDashboard className="fs-4" />,
//               label: "Dashboard",
//               className: "dashboard-menu-item",  
//             },
//             {
//               key: "customers",
//               icon: <AiOutlineUser className="fs-4" />,
//               label: "Customers",
//             },
//             {
//               key: "Catalog",
//               icon: <AiOutlineShoppingCart className="fs-4" />,
//               label: "Catalog",
//               children: [
//                 {
//                   key: "product",
//                   icon: <AiOutlineShoppingCart className="fs-4" />,
//                   label: "Add Product",
//                 },
//                 {
//                   key: "list-product",
//                   icon: <AiOutlineShoppingCart className="fs-4" />,
//                   label: "Product List",
//                 },
//                 {
//                   key: "brand",
//                   icon: <SiBrandfolder className="fs-4" />,
//                   label: "Brand",
//                 },
//                 {
//                   key: "list-brand",
//                   icon: <SiBrandfolder className="fs-4" />,
//                   label: "Brand List ",
//                 },
//                 {
//                   key: "category",
//                   icon: <BiCategoryAlt className="fs-4" />,
//                   label: "Category",
//                 },
//                 {
//                   key: "list-category",
//                   icon: <BiCategoryAlt className="fs-4" />,
//                   label: "Category List",
//                 },
//                 {
//                   key: "color",
//                   icon: <AiOutlineBgColors className="fs-4" />,
//                   label: "Color",
//                 },
//                 {
//                   key: "list-color",
//                   icon: <AiOutlineBgColors className="fs-4" />,
//                   label: "Color List",
//                 },
//               ],
//             },
//             {
//               key: "orders",
//               icon: <FaClipboardList className="fs-4" />,
//               label: "Orders",
//             },
//             {
//               key: "marketing",
//               icon: <RiCouponLine className="fs-4" />,
//               label: "Marketing",
//               children: [
//                 {
//                   key: "coupon",
//                   icon: <ImBlog className="fs-4" />,
//                   label: "Add Coupon",
//                 },
//                 {
//                   key: "coupon-list",
//                   icon: <RiCouponLine className="fs-4" />,
//                   label: "Coupon List",
//                 },
//               ],
//             },
//             // {
//             //   key: "blogs",
//             //   icon: <FaBloggerB className="fs-4" />,
//             //   label: "Blogs",
//             //   children: [
//             //     {
//             //       key: "blog",
//             //       icon: <ImBlog className="fs-4" />,
//             //       label: "Add Blog",
//             //     },
//             //     {
//             //       key: "blog-list",
//             //       icon: <FaBloggerB className="fs-4" />,
//             //       label: "Blog List",
//             //     },
//             //     {
//             //       key: "blog-category",
//             //       icon: <ImBlog className="fs-4" />,
//             //       label: "Add Blog Category",
//             //     },
//             //     {
//             //       key: "blog-category-list",
//             //       icon: <FaBloggerB className="fs-4" />,
//             //       label: "Blog Category List",
//             //     },
//             //   ],
//             // },
//             {
//               key: "enquiries",
//               icon: <FaClipboardList className="fs-4" />,
//               label: "Enquiries",
//             },
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="d-flex justify-content-between ps-1 pe-5"
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           {React.createElement(
//             collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//             {
//               className: "trigger",
//               onClick: () => setCollapsed(!collapsed),
//             }
//           )}
//           <div className="d-flex gap-4 align-items-center">
//             <div className="position-relative">
//               <IoIosNotifications className="fs-4" />
//               <span className="badge bg-warning rounded-circle p-1 position-absolute">
//                 3
//               </span>
//             </div>

//             {/* <div className="d-flex gap-3 align-items-center dropdown">
//               <div>
//                 <img
//                   width={32}
//                   height={32}
//                   src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
//                   alt=""
//                 />
//               </div>
//               <div
//                 role="button"
//                 id="dropdownMenuLink"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <h5 className="mb-0">Navdeep</h5>
//                 <p className="mb-0">navdeepdahiya753@gmail.com</p>
//               </div>
//               <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
//                 <li>
//                   <Link
//                     className="dropdown-item py-1 mb-1"
//                     style={{ height: "auto", lineHeight: "20px" }}
//                     to="/"
//                   >
//                     View Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="dropdown-item py-1 mb-1"
//                     style={{ height: "auto", lineHeight: "20px" }}
//                     to="/"
//                   >
//                     Signout
//                   </Link>
//                 </li>
//               </div>
//             </div> */}
//           </div>
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >
//           <ToastContainer
//             position="top-right"
//             autoClose={250}
//             hideProgressBar={false}
//             newestOnTop={true}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             theme="light"
//           />
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default MainLayout;














// import React, { useState } from "react";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
// import {
//   AiOutlineDashboard,
//   AiOutlineShoppingCart,
//   AiOutlineUser,
//   AiOutlineBgColors,
// } from "react-icons/ai";
// import { RiCouponLine } from "react-icons/ri";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import { Outlet } from "react-router-dom";
// import { ImBlog } from "react-icons/im";
// import { IoIosNotifications } from "react-icons/io";
// import { FaClipboardList, FaBloggerB } from "react-icons/fa";
// import { SiBrandfolder } from "react-icons/si";
// import { BiCategoryAlt } from "react-icons/bi";
// import { Layout, Menu, theme } from "antd";
// import { useNavigate } from "react-router-dom";
// const { Header, Sider, Content } = Layout;
// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const navigate = useNavigate();
//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo">
//           <h2 className="text-white fs-5 text-center py-3 mb-0">
//             <span className="sm-logo">AB</span>
//             <span className="lg-logo">Annies Boutique</span>
//           </h2>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={[""]}
//           onClick={({ key }) => {
//             if (key == "signout") {
//             } else {
//               navigate(key);
//             }
//           }}
//           items={[
//             {
//               key: "",
//               icon: <AiOutlineDashboard className="fs-4" />,
//               label: "Dashboard",
//               className: "dashboard-menu-item",  
//             },
//             {
//               key: "customers",
//               icon: <AiOutlineUser className="fs-4" />,
//               label: "Customers",
//             },
//             {
//               key: "Catalog",
//               icon: <AiOutlineShoppingCart className="fs-4" />,
//               label: "Catalog",
//               children: [
//                 {
//                   key: "product",
//                   icon: <AiOutlineShoppingCart className="fs-4" />,
//                   label: "Add Product",
//                 },
//                 {
//                   key: "list-product",
//                   icon: <AiOutlineShoppingCart className="fs-4" />,
//                   label: "Product List",
//                 },
//                 {
//                   key: "brand",
//                   icon: <SiBrandfolder className="fs-4" />,
//                   label: "Brand",
//                 },
//                 {
//                   key: "list-brand",
//                   icon: <SiBrandfolder className="fs-4" />,
//                   label: "Brand List ",
//                 },
//                 {
//                   key: "category",
//                   icon: <BiCategoryAlt className="fs-4" />,
//                   label: "Category",
//                 },
//                 {
//                   key: "list-category",
//                   icon: <BiCategoryAlt className="fs-4" />,
//                   label: "Category List",
//                 },
//                 {
//                   key: "color",
//                   icon: <AiOutlineBgColors className="fs-4" />,
//                   label: "Color",
//                 },
//                 {
//                   key: "list-color",
//                   icon: <AiOutlineBgColors className="fs-4" />,
//                   label: "Color List",
//                 },
//               ],
//             },
//             {
//               key: "orders",
//               icon: <FaClipboardList className="fs-4" />,
//               label: "Orders",
//             },
//             {
//               key: "marketing",
//               icon: <RiCouponLine className="fs-4" />,
//               label: "Marketing",
//               children: [
//                 {
//                   key: "coupon",
//                   icon: <ImBlog className="fs-4" />,
//                   label: "Add Coupon",
//                 },
//                 {
//                   key: "coupon-list",
//                   icon: <RiCouponLine className="fs-4" />,
//                   label: "Coupon List",
//                 },
//               ],
//             },
//             {
//               key: "enquiries",
//               icon: <FaClipboardList className="fs-4" />,
//               label: "Enquiries",
//             },
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="d-flex justify-content-between ps-1 pe-5"
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           {React.createElement(
//             collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//             {
//               className: "trigger",
//               onClick: () => setCollapsed(!collapsed),
//             }
//           )}
//           <div className="d-flex gap-4 align-items-center">
//             <div className="position-relative">
//               <IoIosNotifications className="fs-4" />
//               <span className="badge bg-warning rounded-circle p-1 position-absolute">
//                 3
//               </span>
//             </div>
//           </div>
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >
//           <ToastContainer
//             position="top-right"
//             autoClose={250}
//             hideProgressBar={false}
//             newestOnTop={true}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             theme="light"
//           />
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default MainLayout;













import React, { useState, useEffect, useCallback } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser, AiOutlineBgColors } from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme, Badge, Popover, notification } from "antd";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const addNotification = useCallback((newNotification) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [...prevNotifications, newNotification];
      return updatedNotifications.slice(-10); 
    });
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      upgrade: false
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('newOrder', (data) => {
      console.log('Received newOrder event:', data);
      const newNotification = {
        id: Date.now(),
        message: `New order received: ${data.orderId}`,
        type: 'newOrder',
        ...data,
      };
      addNotification(newNotification);
      notification.info({
        message: 'New Order',
        description: `Order ID: ${data.orderId} has been received.`,
      });
    });

    socket.on('orderStatusUpdate', (data) => {
      console.log('Received orderStatusUpdate event:', data);
      const newNotification = {
        id: Date.now(),
        message: `Order status updated: ${data.orderId} is now ${data.status}`,
        type: 'orderStatusUpdate',
        ...data,
      };
      addNotification(newNotification);
      notification.info({
        message: 'Order Status Update',
        description: `Order ID: ${data.orderId} is now ${data.status}.`,
      });
    });

    socket.on('newEnquiry', (data) => {
      console.log('Received newEnquiry event:', data);
      const newNotification = {
        id: Date.now(),
        message: `New enquiry received from: ${data.email}`,
        type: 'newEnquiry',
        ...data,
      };
      addNotification(newNotification);
      notification.info({
        message: 'New Enquiry',
        description: `Enquiry from: ${data.email}.`,
      });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [addNotification]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">AB</span>
            <span className="lg-logo">Goshen Lights</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              // Handle sign out
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "list-coupon",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "faqs",
              icon: <FaClipboardList className="fs-4" />,
              label: "FAQs",
              children: [
                {
                  key: "add-faq",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Add FAQ",
                },
                {
                  key: "list-faq",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "FAQ List",
                },
              ],
            },
            // {
            //   key: "blogs",
            //   icon: <FaBloggerB className="fs-4" />,
            //   label: "Blogs",
            //   children: [
            //     {
            //       key: "blog",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Blog",
            //     },
            //     {
            //       key: "blog-list",
            //       icon: <FaBloggerB className="fs-4" />,
            //       label: "Blog List",
            //     },
            //   ],
            // },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <Popover
                content={
                  <div className="notification-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        {notification.message}
                      </div>
                    ))}
                  </div>
                }
                title="Notifications"
                trigger="click"
              >
                <Badge count={notifications.length} overflowCount={10}>
                  <IoIosNotifications className="fs-4" />
                </Badge>
              </Popover>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default MainLayout;
