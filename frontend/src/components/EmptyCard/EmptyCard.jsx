import React from 'react'

const EmptyCard = ({ imgSrc, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 mt-[15vh]">


      <img src={imgSrc} alt="No notes" className="w-64 h-64 mb-6 opacity-90" />
      
      <h2 className="text-xl font-medium text-white mb-3">
        {title}
      </h2>
      
      <p className="text-[15px] text-zinc-400 leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default EmptyCard