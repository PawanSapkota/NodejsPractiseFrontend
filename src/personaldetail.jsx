import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Personaldetail = () => {
  const [getResult, setGetResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getRequest = () => {
    try {
      axios
        .get(
          `http://localhost:5003/personaldetail?search=${search}&&filter=${filter}&&todate=${toDate}&&fromdate=${fromDate}`
        )
        .then((res) => {
          setGetResult(res.data.data);
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, [search, filter, toDate, fromDate]);

  return (
    <div>
      <div className="flex gap-10">
        <button
          onClick={() => setFilter("asc")}
          className="bg-blue-200 text-white"
        >
          Acending
        </button>
        <button
          onClick={() => setFilter("dsc")}
          className="bg-blue-200 text-white"
        >
          Decesending
        </button>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border"
          placeholder="search"
        />
      </div>
      <table>
        <thead>
          <tr className="border">
            <td>Name</td>
            <td>Email</td>
            <td>Number</td>
          </tr>
        </thead>
        <tbody>
          {getResult.map((val, i) => {
            return (
              <tr key={i}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-8 ">
        <input
          onChange={(e) => setFromDate(e.target.value)}
          type="date"
          className="border"
        />
        <input
          onChange={(e) => setToDate(e.target.value)}
          type="date"
          className="border"
        />
        {/* <button onClick={() => getRequest()} type="submit">
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default Personaldetail;
