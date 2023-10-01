import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as yup from "yup";
import axios from "axios";
// import React, { useState, useEffect, useMemo } from "react";

const newValues = {
  firstimage: "",
  secondimage: "",
};
const image1 = () => {
  return (
    <div>
      <Formik
        initialValues={{ newValues }}
        //   validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          const formdata = new FormData();
          formdata.append("firstimage", values.firstimage);
          formdata.append("secondimage", values.secondimage);
          try {
            axios
              .post(`http://localhost:5003/imageupload/`, formdata)
              .then((res) => {
                console.log(res);
                resetForm();
              })
              .catch((err) => err);
          } catch (err) {
            console.log(err);
          }
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
                  htmlFor="firstimage"
                  className="font-semibold border p-1 rounded w-40 h-40"
                >
                  Upload Image
                  {values.firstimage ? (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={URL.createObjectURL(values.firstimage)}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={
                        "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                      }
                    />
                  )}
                </label>
                <input
                  id="firstimage"
                  className="p-2 rounded hidden  border"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("firstimage", e.target.files[0]);
                  }}
                />
                <ErrorMessage name="firstimage" component={"div"} />
              </div>
              <div className="w-full  flex flex-col gap-6">
                <label
                  htmlFor="secondimage"
                  className="font-semibold border p-1 rounded w-40 h-40"
                >
                  Upload Image
                  {values.secondimage ? (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={URL.createObjectURL(values.secondimage)}
                    />
                  ) : (
                    <img
                      alt="img"
                      className="w-full h-full"
                      src={
                        "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                      }
                    />
                  )}
                </label>
                <input
                  id="secondimage"
                  className="p-2 rounded hidden  border"
                  type="file"
                  onChange={(e) => {
                    setFieldValue("secondimage", e.target.files[0]);
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
