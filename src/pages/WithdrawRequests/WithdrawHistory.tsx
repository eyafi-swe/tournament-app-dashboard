import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';

const WithdrawHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL + '/withdraw/refunded-cancelled')
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
    }, []);





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
        </DefaultLayout>
    );
};

export default WithdrawHistory;