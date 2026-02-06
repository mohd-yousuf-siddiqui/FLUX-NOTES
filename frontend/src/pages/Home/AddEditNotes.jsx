import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../../components/Input/TagInput'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddEditNotes = ({onClose, noteData, type, getAllNotes}) => {

    const [title, setTitle] =useState(noteData?.title || "")
    const [content, setContent] =useState(noteData?.content || "")
    const [tags, setTags] =useState(noteData?.tags || [])
    const [error, setError] = useState(null)

    const editNote = async() => {
        const noteId = noteData._id

        try {
            const res = await axios.post("http://localhost:3000/api/note/edit/" + noteId,{
                title, content, tags}, {withCredentials: true}
            )

            if(res.data.success === false){
                console.log(res.data.message)
                setError(error.message)
                toast.error(res.data.message)
                return
            }

            getAllNotes()
            toast.success(res.data.message)
            onClose()

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setError(error.message)
        }
    }

    const addNewNote = async() => {
        try {
            const res = await axios.post("http://localhost:3000/api/note/add",{
                title, content, tags}, {withCredentials: true}
            )

            if(res.data.success === false){
                console.log(res.data.message)
                toast.error(res.data.message)
                setError(res.data.message)
            }

            getAllNotes()
            toast.success(res.data.message)
            onClose()

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
            setError(error.message)
        }
    }

    const handleAddNotes = () => {
        if(!title) {
            setError("Please enter the title.")
            return
        }

        if(!content) {
            setError("Please enter the content.")
            return
        }

        setError("")
        
        if(type==="edit") {
            editNote()
        }
        else {
            addNewNote()
        }
    }

  return (
    <div className='relative'>
        <button className='w-10 h-10 text-(--text-secondary) rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:text-(--text-primary)'
        onClick={onClose}>
            <MdClose className='text-xl'/>
        </button>

        <div className='flex flex-col '> 
            {/* <label className='input-label text-(--text-muted) uppercase text-xl'>Title</label> */}

            <input type="text" className='text-2xl text-(--text-primary) outline-none mb-3' placeholder='Title' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className='flex flex-col'>
            {/* <label className='input-label text-(--text-muted) uppercase text-xl'>Content</label> */}

            <textarea type="text" className='text-md text-(--text-secondary) outline-none mb-3 p-1' placeholder='Type your notes here...'
            rows={10} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />

        </div>

        <div className=''>
            {/* <label className='input-label text-(--text-muted) uppercase text-sm'>Tags</label> */}
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && <p className='text-red-400 text-sm pb-1 mt-2'>{error}</p>}

        <button className='btn-primary text-(--text-secondary) border border-(--text-primary) bg-(--bg-primary) font-medium mt-5 p-3  hover:text-(--text-primary)' onClick={handleAddNotes}>
            { type === "edit" ? "UPDATE" : "ADD" }
        </button>
    </div>
  )
}

export default AddEditNotes