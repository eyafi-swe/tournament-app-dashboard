import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';

const WithdrawHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${BASE_URL}/withdraw/refunded-cancelled?page=${currentPage}&limit=100`);
                const data = await response.json();
                console.log(data);
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
            <Breadcrumb pageName="Withdraw History" />
            <TableThree
                header1='SL'
                header2='User'
                header3='Account'
                header4='Acc. Number'
                header5='Amount'
                header6='Status'
                header7='Date'
                data={data}
                dataType='withdraw'
            />
            <div className="join grid grid-cols-2 mt-5">
                <button className="join-item btn btn-outline" onClick={handlePagePrev}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={handlePageNext}>Next</button>
            </div>
        </DefaultLayout>
    );
};

export default WithdrawHistory;