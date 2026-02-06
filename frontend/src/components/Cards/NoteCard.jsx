import React, { useState, useEffect } from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin, MdClose } from 'react-icons/md'
import moment from "moment"

const NoteCard = ({ content, tags, date, title, isPinned, onPinNote, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsExpanded(false)
            }
        }

        if (isExpanded) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isExpanded])

    return (
        <>
            {/* Card Preview */}
            <div
                className='border border-(--border) rounded-lg p-4 bg-(--bg-card) hover:scale-103 shadow-(--border) transition-all ease-in-out cursor-pointer overflow-hidden'
                style={{
                    maxWidth: '100%',
                    minWidth: 0
                }}
                onClick={() => setIsExpanded(true)}
            >
                {/* Card Header */}
                <div className='flex items-center justify-between gap-2'>
                    <div className='min-w-0 flex-1'>
                        <h6 
                            className='text-sm font-medium truncate'
                            title={title}
                        >
                            {title}
                        </h6>
                        <span className='text-xs text-(--text-muted)'>
                            {moment(date).format("Do MMM YYYY")}
                        </span>
                    </div>

                    <MdOutlinePushPin
                        className={`icon-btn shrink-0 ${isPinned ? "text-blue-500" : "text-(--text-secondary)"}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            onPinNote()
                        }}
                    />
                </div>

                {/* Card Content Preview */}
                <p 
                    className='text-xs text-(--text-secondary) mt-2'
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word'
                    }}
                >
                    {content}
                </p>

                {/* Card Footer */}
                <div className='flex items-center justify-between mt-2 gap-2'>
                    <div className='text-xs text-(--text-muted) truncate flex-1 min-w-0'>
                        {tags.map((item) => `#${item} `)}
                    </div>

                    <div className='flex items-center gap-2 shrink-0'>
                        <MdCreate
                            className='icon-btn hover:text-blue-500'
                            onClick={(e) => {
                                e.stopPropagation()
                                onEdit()
                            }}
                        />

                        <MdDelete
                            className='icon-btn hover:text-red-500'
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete()
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal - Expanded View */}
            {isExpanded && (
                <div
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className='bg-(--bg-card) border border-(--border) rounded-lg w-full max-w-lg shadow-xl overflow-hidden'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className='flex items-center justify-between p-4 border-b border-(--border)'>
                            <div className='min-w-0 flex-1 mr-4'>
                                <h2 
                                    className='text-lg font-semibold text-white'
                                    style={{ wordBreak: 'break-word' }}
                                >
                                    {title}
                                </h2>
                                <span className='text-xs text-(--text-muted)'>
                                    {moment(date).format("Do MMM YYYY, h:mm A")}
                                </span>
                            </div>

                            <div className='flex items-center gap-2 shrink-0'>
                                <MdOutlinePushPin
                                    className={`icon-btn text-xl cursor-pointer ${isPinned ? "text-blue-500" : "text-(--text-secondary)"}`}
                                    onClick={onPinNote}
                                />
                                <MdClose
                                    className='icon-btn text-xl hover:text-white cursor-pointer'
                                    onClick={() => setIsExpanded(false)}
                                />
                            </div>
                        </div>

                        {/*  Modal Content  */}
                        <div
                            className='p-4 custom-scrollbar'
                            style={{
                                maxHeight: '240px',
                                overflowY: 'auto',
                                overflowX: 'hidden'
                            }}
                        >
                            <p
                                className='text-sm text-(--text-secondary) leading-6 whitespace-pre-wrap'
                                style={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word'
                                }}
                            >
                                {content}
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className='flex items-center justify-between p-4 border-t border-(--border) gap-2'>
                            <div 
                                className='text-xs text-(--text-muted) flex flex-wrap gap-1 min-w-0 flex-1'
                                style={{ maxWidth: '60%' }}
                            >
                                {tags.map((item, index) => (
                                    <span
                                        key={index}
                                        className='bg-zinc-800 px-2 py-1 rounded-full truncate'
                                        style={{ maxWidth: '100px' }}
                                    >
                                        #{item}
                                    </span>
                                ))}
                            </div>

                            <div className='flex items-center gap-3 shrink-0'>
                                <button
                                    className='flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors'
                                    onClick={() => {
                                        setIsExpanded(false)
                                        onEdit()
                                    }}
                                >
                                    <MdCreate className='text-lg' />
                                    Edit
                                </button>

                                <button
                                    className='flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors'
                                    onClick={() => {
                                        setIsExpanded(false)
                                        onDelete()
                                    }}
                                >
                                    <MdDelete className='text-lg' />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NoteCard