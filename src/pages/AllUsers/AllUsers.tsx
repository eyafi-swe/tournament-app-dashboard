import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableThree from '../../components/Tables/TableThree';
import { BASE_URL } from '../../consts/const';
import EditUserModal from '../../components/Modal/EditUserModal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [toEditUserId, setToEditUserId] = useState<{}>({});
    const [refetch, setRefetch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [walletSearchInput, setWalletSearchInput] = useState('');
    const [walletSearch, setWalletSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/users?page=${currentPage}&limit=100&email=${search}&range=${range}&wallet=${walletSearch}`);
                const data = await response.json();
                console.log(data);
                setAllUsers(data.data);
                setTotalPages(data.pagination.totalPages);
            } catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage, refetch, search, range, walletSearch]);

    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearch('');
        }
    }, [searchInput]);

    useEffect(() => {
        if (walletSearchInput.trim() === '') {
            setWalletSearch('');
        }
    }, [walletSearchInput]);

    const handleSearchInput = () => {
        if (searchInput.trim() === '') {
            return;
        }
        setCurrentPage(1);
        setSearch(searchInput);
    };

    const handleWalletSearchInput = () => {
        console.log(walletSearchInput);
        if (walletSearchInput.trim() === '') {
            return;
        }
        setCurrentPage(1);
        setRange('');
        setWalletSearch(walletSearchInput);
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

    const setUserDetails = (name: string, email: string, wallet: any, id: string) => {
        setToEditUserId({ name, email, wallet, id });
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="All App Users" />
            <div className="mb-5 flex-col md:flex-row flex items-center w-full gap-5 ">
                <div className='w-full md:w-2/3 flex items-center'>
                    <label className="input input-bordered focus:outline-none bg-slate-200 flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="Search by email of user" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    <button className='btn btn-warning' onClick={handleSearchInput}>Search</button>
                </div>
                <div className="w-full md:w-1/3 flex items-center">
                    <label className="input input-bordered focus:outline-none bg-slate-200 flex items-center gap-2 w-full">
                        <input type="text" className="grow" placeholder="Search by wallet" value={walletSearchInput} onChange={(e) => setWalletSearchInput(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    <button className='btn btn-warning' onClick={handleWalletSearchInput}>Search</button>
                </div>
            </div>
            <p className='text-sky-600 text-lg font-semibold'>Filter by wallet</p>
            <div className='my-5 flex items-center flex-wrap gap-10'>

                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={"0,100"} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>0-100 BDT</label>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={"100,500"} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>100-500 BDT</label>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={"500,1500"} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>500-1500 BDT</label>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={"1500,3000"} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>1500-3000 BDT</label>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={"3000,5000"} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>3000-5000 BDT</label>
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <input type="radio" name="range" value={5000} className="radio radio-info" onChange={(e) => {
                        setRange(e.target.value)
                        setCurrentPage(1)
                    }} />
                    <label className='text-lg font-semibold text-sky-500'>{'>'} 5000 BDT</label>
                </div>
            </div>

            {
                loading ? <div className='flex justify-center items-center h-[40vh]'><progress className="progress w-56"></progress></div> :
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
            }
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