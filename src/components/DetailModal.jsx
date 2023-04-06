import React from 'react';

export default function DetailModal({setIsShow,info}) {
    const result = info;
    console.log(result);
    const result_date = new Date(result.image_date).toString();
    
    const getDate = (date_str) => {
        const date = new Date(date_str);

        const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        const day = (date.getDate()) < 10 ? '0' + (date.getDate()).toString() : (date.getDate()).toString();
        const hour = (date.getHours()) < 10 ? '0' + (date.getHours()).toString() : (date.getHours()).toString();
        const minites = (date.getMinutes()) < 10 ? '0' + (date.getMinutes()).toString() : (date.getMinutes()).toString();
        const seconds = (date.getSeconds()) < 10 ? '0' + (date.getSeconds()).toString() : (date.getSeconds()).toString();

        return date.getFullYear().toString()+'-'+month+'-'+day+' '+hour+':'+minites+':'+seconds;
    }

    const RGBToHex = (rgb) => {
        const r = rgb.red.toString(16).padStart(2, '0');
        const g = rgb.green.toString(16).padStart(2, '0');
        const b = rgb.blue.toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }

    return(
        <>
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex h-full w-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className='grid grid-cols-3 min-w-full'>
                                <div className='col-span-2'>
                                    <img src={info.image_url}/>
                                </div>
                                <div className='col-span-1 relative pl-4'>
                                    <header className='flex items-center'>
                                        <div className='w-5/6 outline-none focus:outline-none p-5'></div>
                                        <button type="button" className="w-1/6 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={()=> setIsShow(false)} >
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button>
                                    </header>
                                    <div>
                                        <ul className='grid grid-cols-1 gap-x-3 gap-y-3 divide-y'>
                                            <li>Created : {getDate(result_date)}</li>
                                            <li>width : {result.image_width}</li>
                                            <li>height : {result.image_height}</li>
                                            <li>category : {result.category_name}</li>
                                            {result.rgb_info && 
                                                <li> color :
                                                {result.rgb_info.map((rgb)=> (
                                                    <div className='inline-block m-2'
                                                        style={{backgroundColor : RGBToHex(rgb)}}>{RGBToHex(rgb)+" "}</div>
                                                ))}
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}