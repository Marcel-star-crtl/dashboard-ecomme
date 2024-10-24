import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getFAQs, updateFAQ, deleteFAQ } from "../features/faq/faqSlice";
import { Link } from "react-router-dom";

const FAQList = () => {
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  useEffect(() => {
    dispatch(getFAQs());
  }, [dispatch]);

  const faqState = useSelector((state) => state.faq.faqs);

  const showDeleteModal = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (faqToDelete) {
      dispatch(deleteFAQ(faqToDelete._id))
        .unwrap()
        .then(() => {
          message.success("FAQ deleted successfully");
          dispatch(getFAQs());
        })
        .catch((error) => {
          message.error("Failed to delete FAQ: " + error.message);
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
      title: "Question",
      dataIndex: "question",
      sorter: (a, b) => a.question.length - b.question.length,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      sorter: (a, b) => a.answer.length - b.answer.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data1 = faqState.map((faq, index) => ({
    key: index + 1,
    question: faq.question,
    answer: faq.answer,
    action: (
      <>
        <Link to={`/admin/faq/${faq._id}`} className="fs-3" style={{color: "#4B0082"}}>
          <BiEdit />
        </Link>
        <button 
          className="ms-3 fs-3 bg-transparent border-0"
          onClick={() => showDeleteModal(faq)}
          style={{color: "#4B0082"}}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">FAQs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <Modal
        title="Delete FAQ"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this FAQ?</p>
      </Modal>
    </div>
  );
};

export default FAQList;
