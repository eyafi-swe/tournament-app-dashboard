import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';
import toast from 'react-hot-toast';

const DepositRequests = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${BASE_URL}/deposit-money?page=${currentPage}&limit=100`);
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
    }, [currentPage, refetch]);

    const handleApprove = async (email: string, amount: any, id: string) => {
        const url1 = BASE_URL + `/deposit-money/${id}`;
        const url2 = BASE_URL + `/users/deposit-wallet/${email}`;
        try {
            const [response1, response2] = await Promise.all([
                fetch(url1, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                }),
                fetch(url2, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ wallet: amount })
                })
            ]);

            const data1 = await response1.json();
            const data2 = await response2.json();
            // Process the fetched data here
            if (data1.success && data2.success) {
                toast.success('Deposit Approved');
            } else {
                console.error('Error:', data1, data2);
                toast.error('Deposit Approval Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Deposit Approval Failed');
        }
        finally {
            setRefetch(!refetch);
        }
    }

    const handleDelete = (id: string) => {
        fetch(BASE_URL + `/deposit-money/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    toast.success('Deposit Deleted');
                    setRefetch(!refetch);
                } else {
                    toast.error('Deposit Deletion Failed');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Deposit Deletion Failed');
            });
    }

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
            <Breadcrumb pageName="Deposit Requests" />
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
                onPressApprove={handleApprove}
                onPressDelete={handleDelete}
            />
            <div className="join grid grid-cols-2 mt-5">
                <button className="join-item btn btn-outline" onClick={handlePagePrev}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={handlePageNext}>Next</button>
            </div>
        </DefaultLayout>
    );
};

export default DepositRequests;