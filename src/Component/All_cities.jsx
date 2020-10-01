import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "./Pagination";
import Short from "./ShortList";
import "./Style.css";

function Cities(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(50);
  const [shortList, setShortlist] = useState([]);
  const [search, setSearch] = useState("");
  //  var [filterData, setFilter] = useState([]);

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/Short"), [history]);
  useEffect(() => {
    fetch("https://api.jsonbin.io/b/5f6f36127243cd7e824413e1")
      .then((response) => response.json())
      .then((output) => {
        var local = localStorage.getItem("state");

        if (local) {
          local = JSON.parse(local);
          setData([...local]);
          console.log("local", local);
        } else {
          setData(output);
          localStorage.setItem("state", JSON.stringify(output));
        }
      });

    var short = localStorage.getItem("short");

    if (short) {
      short = JSON.parse(short);
      setShortlist([...short]);
    }
  }, []);

  function remove(i) {
    console.log("i", i);
    var index = shortList.indexOf(i);
    shortList.splice(index, 1);
    var temp = [];
    temp = [...shortList];
    setShortlist([...temp]);
    localStorage.setItem("short", JSON.stringify(temp));
  }
  function select(i) {
    console.log("star", i);
    var temp = [...shortList, i];

    var short = localStorage.getItem("short");

    if (short) {
      setShortlist([...shortList, i]);
    } else {
      short = [];
    }
    setShortlist([...shortList, i]);
    localStorage.setItem("short", JSON.stringify(temp));
  }

  function Delete(i) {
    console.log("i", i);

    if (shortList.includes(i)) {
      var index = shortList.indexOf(i);
      shortList.splice(index, 1);
      var temp = [...shortList];
      setShortlist([...temp]);
      console.log("temp", temp);
      localStorage.setItem("short", JSON.stringify(temp));
    }
    data.splice(i, 1);
    setData([...data]);
    var temp = data;
    var state = localStorage.getItem("state");

    if (state) {
      state = JSON.parse(state);
    } else {
      state = [];
    }
    state = temp;
    //setData([...state]);
    console.log("state", state);
    localStorage.setItem("state", JSON.stringify(state));
  }

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUser = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  var filterData;
  if (search.length === 0) {
    filterData = currentUser.filter((item) => {
      var value = search.toLowerCase();
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(value)
      );
    });
  } else {
    filterData = data.filter((item) => {
      var value = search.toLowerCase();
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(value)
      );
    });
  }

  return (
    <div>
      <input
        type="text"
        id="myInput"
        value={search}
        placeholder="Search for Data.."
        title="Type in a name"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <h5 className="shortlist" onClick={handleOnClick}>
        List of Shotlisted Data
      </h5>
      <table id="customers">
        <tr>
          <th>State</th>
          <th>District</th>
          <th>City</th>
          <th>Action</th>
        </tr>
        {filterData.length > 0 ? (
          <>
            {filterData.map((data, id) => {
              return (
                <tr>
                  <td>{data.State}</td>
                  <td>{data.District}</td>
                  <td>{data.City}</td>
                  <td>
                    <img
                      src="https://img.icons8.com/android/24/000000/trash.png"
                      onClick={() => {
                        Delete(id);
                      }}
                      style={{ cursor: "pointer" }}
                    />

                    <span style={{ marginLeft: "20px" }}>
                      {shortList.includes(id) ? (
                        <img
                          src="https://img.icons8.com/fluent/48/000000/star.png"
                          onClick={() => {
                            remove(id);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/ios/36/000000/star.png"
                          onClick={() => {
                            select(id);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      )}

                      {/* <img src="https://img.icons8.com/ios/36/000000/star.png" /> */}
                    </span>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <h1 style={{ color: "red" }}>No Data Found</h1>
        )}
      </table>
      {filterData.length > 0 ? (
        <Pagination
          usersPerPage={usersPerPage}
          totalusers={data.length}
          paginate={paginate}
          data={currentPage}
        />
      ) : null}
    </div>
  );
}
export default Cities;
