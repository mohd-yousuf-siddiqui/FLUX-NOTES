import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags, setTags}) => {
    
    const [inputValue, setInputValue] = useState("")

    const addNewTag = () => {
        if(inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            addNewTag()
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag)=> tag !== tagToRemove))
    }

  return (
    <div className=''>
        {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mb-2'>
                {
                    tags.map((tag, index) => (
                        <span key={index} className='flex items-center gap-2 text-sm text-(--text-muted) px-1 py-1 rounded bg-(--bg-hover) border border-(--border)'>
                            #{tag}

                            <button onClick={() => {
                                handleRemoveTag(tag)
                            }}>
                                <MdClose className='text-(--text-muted) hover:text-(--text-primary)'/>
                            </button>
                        </span>
                    ))
                }
            </div>
        )}

        <div className='flex items-center gap-4 mt-3'>
            <input type="text" value={inputValue} className='w-full text-xs bg-transparent  px-3 py-2 rounded outline-none' placeholder='add tags...'
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}/>

            <button className='w-7 h-6 flex items-center justify-center rounded border border-(--border) text-(--text-muted) hover:text-(--text-primary) font-semibold hover:border-(--text-secondary) mr-4'
            onClick={() => addNewTag()}>
                <MdAdd className='text-lg'/>
            </button>
        </div>
    </div>
  )
}

export default TagInput