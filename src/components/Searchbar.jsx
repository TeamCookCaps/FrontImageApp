import React, { useEffect, useState } from 'react';
import { BiSearch, BiPalette } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Compact from '@uiw/react-color-compact';

export default function Searchbar(){
    const [text, setText] = useState('');
    const [display, setDisplay] = useState(false);
    const [hex, setHex] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => setText(e.target.value);
    const handleOnKeyDown = (e) => {
        if(e.code === 'Enter' && e.nativeEvent.isComposing === false){
            if(text == ''){
                alert('검색어는 반드시 입력해야 합니다!');
            }else{
                navigate('/search',{state:{ searchWord : `${text}`, color: `${hex}`}});
                displayClose();
                setText('');
            }
          
        }
    }

    const displayClick = () => {
        setDisplay(!display)
    };

    const displayClose = () => {
        setDisplay(false)
    }
    
    return(
        <ul className='w-4/5'>
            <li>
            <form
            className="flex items-center gap-3 mr-10"
            onSubmit={(e)=> { e.preventDefault(); }}>
                <BiSearch className="text-3xl" />
                <input
                    className="w-full outline-none text-xl"
                    type="text"
                    value={text}
                    placeholder="검색하려는 카테고리와 위치를 입력하세요. 카테고리는 영어로만 검색 가능합니다"
                    onChange={handleChange}
                    onKeyDown={handleOnKeyDown}/>
                <div className="w-6 h-5 rounded-full" 
                    style={{backgroundColor : hex}}/>
                <BiPalette className="text-3xl" onClick={displayClick}/>
                </form>
            </li>
            <li>
            {display ? <div className='absolute z-2'>
                <Compact
                    className='w-150 h-100'
                    color={hex}
                    onChange={(color)=> { setHex(color.hex); }}/>
            </div> : null}
            </li>
        </ul>  
       
    )
}