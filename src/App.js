import "./App.css";

import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://fe-test.dev.rampnow.io:8000/api/books?page=1&limit=${limit}`);
        const data = await res.json();
        const total = data.count;
        setpageCount(Math.ceil(total / limit));
        setItems(data);
        console.log("Data loaded:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      // `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
      `http://fe-test.dev.rampnow.io:8000/api/books?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
    console.log(items);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  return (
    <div className="container">
      <div className="row m-4 ">
        <table>
          <thead >
            <tr >
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Country</th>
              <th>Language</th>
              <th>Link</th>
              <th>Pages</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {items.data && items.data.length > 0 && items.data.map((item) => (
              <tr key={item.id} style={{ backgroundColor: item.id % 2 === 0 ? '' : 'gray' }}>
                <td className="item">{item.id + 1}</td>
                <td className="item">{item.title}</td>
                <td className="item">{item.author}</td>
                <td className="item">{item.country}</td>
                <td className="item">{item.language}</td>
                <td className="item">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                </td>
                <td className="item">{item.pages}</td>
                <td className="item">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
