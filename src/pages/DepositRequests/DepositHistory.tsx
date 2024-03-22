import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';

const DepositHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${BASE_URL}/deposit-money/deposittedOnly?page=${currentPage}&limit=100`);
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
    }, [currentPage]);



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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Deposit History" />
            <TableThree
                header1='Name'
                header2='Email'
                header3='Amount'
                header4='Method'
                header5='Acc. Number'
                header6='Status'
                header7='Date'
                data={data}
                dataType='deposit'
            />
            <div className="join grid grid-cols-2 mt-5">
                <button className="join-item btn btn-outline" onClick={handlePagePrev}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={handlePageNext}>Next</button>
            </div>
        </DefaultLayout>
    );
};

export default DepositHistory;