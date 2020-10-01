import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Cities from "./All_cities";
import "./Style.css";

function Short() {
  const [shortlist, setShort] = useState([]);
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleOnClick = useCallback(() => history.push("/"), [history]);
  useEffect(() => {
    var short = localStorage.getItem("short");
    var state = localStorage.getItem("state");
    console.log("test", short);
    if (short) {
      short = JSON.parse(short);
      console.log("short", short);
      setShort([...short]);
    }
    if (state) {
      state = JSON.parse(state);

      setData([...state]);
      console.log("data", state);
    }
  }, []);

  console.log("short", data);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of shortlisted Data</h1>
      {shortlist.length !== 0 ? (
        <h5
          className="back"
          onClick={handleOnClick}
          style={{ textAlign: "center", cursor: "pointer" }}
        >
          Back
        </h5>
      ) : null}
      {shortlist.length === 0 ? (
        <div>
          <h1 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            No Data Found
          </h1>
          <h4
            style={{ textAlign: "center", cursor: "pointer" }}
            className="back"
            onClick={handleOnClick}
          >
            Back
          </h4>
        </div>
      ) : (
        <table id="customers">
          <tr>
            <th>State</th>
            <th>District</th>
            <th>City</th>
          </tr>

          {shortlist.map((id) => {
            return (
              <tr>
                <td>{data[id].State}</td>
                <td>{data[id].District}</td>
                <td>{data[id].City}</td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
}
export default Short;
