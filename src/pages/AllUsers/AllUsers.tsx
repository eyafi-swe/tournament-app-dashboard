import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import { BASE_URL } from '../../consts/const';
import EditUserModal from '../../components/Modal/EditUserModal';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [toEditUserId, setToEditUserId] = useState<{}>({});
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        fetch(BASE_URL + '/users')
            .then(res => res.json())
            .then(data => {
                setAllUsers(data);
            })
            .catch(err => console.log(err))
    }, [refetch]);

    const setUserDetails = (name: string, email: string, wallet: any, id: string) => {
        setToEditUserId({ name, email, wallet, id });
    }

    return (
        <DefaultLayout>
            <TableThree
                header1='ID'
                header2='Name'
                header3='Email'
                header4='Balance(BDT)'
                header5='Matches Played'
                header6='Total Kill'
                header7='Total Earned'
                data={allUsers}
                dataType='users'
                onPressEdit={setUserDetails}
            />

            {
                toEditUserId && <EditUserModal setRefetch={setRefetch} setUser={setToEditUserId} user={toEditUserId} />
            }
        </DefaultLayout>
    );
};

export default AllUsers;