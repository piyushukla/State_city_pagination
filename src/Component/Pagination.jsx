import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ usersPerPage, totalusers, paginate, data }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalusers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{ float: "right", position: "relative", marginTop: "10px" }}
      className="pagination"
    >
      <nav>
        <ul className="pagination" style={{ alignContent: "center" }}>
          <li>
            <Button
              onClick={() => paginate(data - 1)}
              className="btn btn-primary"
              style={{ marginRight: "20px" }}
              disabled={data === 1 ? true : false}
            >
              Prev
            </Button>
          </li>
          <li key={data}>
            <Button
              onClick={() => paginate(data + 1)}
              className="btn btn-primary"
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
