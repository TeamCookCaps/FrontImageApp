import React, { useState } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Sketch } from '@uiw/react-color';

export default function Searchbar() {
  const [text, setText] = useState('');
  const [display, setDisplay] = useState(false);
  const [hex, setHex] = useState('');

  const navigate = useNavigate();
  const handleChange = (e) => setText(e.target.value);
  const handleOnKeyDown = (e) => {
    if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
      initSearch();
    }
  };

  const initSearch = () => {
    navigate('/search', { state: { searchWord: `${text}`, color: `${hex}` } });
    window.location.reload();
    displayClose();
    setText('');
  };

  const displayClick = () => {
    setDisplay(!display);
  };

  const displayClose = () => {
    setDisplay(false);
  };

  return (
    <ul className="w-4/5">
      <li className="relative">
        <form
          className="flex items-center gap-3 mr-10"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <BiSearch className="text-3xl" />
          <input
            className="w-full outline-none text-xl"
            type="text"
            value={text}
            placeholder="검색하려는 카테고리나 위치를 입력하세요"
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </form>
      </li>
      <li>
        <div onClick={displayClick}>
          <div
            style={{ backgroundColor: hex }}
            className="inline-flex items-center m-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-600"
            onClick={displayClick}
          >
            {hex === '' ? `색상 선택` : hex}
            <BiX
              onClick={() => {
                setHex('');
              }}
            />
          </div>
        </div>
      </li>
      <li>
        {display ? (
          <div className="absolute z-20">
            <Sketch
              style={{ marginLeft: 20 }}
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
              }}
            />
          </div>
        ) : null}
      </li>
    </ul>
  );
}
