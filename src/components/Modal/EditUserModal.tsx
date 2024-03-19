import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../consts/const';

interface EditUserModalProps {
    setRefetch: any;
    setUser: any;
    user: any;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ setRefetch, setUser, user }) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const handleUpdate = (e: any) => {
        e.preventDefault()
        const payload = {
            wallet: parseInt(e.target.wallet.value),
        }

        setLoading(true)
        fetch(BASE_URL + `/users/wallet-update-by-admin/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    toast.success('Wallet updated successfully')
                    setRefetch((prev: boolean) => !prev)
                    setUser("")
                } else {
                    setErrorMessage(data.message)
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage('Something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })

    }


    return (
        <>
            <input type="checkbox" id="my_modal_11" className="modal-toggle" />
            <div className='modal'>


                <div className="modal-box bg-white">
                    {/* <button className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</button> */}
                    <div className='modal-action'>

                        <label htmlFor="my_modal_11" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2" onClick={() => setUser("")}>✕</label>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <h3 className="font-semibold text-center">Update Wallet</h3>

                        <div className="form-control mt-2">
                            <h3 className="font-semibold">Name</h3>
                            <input type="text" defaultValue={user?.name} name='name' disabled placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered disabled:bg-slate-100 w-full disabled:text-black " />

                            <h3 className="font-semibold">Email</h3>
                            <input type="text" defaultValue={user?.email} name='email' disabled placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered disabled:bg-slate-100 w-full disabled:text-black " />
                            <h3 className="font-semibold">Wallet</h3>
                            <input type="text" defaultValue={user?.wallet} name='wallet' placeholder="Type here" className="input input-sm focus:outline-none mt-1 input-bordered bg-slate-100 w-full text-black " />

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

export default EditUserModal;