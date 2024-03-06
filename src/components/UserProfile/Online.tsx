export default function Online({status,name}:{status:boolean,name:string}){
    console.log(status)
    return(
        <>
        {status ? (
            <div>
              <p className="ml-2 text-blue-800 font-medium">{name}</p>
              <div className="flex items-center ml-2 pb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <p className="text-green-500 text-xs">online</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center ml-3">
              <p className=" text-blue-800 font-medium text-xl">{name}</p>
            </div>
          )}
          </>
    )
}