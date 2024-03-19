import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';
import toast from 'react-hot-toast';

const WithdrawRequests = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL + '/withdraw')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refetch]);

    const handleRefund = async (email: string, amount: any, id: string) => {
        fetch(BASE_URL + `/withdraw/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    toast.success('Withdraw Approved');
                    setRefetch(!refetch);
                } else {
                    toast.error('Withdraw Approval Failed');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Withdraw Approval Failed');
            });
    }

    const handleCancel = (id: string) => {
        fetch(BASE_URL + `/withdraw/cancel/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    toast.success('Withdraw Canceled');
                    setRefetch(!refetch);
                } else {
                    toast.error('Withdraw Cancel Failed');
                }
            })
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Withdraw Requests" />
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
                onPressApprove={handleRefund}
                onPressDelete={handleCancel}
            />
        </DefaultLayout>
    );
};

export default WithdrawRequests;