// import { useEffect, useState } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import TableThree from '../../components/Tables/TableThree';
// import { BASE_URL } from '../../consts/const';
// import DefaultLayout from '../../layout/DefaultLayout';

// const DepositHistory = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchByTrns, setSearchByTrns] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState(searchByTrns);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/deposit-money/deposittedOnly?page=${currentPage}&limit=100`,
//         );
//         const data = await response.json();
//         setData(data.data);
//         setTotalPages(data.pagination.totalPages);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [currentPage, debouncedSearch]);

//   const handlePageNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePagePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchByTrns);
//     }, 500);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [searchByTrns]);

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Deposit History" />
//       <div className="w-full md:w-2/3 flex items-center">
//         <label className="input input-bordered focus:outline-none bg-slate-200 flex items-center gap-2 w-full">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Search by email of user"
//             value={searchByTrns}
//             onChange={(e) => setSearchByTrns(e.target.value)} 
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="w-4 h-4 opacity-70"
//           >
//             <path
//               fillRule="evenodd"
//               d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </label>
//       </div>
//       <TableThree
//         header1="Name"
//         header2="Email"
//         header3="Amount"
//         header4="Method"
//         header5="Acc. Number"
//         header6="Trns. ID"
//         header7="Status"
//         header8="Date"
//         data={data}
//         dataType="deposit"
//       />
//       <div className="join grid grid-cols-2 mt-5">
//         <button className="join-item btn btn-outline" onClick={handlePagePrev}>
//           Previous page
//         </button>
//         <button className="join-item btn btn-outline" onClick={handlePageNext}>
//           Next
//         </button>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default DepositHistory;


import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';
import { BASE_URL } from '../../consts/const';
import DefaultLayout from '../../layout/DefaultLayout';

const DepositHistory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchByTrns, setSearchByTrns] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchByTrns);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/deposit-money/deposittedOnly?page=${currentPage}&limit=100&search=${debouncedSearch}`, 
        );
        const data = await response.json();
        setData(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentPage, debouncedSearch]);

  const handlePageNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchByTrns);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchByTrns]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Deposit History" />
      <div className="w-full md:w-2/3 flex items-center mb-3">
        <label className="input input-bordered focus:outline-none bg-slate-200 flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search by transition ID"
            value={searchByTrns}
            onChange={(e) => setSearchByTrns(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p>No results found for "{debouncedSearch}"</p> 
      ) : (
        <TableThree
          header1="Name"
          header2="Email"
          header3="Amount"
          header4="Method"
          header5="Acc. Number"
          header6="Trns. ID"
          header7="Status"
          header8="Date"
          data={data}
          dataType="deposit"
        />
      )}

      <div className="join grid grid-cols-2 mt-5">
        <button
          className="join-item btn btn-outline"
          onClick={handlePagePrev}
          disabled={currentPage === 1} // Disable if on the first page
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={handlePageNext}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next
        </button>
      </div>
    </DefaultLayout>
  );
};

export default DepositHistory;
