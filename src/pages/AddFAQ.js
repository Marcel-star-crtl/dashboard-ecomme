import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createFAQ, resetFAQState } from "../features/faq/faqSlice";

let schema = yup.object().shape({
  question: yup.string().required("Question is Required"),
  answer: yup.string().required("Answer is Required"),
});

const AddFAQ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const faqState = useSelector((state) => state.faq);
  const { isSuccess, isError, isLoading, createdFAQ } = faqState;

  useEffect(() => {
    if (isSuccess && createdFAQ) {
      toast.success("FAQ Added Successfully!");
      setTimeout(() => {
        navigate("/admin/list-faq");
        dispatch(resetFAQState());
      }, 3000);
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdFAQ, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createFAQ(values));
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add FAQ</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter FAQ Question"
            name="question"
            onChng={formik.handleChange("question")}
            onBlr={formik.handleBlur("question")}
            val={formik.values.question}
          />
          <div className="error">{formik.touched.question && formik.errors.question}</div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="answer"
              onChange={formik.handleChange("answer")}
              value={formik.values.answer}
            />
          </div>
          <div className="error">{formik.touched.answer && formik.errors.answer}</div>
          <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
            Add FAQ
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFAQ;
