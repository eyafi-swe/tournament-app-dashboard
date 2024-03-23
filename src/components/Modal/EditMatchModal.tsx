import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../consts/const';

interface EditMatchModalProps {
    setRefetch: any,
    refetch: boolean,
    matchInfo: any,
    setMatchInfo: any
}

const matchTypes = ['solo', 'duo', 'squad']

const EditMatchModal: React.FC<EditMatchModalProps> = ({ setRefetch, refetch, matchInfo, setMatchInfo }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    function tConvert(time: any) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join('');
    }


    const handleEditMatch = (e: any) => {
        e.preventDefault()

        const form = e.target
        const prizePole = [
            {
                place: 'Winner',
                prize: parseInt(form.winner.value)
            },
            {
                place: 'Second Place',
                prize: parseInt(form.secondplace.value)
            },
            {
                place: 'Third Place',
                prize: parseInt(form.thirdplace.value)
            },
            {
                place: 'Fourth Place',
                prize: parseInt(form.fourthplace.value)
            },
            {
                place: 'Fifth Place',
                prize: parseInt(form.fifthplace.value)
            },
            {
                place: 'Per Kill',
                prize: parseInt(form.perkillwinner.value)
            },
            {
                place: 'Total',
                prize: parseInt(form.total.value)
            }
        ]

        const time = tConvert(form.time.value)
        console.log(time)
        const data = {
            title: form.title.value,
            joinFee: parseInt(form.joinFee.value),
            prize: parseInt(form.prizemoney.value),
            date: form.date.value,
            time: time,
            type: form.type.value,
            slot: +(form.slot.value),
            map: form.map.value,
            per_kill: parseInt(form.perkill.value),
            roomId: form.roomid.value,
            passcode: form.passcode.value,
            prize_pole: prizePole
        }
        console.log(data)
        fetch(`${BASE_URL}/contests/matches/${matchInfo._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    toast.success('Match Updated Successfully')
                    setMatchInfo(null)
                    setRefetch(!refetch)
                } else {
                    toast.error('Something went wrong')
                }

            })
            .catch(err => {
                console.log(err)
            })


    }

    const getMatchTypes = () => {
        return matchTypes.filter((type) => type !== matchInfo.type)
    }

    return (
        <>
            <input type="checkbox" id="my_modal_4" className="modal-toggle" />
            <div className='modal'>


                <div className="modal-box bg-white">
                    {/* <button className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</button> */}
                    <div className='modal-action'>

                        <label htmlFor="my_modal_4" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2" onClick={() => setMatchInfo(null)}>✕</label>
                    </div>
                    <form onSubmit={handleEditMatch}>
                        <h3 className="font-semibold">Title</h3>
                        <input type="text" required defaultValue={matchInfo.title} name='title' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Join Fee</h3>
                        <input type="text" required defaultValue={matchInfo.joinFee} name='joinFee' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Prize Money</h3>
                        <input type="text" required defaultValue={matchInfo.prize} name='prizemoney' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Date</h3>
                        <input type="date" required defaultValue={matchInfo.date} name='date' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Time</h3>
                        <input type="time" required defaultValue={matchInfo.time} name='time' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Type</h3>
                        <select name='type' className="select bg-slate-100 w-full select-sm focus:outline-none">
                            <option selected value={matchInfo.type}>{matchInfo.type?.toUpperCase()}</option>

                            {
                                getMatchTypes().map((type, index) => (
                                    <option value={type} key={index} className='text-black'>{type?.toUpperCase()}</option>
                                ))
                            }

                        </select>

                        <h3 className="font-semibold">Slot</h3>
                        <input type="text" required defaultValue={matchInfo?.slot} name='slot' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Map</h3>
                        <input type="text" required defaultValue={matchInfo.map} name='map' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Per Kill</h3>
                        <input type="text" required defaultValue={matchInfo.per_kill} name='perkill' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Room ID</h3>
                        <input type="text" required defaultValue={matchInfo.roomId} name='roomid' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold">Pass Code</h3>
                        <input type="text" required defaultValue={matchInfo.passcode} name='passcode' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />


                        <h3 className='font-semibold text-center mt-2'>Prize Pole</h3>

                        <h3 className="font-semibold">Winner</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[0]?.prize : ''} name='winner' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Second</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[1]?.prize : ''} name='secondplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Third</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[2]?.prize : ''} name='thirdplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Fourth</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[3]?.prize : ''} name='fourthplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Fifth</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[4]?.prize : ''} name='fifthplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Per Kill</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[5]?.prize : ''} name='perkillwinner' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <h3 className="font-semibold">Total</h3>
                        <input type="text" required defaultValue={matchInfo?.prize_pole ? matchInfo?.prize_pole[6]?.prize : ''} name='total' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />

                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                        <button className={`btn btn-md text-white btn-accent mt-5 w-full ${loading ? 'loading loading-dots' : ''}`}>Save</button>
                    </form>
                </div>
            </div>
            {/* </dialog> */}
        </>
    );
};

export default EditMatchModal;