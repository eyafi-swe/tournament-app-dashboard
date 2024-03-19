import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../consts/const';

interface AddMatchModalProps {
    categories: Array<any>,
    setOpenAddMatchModal: any,
    refetch: boolean,
    setRefetch: any
}

const AddMatchModal: React.FC<AddMatchModalProps> = ({ categories, setOpenAddMatchModal, refetch, setRefetch }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddMatch = (e: any) => {
        e.preventDefault()
        setLoading(true)
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

        const data = {
            parent_id: form.category.value,
            title: form.title.value,
            joinFee: parseInt(form.joinFee.value),
            prize: parseInt(form.prizemoney.value),
            date: form.date.value,
            time: form.time.value,
            type: form.type.value,
            map: form.map.value,
            per_kill: parseInt(form.perkill.value),
            roomId: form.roomid.value,
            passcode: form.passcode.value,
            prize_pole: prizePole
        }

        fetch(`${BASE_URL}/contests/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {

                    toast.success(data.message)
                    form.reset()
                    setOpenAddMatchModal(false)
                    setRefetch(!refetch)
                } else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                toast.error(err.message)
            })
            .finally(() => setLoading(false))



    }



    return (
        <>
            <input type="checkbox" id="my_modal_5" className="modal-toggle" />
            <div className='modal modal-middle'>


                <div className="modal-box bg-white">
                    {/* <button className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</button> */}
                    <div className='modal-action'>

                        <label htmlFor="my_modal_5" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2" onClick={() => { }}>✕</label>
                    </div>
                    <form onSubmit={handleAddMatch}>
                        <h3 className='font-semibold'>Match Category</h3>
                        <select name='category' className="select bg-slate-100 w-full select-sm focus:outline-none">
                            <option selected value={categories[0]._id}>{categories[0].title}</option>
                            {categories.slice(1).map((category: any) => (
                                <option value={category._id} key={category._id} className='text-black'>{category.title}</option>
                            ))}
                        </select>
                        <h3 className="font-semibold">Title</h3>
                        <input type="text" name='title' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Join Fee</h3>
                        <input type="text" name='joinFee' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Prize Money</h3>
                        <input type="text" name='prizemoney' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Date</h3>
                        <input type="text" name='date' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Time</h3>
                        <input type="text" name='time' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Type</h3>
                        <input type="text" name='type' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Map</h3>
                        <input type="text" name='map' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Per Kill</h3>
                        <input type="text" name='perkill' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Room ID</h3>
                        <input type="text" name='roomid' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />
                        <h3 className="font-semibold">Pass Code</h3>
                        <input type="text" name='passcode' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />


                        <h3 className='font-semibold text-center mt-2'>Prize Pole</h3>

                        <h3 className="font-semibold">Winner</h3>
                        <input type="text" name='winner' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Second</h3>
                        <input type="text" name='secondplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Third</h3>
                        <input type="text" name='thirdplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Fourth</h3>
                        <input type="text" name='fourthplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Fifth</h3>
                        <input type="text" name='fifthplace' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Per Kill</h3>
                        <input type="text" name='perkillwinner' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <h3 className="font-semibold">Total</h3>
                        <input type="text" name='total' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-200 w-full " />

                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                        <button className={`btn btn-md text-white btn-accent mt-5 w-full ${loading ? 'loading-spinner' : ''}`}>Save</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddMatchModal;