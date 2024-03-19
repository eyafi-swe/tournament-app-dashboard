interface tableDataTypes {
  title: string,
  header1: string,
  header2: string,
  header3: string,
  header4: string,
  data: Array<any>,
  action: string
  onPress: (email: string) => void
};

const TableOne: React.FC<tableDataTypes> = ({
  title,
  header1,
  header2,
  header3,
  header4,
  data,
  action,
  onPress
}) => {
  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-96">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {header1}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {header2}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {header3}
            </h5>
          </div>
          <div className=" p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {header4}
            </h5>
          </div>
        </div>

        {data.map((item, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-4 ${key === data.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className=" text-meta-3 dark:text-white sm:block">
                {item.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5 uppercase">
              <p className="text-meta-3">{item.role}</p>
            </div>

            <div className=" items-center justify-center p-2.5 sm:flex xl:p-5 cursor-pointer select-none"
              onClick={() => onPress(item.email)}
            >
              <p className="text-black font-semibold dark:text-white text-sm bg-warning rounded-md p-1">{action}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
