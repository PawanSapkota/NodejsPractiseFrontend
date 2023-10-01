import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

const Imgtwouploadfile = () => {
  const [change, setChange] = useState(false);
  return (
    <div className="my-4 bg-white p-2">
      <Formik
        initialValues={{
          imageone: [],
          imagetwo: [],
        }}
        // validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          const formdata = new FormData();
          values.imageone.map((val, i) => {
            formdata.append("imageone", val);
          });
          values.imagetwo.map((val, i) => {
            formdata.append("imagetwo", val);
          });

          try {
            axios
              .post(`http://localhost:5003/twofileupload/`, formdata)
              .then((res) => {
                console.log(res);
                setChange(!change);
                resetForm();
              })
              .catch((err) => err);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleSubmit, setFieldValue, values, handleChange }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className=" w-10/12 mx-auto border shadow-xl z-10 rounded p-4 "
            >
              <div className="w-1/2 mt-4 ">
                <label className="text-lg font-semibold">Upload Image</label>
                <div className="overflow-y-auto scroll border p-2 h-48 rounded grid grid-cols-2 gap-4">
                  {values.imageone.length > 0 ? (
                    values.imageone.map((img, index) => {
                      return (
                        <div key={index} className="relative  ">
                          <img
                            src={URL.createObjectURL(img)}
                            alt="images"
                            className="w-52 h-40"
                          />
                          <button
                            className="absolute top-1 right-1 text-red-500"
                            onClick={() => {
                              const value = values.imageone;
                              value.splice(index, 1);
                              setFieldValue("imageone", [...value]);
                            }}
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <>
                  <label htmlFor="imageone">
                    <BiUpload className="font-bold text-2xl bg-blue-700 text-white mt-4 rounded " />
                  </label>

                  <input
                    type="file"
                    id="imageone"
                    className="p-2 rounded hidden  border"
                    onChange={(e) => {
                      const data = e.target.files[0];
                      setFieldValue("imageone", [...values.imageone, data]);
                    }}
                  />
                </>
              </div>

              <div className="w-1/2 mt-4 ">
                <label className="text-lg font-semibold">Upload Image</label>
                <div className="overflow-y-auto scroll border p-2 h-48 rounded grid grid-cols-2 gap-4">
                  {values.imagetwo.length > 0 ? (
                    values.imagetwo.map((img, index) => {
                      return (
                        <div key={index} className="relative  ">
                          <img
                            src={URL.createObjectURL(img)}
                            alt="images"
                            className="w-52 h-40"
                          />
                          <button
                            className="absolute top-1 right-1 text-red-500"
                            onClick={() => {
                              const value = values.imagetwo;
                              value.splice(index, 1);
                              setFieldValue("imagetwo", [...value]);
                            }}
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <>
                  <label htmlFor="imagetwo">
                    <BiUpload className="font-bold text-2xl bg-blue-700 text-white mt-4 rounded " />
                  </label>

                  <input
                    type="file"
                    id="imagetwo"
                    className="p-2 rounded hidden  border"
                    onChange={(e) => {
                      const data = e.target.files[0];
                      setFieldValue("imagetwo", [...values.imagetwo, data]);
                    }}
                  />
                </>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="h-10 w-40 outline-none cursor-pointer p-2 bg-green-700 text-white rounded hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Imgtwouploadfile;
