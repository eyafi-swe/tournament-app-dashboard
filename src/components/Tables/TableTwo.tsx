interface tableDataTypes {
  title: string,
  header1: string,
  header2: string,
  data: Array<any>,
  action: string
  onPressAction: (id: string, title: string) => void,
  onPressItem: (id: string) => void
  onPressItem2: (title: string) => void
};

const TableTwo: React.FC<tableDataTypes> = ({
  title,
  header1,
  header2,
  data,
  action,
  onPressAction,
  onPressItem,
  onPressItem2
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      </div>

      <div className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 items-center ">
          <p className="font-medium">{header1}</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">{header2}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>

      </div>

      {data.map((item, idx) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={idx}
        >
          <div className="col-span-1 items-center">
            <p className="text-sm text-black dark:text-white">
              {idx + 1}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12 w-15 rounded-md">
                <img src={item?.uri} alt="item" className='object-cover h-12 w-15' />
              </div>
              <p className="text-sm text-blue-600 dark:text-white underline cursor-pointer "
                onClick={() => {
                  onPressItem(item._id)
                  onPressItem2(item.title)
                }
                }
              >
                {item.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white uppercase bg-warning rounded-md p-1 font-semibold cursor-pointer select-none"
              onClick={() => onPressAction(item._id, item.title)}
            >
              {action}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TableTwo;
