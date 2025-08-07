import React, { useEffect, useState } from "react";
import { Table, Switch, Modal, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct, deleteProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const Productlist = () => {
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products) || [];
  
  console.log("Product State:", productState);

  const handleFinalSaleToggle = (checked, productId) => {
    dispatch(updateProduct({ id: productId, isFinalSale: checked }));
  };

  const showDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete._id))
        .unwrap()
        .then(() => {
          message.success("Product deleted successfully");
          dispatch(getProducts());
        })
        .catch((error) => {
          message.error("Failed to delete product: " + error.message);
        });
    }
    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Is Final Sale",
      dataIndex: "isFinalSale",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const products = productState.results || productState;
  
  const data1 = Array.isArray(products)
    ? products.map((product, index) => ({
        key: index + 1,
        title: product.title,
        brand: product.brand,
        category: product.category?.title || 'N/A',
        color: Array.isArray(product.color) ? product.color.join(", ") : product.color,
        price: `${product.price}`,
        isFinalSale: (
          <Switch
            checked={product.isFinalSale}
            onChange={(checked) => handleFinalSaleToggle(checked, product._id)}
          />
        ),
        action: (
          <>
            <Link to={`/admin/product/${product._id}`} className="fs-3" style={{ color: "#4B0082" }}>
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 bg-transparent border-0"
              onClick={() => showDeleteModal(product)}
              style={{ color: "#4B0082" }}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      }))
    : [];

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <Modal
        title="Delete Product"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default Productlist;





