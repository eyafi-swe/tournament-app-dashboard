import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BASE_URL } from '../../consts/const';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [refetch, setRefetch] = React.useState<boolean>(false);
  const [homeData, setHomeData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [paymentNumbers, setPaymentNumbers] = React.useState<any>({});
  const [editPaymentNumbers, setEditPaymentNumbers] = React.useState<boolean>(false);

  useEffect(() => {
    fetch(BASE_URL + '/home')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHomeData(data);
        setPaymentNumbers(data.paymentNumbers[0]);
      });
  }, [refetch]);

  const handleSaveAccountNumbers = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bkash = form.bkash.value;
    const nagad = form.nagad.value;
    const rocket = form.rocket.value;
    const data = {
      bkash,
      nagad,
      rocket
    };

    fetch(BASE_URL + `/home/payment-numbers/${paymentNumbers._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setRefetch(!refetch);
          form.reset();
          setEditPaymentNumbers(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Something went wrong!');
      });
  }


  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Depositted" total={`${homeData.totalDepositted} BDT`} rate="" levelUp>
          <FaMoneyBill1Wave className="fill-primary dark:fill-white text-xl" />
        </CardDataStats>
        <CardDataStats title="Total Withdraw" total={`${homeData.totalWithdraw} BDT`} rate="" levelUp>
          <FaMoneyBillTrendUp className="fill-primary dark:fill-white text-xl" />
        </CardDataStats>
        <CardDataStats title="Total Users Wallet Balance" total={`${homeData.totalWallet} BDT`} rate="" levelUp>
          <RiMoneyDollarCircleFill className="fill-primary dark:fill-white text-2xl" />
        </CardDataStats>
        <CardDataStats title="Total Users" total={homeData.totalUsers} rate="" levelDown>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Bkash / Nagad / Rocket Accounts
              </h3>
            </div>
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSaveAccountNumbers}>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Bkash Account
                </label>
                <input
                  type="text"
                  name='bkash'
                  required
                  placeholder="Bkash Account Number"
                  defaultValue={editPaymentNumbers ? paymentNumbers?.bkash : ''}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Nagad Account
                </label>
                <input
                  type="text"
                  name='nagad'
                  required
                  placeholder="Nagad Account Number"
                  defaultValue={editPaymentNumbers ? paymentNumbers?.nagad : ''}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Rocket Account
                </label>
                <input
                  type="text"
                  name='rocket'
                  required
                  placeholder="Rocket Account Number"
                  defaultValue={editPaymentNumbers ? paymentNumbers?.rocket : ''}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>

              <input
                type="submit"
                value={`${loading ? 'Saving...' : 'Save'}`}
                className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 ${loading ? 'opacity-50 disabled' : ''}`}
              />

            </form>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-max">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Account Numbers
            </h3>

            <div>
              <div className=" mt-4">
                <p className="text-black dark:text-white">Bkash Account</p>
                <p className="text-black dark:text-white">{paymentNumbers?.bkash}</p>
              </div>
              <div className=" mt-4">
                <p className="text-black dark:text-white">Nagad Account</p>
                <p className="text-black dark:text-white">{paymentNumbers?.nagad}</p>
              </div>
              <div className=" mt-4">
                <p className="text-black dark:text-white">Rocket Account</p>
                <p className="text-black dark:text-white">{paymentNumbers?.rocket}</p>
              </div>
            </div>
            <button className='btn btn-success text-white font-bold mt-5 w-full' onClick={() => setEditPaymentNumbers(true)}>Edit</button>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
