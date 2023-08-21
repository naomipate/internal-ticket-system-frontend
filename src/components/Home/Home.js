import React, { useState, useEffect } from "react";
import { getCollection } from "../common/API/API";
import { getAllTickets } from "../common/API/API";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  PaginationContext,
  // AlertContext,
  SearchContext,
} from "../common/context/context";

import Overlay from "../common/overlay/Overlay";
import TableUnit from "../common/TableUnit/TableUnit";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../common/SearchBar/SearchBar";

function Home() {
  const navigate = useNavigate();
  //Handle Pagination
  //const [lastAction, setLastAction] = useState([]);
  const [isSearching, setIsSearching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [lastIndex, setLastIndex] = useState(1);
  const [firstIndex, setFirstIndex] = useState(1);

  console.log(searchParams);
  console.log(searchParams.size);
  console.log(searchParams.get("page"));
  console.log(searchParams.get("limit"));
  useEffect(() => {}, [isSearching]);

  async function checkPagination() {
    if (searchParams.size === 0 || searchParams.size === 1) {
      searchParams.set("page", 1);
      searchParams.set("limit", 20);

      // console.log(searchParams.get("page"));
      // console.log(searchParams.get("limit"));
    }
  }

  const [ticketArray, setTicketArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const paginationContextValue = {
    currentPage,
    searchParams,
    setCurrentPage,
    setIsNextPage,
  };

  const searchBarContextValue = {
    searchTerm,
    searchResults,
    setSearchResults,
    setSearchTerm,
    setIsSearching,
  };

  useEffect(() => {
    checkPagination();
    const fetchTicket = async () => {
      try {
        const response = await getAllTickets();

        setTicketArray(response.data);
        if (isNextPage) {
          grabTopTen(lastIndex);
        } else {
          if (firstIndex <= 1) {
            grabTopTen();
            setCurrentPage(1);
          } else {
            grabTopTen(firstIndex);
          }
        }
      } catch (error) {
        navigate("/404");
      }
    };

    fetchTicket();
  }, []);

  //checkPagination();
  //fetchData();
  //console.log(topTwenty);
  // if (isNextPage) {
  //   grabTopTen(lastIndex);
  // } else {
  //   if (firstIndex <= 1) {
  //     grabTopTen();
  //     setCurrentPage(1);
  //   } else {
  //     grabTopTen(firstIndex);
  //   }
  // }
  //   }, [currentPage]);

  async function grabTopTen(page = 1, limit = 20) {
    try {
      setIsLoading(true);
      let result = await getCollection(page, limit);
      console.log(result.data);
      const response = result.data;
      const lastItem = response[response.length - 1];
      const firstItem = response[0];
      setLastIndex(Number(lastItem.id));
      setFirstIndex(Number(firstItem.id) - 20);
      //console.log(lastItem);

      setTicketArray(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  /*
  function handleOperations(options) {
    let localData = ticketArray;
    if (options === "ASC") {
      localData = ticketArray.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        return 0;
      });
    } else if (options === "DESC") {
      localData = ticketArray.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameB > nameA) {
          return 1;
        }
        if (nameB < nameA) {
          return -1;
        }
        return 0;
      });
    }
    console.log(localData)
    setTicketArray(localData);
  }*/
  return (
    <div className="container">
      <br />
      <div className="container">
        <SearchContext.Provider value={searchBarContextValue}>
          <SearchBar />
        </SearchContext.Provider>
        <br />
        {isSearching ? (
          <div className="container">
            <h3>Search Results: {searchResults.length}</h3>

            <table className="table table-bordered table-hover table-dark">
              <thead>
                <tr className="text-center">
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(({ title, id, date }, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-center"
                      onClick={() => navigate(`/${id}`)}
                    >
                      <td>{title}</td>
                      <td>{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
      <br />
      <Overlay isLoading={isLoading}>
        <div className="container">
          <br />
          {/* <div className="btn-group">
            <button
              className="btn btn-danger"
              onClick={() => handleOperations("ASC")}
            >
              Ascending
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleOperations("DESC")}
            >
              Descending
            </button>
          </div> */}
          <br />

          <br />
          <table className="table table-bordered table-dark table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Priority</th>
                <th scope="col">Assigned</th>
                <th scope="col">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {ticketArray.map(
                (
                  { date, id, title, priority, assigned, resolution },
                  index
                ) => {
                  return (
                    <TableUnit
                      key={index}
                      id={id}
                      date={date}
                      title={title}
                      priority={priority}
                      assigned={assigned}
                      resolution={resolution}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </Overlay>
      <PaginationContext.Provider value={paginationContextValue}>
        <Pagination />
      </PaginationContext.Provider>
    </div>
  );
}

export default Home;
