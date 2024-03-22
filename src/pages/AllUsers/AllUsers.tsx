import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import { BASE_URL } from '../../consts/const';
import EditUserModal from '../../components/Modal/EditUserModal';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [toEditUserId, setToEditUserId] = useState<{}>({});
    const [refetch, setRefetch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users?page=${currentPage}&limit=100`);
                const data = await response.json();
                console.log(data);
                setAllUsers(data.data);
                setTotalPages(data.pagination.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [currentPage, refetch]);

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
            <div className="join grid grid-cols-2 mt-5">
                <button className="join-item btn btn-outline" onClick={handlePagePrev}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={handlePageNext}>Next</button>
            </div>

            {
                toEditUserId && <EditUserModal setRefetch={setRefetch} setUser={setToEditUserId} user={toEditUserId} />
            }
        </DefaultLayout>
    );
};

export default AllUsers;