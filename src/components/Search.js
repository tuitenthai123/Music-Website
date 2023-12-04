import React, { useState} from 'react';
import icons from '../ultis/icon';
import { apiSearch } from '../apis';
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '../ultis/path';


const { TbMusicSearch } = icons;

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.seach(keyword))
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q:keyword
        }).toString()
      })
    }
  };

  return (
    <div className='w-full flex items-center'>
      <span className='h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px] text-gray-500'>
        <TbMusicSearch size={24} />
      </span>
      <input
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        className='outline-none bg-[#DDE4E4] w-full px-4 py-2 rounded-r-[20px] h-10 text-gray-500'
        placeholder='Tìm Kiếm Bài Hát Cùng TuiTenThai Music! :3'
      />
    </div>
  );
};

export default Search;
