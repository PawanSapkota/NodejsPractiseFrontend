import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import ReactToPrint from "react-to-print";
import { jsPDF } from "jspdf";
import { BiUpload } from "react-icons/bi";
import autoTable from "jspdf-autotable";
import { CSVLink, CSVDownload } from "react-csv";

const Imgupload2 = () => {
  const [change, setChange] = useState(false);
  const componentRef = useRef();
  const print = () => {
    const doc = new jsPDF("l", "pt", "letter");
    // doc.html(componentRef.current, {
    //   callback: function (doc) {
    //     // Save the PDF
    //     doc.save("sample-document.pdf");
    //   },
    // });

    autoTable(doc, {
      theme: "plain",
      head: [["Name", "Email", "Country"]],
      body: [
        ["David", "david@example.com", "Sweden"],
        ["Castille", "castille@example.com", "Spain"],
        // ...
      ],
    });
    doc.save("pawan");
  };

  let headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ];

  let data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];

  return (
    <div className="my-4 bg-white p-2">
      <div ref={componentRef}>
        <Formik
          initialValues={{
            image: [],
          }}
          // validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            const formdata = new FormData();
            values.image.map((val, i) => {
              formdata.append("image", val);
            });

            try {
              axios
                .post(`http://localhost:5003/multipleimageupload/`, formdata)
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
                    {values.image.length > 0 ? (
                      values.image.map((image, index) => {
                        return (
                          <div key={index} className="relative  ">
                            <img
                              src={URL.createObjectURL(image)}
                              alt="images"
                              className="w-52 h-40"
                            />
                            <button
                              className="absolute top-1 right-1 text-red-500"
                              onClick={() => {
                                const value = values.image;
                                value.splice(index, 1);
                                setFieldValue("image", [...value]);
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
                    <label htmlFor="image">
                      <BiUpload className="font-bold text-2xl bg-blue-700 text-white mt-4 rounded " />
                    </label>

                    <input
                      type="file"
                      id="image"
                      className="p-2 rounded hidden  border"
                      onChange={(e) => {
                        const data = e.target.files[0];
                        setFieldValue("image", [...values.image, data]);
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
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <button onClick={() => print()}>Pdf</button>
      <CSVLink data={data} headers={headers}>
        Download me
      </CSVLink>
    </div>
  );
};

export default Imgupload2;
