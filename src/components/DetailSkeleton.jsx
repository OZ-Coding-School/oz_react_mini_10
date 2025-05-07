

function SkeletonUi() {
    return (
        <section className="w-[1200px] h-[700px] flex flex-row gap-[50px] mx-auto mt-[50px] animate-pulse">
            <div className='w-[50%] h-[500px]  border rounded bg-white'>
                <div className='w-full h-full'></div>
            </div>
            <div className='w-[50%] '>
                <div className='flex border h-[50px] items-center justify-around  rounded bg-white'>
                    <div className="w-[80px] h-[20px] bg-gray-400"></div>
                    <div className="w-[200px] h-[20px] bg-gray-400"></div>
                </div>
                <div className='border bg-white h-[50px] items-center flex justify-center  rounded'>
                    <div className='w-[200px] h-[20px] items-center flex justify-center bg-gray-400 rounded'></div>
                </div>
                <div className="border h-[400px] rounded bg-white">
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>
                    <div className='mx-[5%] my-[5%] w-auto h-[20px] flex items-center justify-center bg-gray-400 rounded'></div>

                </div>
            </div>
        </section>
    );

}

export default SkeletonUi;

