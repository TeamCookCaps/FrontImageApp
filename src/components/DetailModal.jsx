import React from 'react';

export default function DetailModal({setIsShow, info }) {
    const result = info[0];
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

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                <div className='grid'>
                    <img src={result.image_url}/>
                </div>
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto relative w-screen max-w-md">
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        
                        <button type="button" className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={()=> setIsShow(false)} >
                        <span class="sr-only">Close</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>

                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                        <h1 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Information</h1>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
        </>
    );
}