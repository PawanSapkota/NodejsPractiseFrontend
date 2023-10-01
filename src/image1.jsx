import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "../../../hoc/axios";
import React, { useState, useEffect, useMemo } from "react";

const newValues = {
  image: "",
};
const image1 = () => {
  const postRequest = () => {
    try {
      axios
        .post(`http://localhost:5003/imageupload1/`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => err);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ newValues }}
        //   validationSchema={schema}
        onSubmit={(Values, { resetForm }) => {
          postRequest(Values.postRequest, resetForm);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-4 w-full mx-auto shadow-lg p-6 shadow-gray-400 bg-white "
            >
              <div className="w-full  flex flex-col gap-6">
                <label
                  htmlFor="image"
                  className="font-semibold border p-1 rounded w-40 h-40"
                >
                  Upload Image
                  {values.image ? (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={URL.createObjectURL(values.image)}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={uploadimage}
                    />
                  )}
                </label>
                <input
                  id="image"
                  className="p-2 rounded hidden  border"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("image", e.target.files[0]);
                  }}
                />
                <ErrorMessage name="image" component={"div"} />
              </div>

              <button
                type="submit"
                className="w-1/2 p-2 mt-2 bg-blue-700 rounded text-white hover:to-blue-400"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default image1;
