import { useEffect, useState } from "react";
import { BASE_URL } from "../../consts/const";
import TableTwo from "../../components/Tables/TableTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";
import Loader from "../../common/MiniLoader/Loader";
import AddMatchModal from "../../components/Modal/AddMatchModal";
import AddCategoryModal from "../../components/Modal/AddCategoryModal";
import MatchResultModal from "../../components/Modal/MatchResultModal";
import EditMatchModal from "../../components/Modal/EditMatchModal";

const Tournaments = () => {
    const [matchCAtegories, setMatchCategories] = useState<any[]>([])
    const [refetch, setRefetch] = useState<boolean>(false)
    const [allMatches, setAllMatches] = useState<any[]>([])
    const [allMatchesLoading, setAllMatchesLoading] = useState<boolean>(false)
    const [refetchEdited, setRefetchEdited] = useState<boolean>(false)
    const [refetchId, setRefetchId] = useState<string>('')
    const [clickedCategory, setClickedCategory] = useState<any>('')
    const [openAddMatchModal, setOpenAddMatchModal] = useState<boolean>(false)
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState<boolean>(false)
    const [editMatchInfo, setEditMatchInfo] = useState<any>({})
    const [resultMatch, setresultMatch] = useState<any>({})
    const [resultUser, setresultUser] = useState<any>({})
    const [openResultModal, setOpenResultModal] = useState<boolean>(false)


    useEffect(() => {
        fetch(BASE_URL + "/contests")
            .then(res => res.json())
            .then(data => {
                setMatchCategories(data)
            })
    }, [refetch])

    const handleDeleteCategory = (id: string, title: string) => {
        if (title == 'Starting Soon') {
            toast.error('You cannot delete this category')
            return
        }

        fetch(`${BASE_URL}/contests/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('Category Deleted Successfully!')
                }
                else {
                    toast.error('Category Deletion Failed! Try Again Later!')
                }
            })
            .catch(err => {
                toast.error('Category Deletion Failed! Try Again Later!')
            })
            .finally(() => {
                setRefetch(!refetch)
            })
    }


    useEffect(() => {

        const ftechCategorizedMatches = (id: string) => {
            setAllMatchesLoading(true)

            fetch(`${BASE_URL}/contests/matches/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAllMatches(data)
                })
                .catch(err => (err))
                .finally(() => setAllMatchesLoading(false))
        }

        ftechCategorizedMatches(refetchId)
    }, [refetchEdited, refetchId])


    const handleDeleteMatch = (id: string) => {
        fetch(`${BASE_URL}/contests/match/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {

                    toast.success('Match Deleted Successfully!')
                    setRefetchEdited(!refetchEdited)
                } else {
                    toast.error('Match Deletion Failed! Try Again Later!')
                }
            })
            .catch(err => (err))
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tournaments" />
            <TableTwo
                title="Tournament Categories"
                header1="SL"
                header2="Category Name"
                data={matchCAtegories}
                action="Delete"
                onPressAction={handleDeleteCategory}
                onPressItem={setRefetchId}
                onPressItem2={setClickedCategory}
            />
            <div className="mt-2">
                <label
                    htmlFor="my_modal_1"
                    className='mt-1 mb-5 text-blue-500 cursor-pointer text-xl font-semibold'
                    onClick={() => setOpenAddCategoryModal(true)}
                >+ Add Tournament Category</label>
            </div>

            <div className='mt-5'>
                <div className='mb-5 flex justify-center items-center gap-5'>
                    <h1 className='text-center text-2xl font-semibold'>Matches {allMatches.length}</h1>
                    <label htmlFor="my_modal_5" className='bg-green-500 p-2 font-semibold rounded-md text-white cursor-pointer' onClick={() => {
                        setOpenAddMatchModal(true)
                    }}>+ Add Match</label>
                </div>
                {
                    clickedCategory && <h1 className='text-center text-2xl font-semibold mb-2 text-green-500'>{clickedCategory}</h1>
                }
                {
                    allMatchesLoading && <Loader />
                }
                {
                    allMatches.length == 0 && <p className='text-center'>No Matches Found!</p>
                }
                <div className='grid md:grid-cols-2 gap-5'>
                    {
                        allMatches.length > 0 &&
                        allMatches?.map((match, index) => {
                            return (
                                <div className='bg-slate-200 p-3 mb-5 rounded-md' key={index}>
                                    <div className='grid grid-cols-3 gap-3'>

                                        <p className='font-semibold'>Title: {match.title}</p>
                                        <p className='font-semibold'>Join Fee: {match.joinFee}BDT</p>
                                        <p className='font-semibold'>Prize: {match.prize}BDT</p>
                                        <p className='font-semibold'>Date: {match.date}</p>
                                        <p className='font-semibold'>Time: {match.time}</p>
                                        <p className='font-semibold'>Type: {match.type}</p>
                                        <p className='font-semibold'>Map: {match.map}</p>
                                        <p className='font-semibold'>Per Kill: {match.per_kill}</p>
                                        <p className='font-semibold'>Room ID: {match.roomId}</p>
                                        <p className='font-semibold'>Passcode: {match.passcode}</p>
                                        {/* <input type="text" defaultValue={match?.passcode} placeholder="Type here" className="input focus:outline-none input-bordered input-accent w-full " /> */}

                                    </div>
                                    <div className='flex justify-center gap-3'>

                                        <label htmlFor="my_modal_4" className='mt-5 btn btn-accent btn-sm text-white' onClick={() => {
                                            setEditMatchInfo(match)
                                        }}>Edit</label>
                                        <button className='mt-5 btn btn-warning btn-sm text-white'
                                            onClick={() => {
                                                handleDeleteMatch(match._id)

                                            }}
                                        >Delete</button>

                                    </div>
                                    <p className='mt-3 text-center font-semibold'>Joined Players</p>
                                    <div className="overflow-x-auto mt-3 max-h-64">
                                        <table className="table table-xs">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Email</th>
                                                    <th>Game UID/Name</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    !match?.joined ? <tr><td className='text-center'>No player joined!</td></tr> :
                                                        match?.joined?.map((player: any, index: number) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th>{index + 1}</th>
                                                                    <td>{player?.user_email}</td>
                                                                    <td>{player?.game_uid}</td>
                                                                    <td>
                                                                        <label htmlFor="my_modal_6" className=' btn btn-success btn-xs text-white' onClick={() => {
                                                                            setresultMatch({ matchId: match._id, title: match.title, time: match.time, date: match.date })
                                                                            setresultUser(player)
                                                                        }}>Result</label>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })

                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th>Email</th>
                                                    <th>Game UID/Name</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </div>


            {
                openAddMatchModal && <AddMatchModal refetch={refetchEdited} setRefetch={setRefetchEdited} categories={matchCAtegories} setOpenAddMatchModal={setOpenAddMatchModal} />
            }
            {
                openAddCategoryModal && <AddCategoryModal refetch={refetch} setRefetch={setRefetch} setVisibility={setOpenAddCategoryModal} />
            }
            {
                (resultMatch && resultUser) && <MatchResultModal user={resultUser} setRefetch={setRefetchEdited} refetch={refetchEdited} match={resultMatch} setMatch={setresultMatch} />
            }
            {
                editMatchInfo && <EditMatchModal setRefetch={setRefetchEdited} refetch={refetchEdited} matchInfo={editMatchInfo} setMatchInfo={setEditMatchInfo} />
            }
        </DefaultLayout>
    );
};

export default Tournaments;