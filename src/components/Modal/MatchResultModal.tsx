import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../consts/const';

interface MatchResultModalProps {
    setRefetch: any,
    refetch: boolean,
    match: any,
    setMatch: any,
    user: any
}

const MatchResultModal: React.FC<MatchResultModalProps> = ({ setRefetch, refetch, match, setMatch, user }) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({
        position: '',
        kills: '',
        rewardMoney: ''
    })

    const handleUpdateResult = (e: any) => {
        e.preventDefault()
        const payload = {
            matchTitle: match.title,
            matchId: match.matchId,
            matchDate: match.date,
            matchTime: match.time,
            user_email: user.user_email,
            game_uid: user.game_uid,
            position: parseInt(e.target.position.value),
            kills: parseInt(e.target.totalKills.value),
            rewardMoney: parseInt(e.target.rewardMoney.value)
        }

        console.log(payload)
        setLoading(true)
        fetch(`${BASE_URL}/contestResult`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    toast.success('Result added successfully')
                    setRefetch(!refetch)
                    setMatch(null)
                } else {
                    setErrorMessage(data.message)
                }
            }).catch(err => {
                console.log(err)
                setErrorMessage('Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })

    }

    const returnJoinedMatchPlayers = (players: any) => {
        let joinedPlayers = []
        for (let player in players) {
            joinedPlayers.push(players[player])
        }
        return joinedPlayers
    }

    return (
        <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className='modal'>


                <div className="modal-box bg-white">
                    {/* <button className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</button> */}
                    <div className='modal-action'>

                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2" onClick={() => setMatch(null)}>✕</label>
                    </div>
                    <form onSubmit={handleUpdateResult}>
                        <h3 className="font-semibold">Match Result</h3>

                        <div className="form-control mt-2">
                            <h3 className="font-semibold">Title</h3>
                            <input type="text" defaultValue={match.title} name='title' disabled placeholder="Type here" className="input input-sm focus:outline-none mt-1  disabled:border disabled:border-slate-100 disabled:bg-slate-100 disabled:text-black w-full " />
                            <hr className='mt-2' />
                            <h3 className="font-semibold">User</h3>
                            <input type="text" defaultValue={user.user_email} name='user_email' disabled placeholder="Type here" className="input input-sm focus:outline-none mt-1 disabled:border disabled:border-slate-100 disabled:bg-slate-100 disabled:text-black w-full " />
                            <h3 className="font-semibold">Game ID</h3>
                            <input type="text" defaultValue={returnJoinedMatchPlayers(user?.game_uid).map((uid, index) => uid)} name='game_uid' disabled placeholder="Type here" className="input input-sm focus:outline-none mt-1  disabled:border disabled:border-slate-100 disabled:bg-slate-100 disabled:text-black w-full " />
                            <h3 className="font-semibold">Position</h3>
                            <input type="text" name='position' defaultValue={result.position} placeholder="Position" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " required />
                            <h3 className="font-semibold">Total Kills</h3>
                            <input type="text" defaultValue={result.kills} name='totalKills' placeholder="Kills" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full "
                                required
                            />
                            <h3 className="font-semibold">Reward Money</h3>
                            <input type="text" defaultValue={result.rewardMoney} name='rewardMoney' placeholder="Reward Money" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full "
                                required
                            />
                        </div>

                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                        <button className={`btn btn-md text-white btn-accent mt-5 w-full ${loading ? 'cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Wait...' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>
            {/* </dialog> */}
        </>
    );
};

export default MatchResultModal;