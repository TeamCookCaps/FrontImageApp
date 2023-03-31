import React, { useState } from 'react';
import { BiSearch, BiPalette } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Searchbar(){
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setText(e.target.value);
    const handleOnKeyDown = (e) => {
        if(e.code === 'Enter' && e.nativeEvent.isComposing === false){
          navigate('/search',{state:{searchWord : `${text}`}});
          console.log('dsf')
          setText('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <form
        className="w-4/5 flex items-center gap-5 mr-10"
        onSubmit={handleSubmit}>
            <BiSearch className="text-3xl" />
            <input
                className="w-full outline-none text-xl"
                type="text"
                value={text}
                placeholder="Search photo"
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}/>
            <BiPalette className="text-3xl"/>
        </form>
    )
}