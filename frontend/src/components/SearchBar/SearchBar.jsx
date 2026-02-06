import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div 
      className={`
        relative group flex items-center px-4 py-2.5 rounded-xl
        bg-zinc-900/50 border transition-all duration-300 ease-out
        
        /* RESPONSIVE WIDTHS: */
        flex-1 max-w-md mx-4              /* Mobile: Take available space, add margin, cap width */
        sm:flex-none sm:w-[28vw] sm:min-w-75sm:mx-0 /* Desktop: Fixed widths */

        ${isFocused 
          ? "border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)] ring-1 ring-indigo-500/20" 
          : "border-zinc-800 hover:border-zinc-700"
        }
      `}
    >
      <FaMagnifyingGlass 
        className={`text-lg cursor-pointer transition-colors duration-300 mr-3 shrink-0
          ${isFocused || value ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-400"}
        `}
      />

      <input 
        type="text" 
        placeholder={window.innerWidth < 640 ? "Search" : "Search notes..."} 
        className="w-full text-sm bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 caret-indigo-500 tracking-tight"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value ? (
        <IoMdClose 
          className="text-zinc-500 text-xl cursor-pointer hover:text-white hover:bg-zinc-800 rounded-full p-0.5 transition-all duration-200 shrink-0 ml-2"
          onClick={onClearSearch}
        />
      ) : (
        <div className="hidden sm:flex gap-1 items-center pointer-events-none opacity-50 shrink-0 ml-2">
          <kbd className="h-5 px-1.5 flex items-center justify-center text-[10px] font-medium text-zinc-500 bg-zinc-800 rounded border border-zinc-700 font-sans">
            /
          </kbd>
        </div>
      )}
    </div>
  );
};

export default SearchBar;