import { useEffect, useState } from 'react';
import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { BASE_URL } from '../../consts/const';

const DepositHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL + '/deposit-money/deposittedOnly')
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
            <Breadcrumb pageName="Deposit History" />
            <TableThree
                header1='Name'
                header2='Email'
                header3='Amount'
                header4='Method'
                header5='Transaction ID'
                header6='Status'
                header7='Date'
                data={data}
                dataType='deposit'
            />
        </DefaultLayout>
    );
};

export default DepositHistory;