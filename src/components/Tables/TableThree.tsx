import React from 'react';

interface TableThreeProps {
  header1: string;
  header2: string;
  header3: string;
  header4: string;
  header5: string;
  header6: string;
  header7: string;
  header8: string;
  data: Array<any>;
  dataType: string;
  onPressApprove?: (email: string, amount: any, id: string) => void;
  onPressDelete?: (id: string) => void;
  onPressEdit?: (name: string, email: string, wallet: any, id: string) => void;
}

const TableThree: React.FC<TableThreeProps> = ({
  header1,
  header2,
  header3,
  header4,
  header5,
  header6,
  header7,
  header8,
  data,
  dataType,
  onPressApprove,
  onPressDelete,
  onPressEdit,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto " style={{ height: '80vh' }}>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {header1}
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {header2}
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                {header3}
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                {header4}
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {header5}
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                {header6}
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                {header7}
              </th>
              {dataType == 'deposit' && (
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  {header8}
                </th>
              )}
              {(onPressApprove || onPressDelete || onPressEdit) && (
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {dataType === 'deposit'
              ? data.map((data, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {data.user_name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data.user_email}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data.amount}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-blue-600 font-semibold dark:text-white uppercase">
                        {data.method}
                      </p>
                    </td>
                    <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white xl:pl-11">
                        {data.accNumber}
                      </p>
                    </td>
                    <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white xl:pl-11">
                        {data.transactionId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          data.depositted
                            ? 'bg-success text-success'
                            : data.status === 'Unpaid'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {data.depositted ? 'Approved' : 'Pending'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <div>
                          <p className="text-black dark:text-white text-xs">
                            {data.requestedAt.split('T')[0]}
                          </p>
                          <p className="text-black dark:text-white text-xs">
                            {data.requestedAt.split('T')[1]}
                          </p>
                        </div>
                      </div>
                    </td>
                    {(onPressApprove || onPressDelete) && (
                      <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-col gap-2">
                        {onPressApprove && (
                          <button
                            className="btn btn-xs btn-success text-white w-max"
                            onClick={() =>
                              onPressApprove &&
                              onPressApprove(
                                data.user_email,
                                data.amount,
                                data._id,
                              )
                            }
                          >
                            Approve
                          </button>
                        )}

                        {onPressDelete && (
                          <button
                            className="btn btn-xs btn-warning text-white w-max"
                            onClick={() =>
                              onPressDelete && onPressDelete(data._id)
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              : dataType === 'withdraw'
              ? data.map((data, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{data?.user}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-red-600 font-semibold uppercase dark:text-white">
                        {data.accountType}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-blue-600 font-semibold dark:text-white uppercase">
                        {data.accountNumber}
                      </p>
                    </td>
                    <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white xl:pl-11">
                        {data.amount}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`uppercase text-xs inline-flex rounded-full bg-opacity-10 py-1 px-3 font-semibold ${
                          data.status == 'paid'
                            ? 'bg-success text-success'
                            : data.status === 'cancelled'
                            ? 'bg-danger text-danger'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {data.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <div>
                          <p className="text-black dark:text-white text-xs">
                            {data.date.split('T')[0]}
                          </p>
                          <p className="text-black dark:text-white text-xs">
                            {data.date.split('T')[1]}
                          </p>
                        </div>
                      </div>
                    </td>
                    {(onPressApprove || onPressDelete) && (
                      <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-col gap-2">
                        {onPressApprove && (
                          <button
                            className="btn btn-xs btn-success text-white w-max"
                            onClick={() =>
                              onPressApprove &&
                              onPressApprove(data.user, data.amount, data._id)
                            }
                          >
                            Refund
                          </button>
                        )}

                        {onPressDelete && (
                          <button
                            className="btn btn-xs btn-warning text-white w-max"
                            onClick={() =>
                              onPressDelete && onPressDelete(data._id)
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              : data.map((data, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white text-xs">
                        {data._id}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{data.name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{data.email}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-blue-600 font-semibold dark:text-white uppercase">
                        {data.wallet}
                      </p>
                    </td>
                    <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white xl:pl-11">
                        {data.matchPlayed}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {data.totalkill}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <div>
                          <p className="text-black dark:text-white text-xs">
                            {data.totalEarned}
                          </p>
                        </div>
                      </div>
                    </td>
                    {(onPressApprove || onPressDelete || onPressEdit) && (
                      <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark flex flex-col gap-2">
                        {onPressEdit && (
                          <label
                            htmlFor="my_modal_11"
                            className="btn btn-xs btn-success text-white w-max"
                            onClick={() =>
                              onPressEdit &&
                              onPressEdit(
                                data.name,
                                data.email,
                                data.wallet,
                                data._id,
                              )
                            }
                          >
                            Edit
                          </label>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
