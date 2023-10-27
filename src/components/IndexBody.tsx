

export default function IndexBody(){
    return(
        <>
        <div className="h-[160px] w-[300px] bg-black rounded-lg flex flex-col items-center gap-2"
            style={{
                background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
                padding: '10px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            }}
        >
            <p
                className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
            >
                What is BuzzBox?
            </p>
            <p className="font-medium  text-black rounded-lg">
                BuzzBox is an innovative online messaging platform that facilitates quick and efficient communication.
            </p>
        </div><div className="h-[160px] w-[300px] bg-black rounded-lg flex flex-col items-center gap-2"
            style={{
                background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
                padding: '10px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            }}>
                <p
                    className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
                >
                    Requirements
                </p>
                <p className="font-medium  text-black rounded-lg">
                    To get started with our platform, you'll need an unique numberKey for every user.
                </p>
            </div>
            <div className="h-[160px] w-[300px] bg-black  rounded-lg flex flex-col items-center gap-2"
                style={{
                    background: 'linear-gradient(135deg, #001f3f, #4A90E2)',
                    padding: '10px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                }}>
                <p
                    className="w-max text-black font-medium text-xl rounded-lg p-2 bg-slate-400"
                >
                    Rules and Guidelines!!
                </p>
                <div className="font-medium  text-black rounded-lg">
                    <p> - Be respectful and considerate in your interactions. </p>
                    <p> - Do not use offensive language or engage in harassment. </p>
                </div>
            </div>
            </>
         
    )
}