import React, { useState } from 'react';
import { BASE_URL } from '../../consts/const';
import toast from 'react-hot-toast';

interface AddCategoryModalProps {
    refetch: boolean,
    setRefetch: any,
    setVisibility: any
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    refetch,
    setRefetch,
    setVisibility
}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddCategory = (e: any) => {
        e.preventDefault()
        const form = e.target
        const categoryName = form.categoryName.value
        const imageurl = form.imageurl.value
        if (!categoryName) {
            setErrorMessage('Category Name is required!')
            return
        }
        if (!imageurl) {
            setErrorMessage('Image URL is required!')
            return
        }
        setLoading(true)
        fetch(`${BASE_URL}/contests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: categoryName, uri: imageurl })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('Category Added Successfully!')
                    setVisibility(false)
                    setRefetch(!refetch)
                } else {
                    toast.error('Failed to add category!')
                }
            })
            .catch(err => {
                (err)
            })
            .finally(() => {
                setLoading(false)
                form.reset()
                setErrorMessage('')

            })
    }
    return (
        <>
            <input type="checkbox" id="my_modal_1" className="modal-toggle" />
            <div className='modal modal-middle'>


                <div className="modal-box bg-white">
                    {/* <button className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">✕</button> */}
                    <div className='modal-action'>

                        <label htmlFor="my_modal_1" className="btn btn-sm btn-circle btn-accent absolute right-2 top-2" onClick={() => { }}>✕</label>
                    </div>
                    <form className='' onSubmit={handleAddCategory}>
                        <h3 className="font-semibold">Enter Category Name</h3>
                        <input type="text" name='categoryName' placeholder="Type here" className="input focus:outline-none mt-1 input-bordered bg-slate-100 w-full " />
                        <h3 className="font-semibold mt-2">Enter Image URL</h3>
                        <textarea name='imageurl' className="textarea bg-slate-100 focus:outline-none w-full" placeholder="Image URL"></textarea>
                        <p className='text-red-500 text-sm'>{errorMessage}</p>
                        <button className={`btn btn-md text-white btn-accent mt-5 w-full ${loading ? 'loading-dots' : ''}`}>Save</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCategoryModal;