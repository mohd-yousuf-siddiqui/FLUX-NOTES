import React, { useEffect, useState } from 'react'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import AddEditNotes from './AddEditNotes'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import emptyNote from '../../assets/emptyNote.svg'
import noResults from '../../assets/noResults.svg'


const Home = () => {


    const apiURL = import.meta.env.VITE_BACKEND_URL

    const { currentUser, loading, errorDispatch } = useSelector(
        (state) => state.user
    )

    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState([])
    const [isSearch, setIsSearch] = useState(false)

    const navigate = useNavigate()

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })

    useEffect(() => {
        if (currentUser === null) {
            navigate("/login")
        }
        else {
            setUserInfo(currentUser?.rest)
            getAllNotes()
        }
    }, [])


    // GET ALL NOTES API
    const getAllNotes = async () => {
        try {
            const res = await axios.get(`${apiURL}/note/all`,
                { withCredentials: true }
            )

            if (res.data.success === false) {
                console.log(res.data)
                return
            }

            setAllNotes(res.data.notes)

        } catch (error) {
            console.log(error)
        }
    }


    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }


    const deleteNote = async (data) => {
        const noteId = data._id

        try {
            const res = await axios.delete(`${apiURL}/note/delete/` + noteId, {
                withCredentials: true
            })

            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }

            toast.success(res.data.message)
            getAllNotes()

        } catch (error) {
            toast.error(error.message)
        }
    }


    const onSearchNote = async (query) => {
        try {
            const res = await axios.get(`${apiURL}/note/search`,
                {
                    params: { query },
                    withCredentials: true
                })

            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }

            setIsSearch(true)
            setAllNotes(res.data.notes)

        } catch (error) {
            toast.error(error.message)
        }
    }


    const handleClearSearch = () => {
        setIsSearch(false)
        getAllNotes()
    }



    const updateIsPinned = async(noteData) => {
        const noteId = noteData._id

        try {
            const res = await axios.put(`${apiURL}/note/pinned-note/` + noteId,
                {isPinned: !noteData.isPinned}, {withCredentials: true}
            )

            if(res.data.success === false){
                toast.error(res.data.message)
                return
            }

            toast.success(res.data.message)
            getAllNotes()

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            
            <div className='sticky top-0 z-50'>
                <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            </div>

            {/* Notes Grid */}
            <div className='container mx-auto'>
                {allNotes?.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-8'>

                        {allNotes.map((note, index) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                date={note.createdAt}
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => {
                                    handleEdit(note)
                                }}
                                onDelete={() => {
                                    deleteNote(note)
                                }}
                                onPinNote={() => {
                                    updateIsPinned(note)
                                }}
                            />
                        ))}

                    </div>
                ) : (
                    <EmptyCard
                        imgSrc={isSearch ? noResults : emptyNote}
                        title={isSearch ? "No notes found" : "Your canvas is empty"}
                        description={
                            isSearch
                                ? "No notes match your search. Try different keywords or clear the search."
                                : "Create a new note to capture your thoughts and ideas before they fade."
                        }
                    />
                )}
            </div>

            
            <button
                className='w-16 h-16 border border-(--border) flex items-center justify-center rounded-2xl fixed right-10 bottom-10 z-40 bg-(--bg-card) shadow-lg hover:scale-110 transition-transform'
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null })
                }}
            >
                <MdAdd className='text-[32px] text-(--bg-primary)' />
            </button>

            {/* Modal */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                }}
                contentLabel=''
                className="w-[40%] max-md:w-[60%] max-sm:w-[70%] bg-(--bg-card) rounded-md mx-auto p-5 overflow-hidden mt-[25vh]"
            >
                <AddEditNotes
                    onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                    noteData={openAddEditModal.data}
                    type={openAddEditModal.type}
                    getAllNotes={getAllNotes}
                />
            </Modal>
        </>
    )
}

export default Home