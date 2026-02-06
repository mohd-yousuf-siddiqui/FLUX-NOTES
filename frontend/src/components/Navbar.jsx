import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import FluxNotesStack from './LOGO/FluxLogo'

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Don't search if query is empty
        if (!searchQuery) {
            handleClearSearch()
            return
        }

        // Wait 500ms after user stops typing, then search
        const delaySearch = setTimeout(() => {
            onSearchNote(searchQuery)
        }, 100)

        // Cleanup: cancel timeout if user keeps typing
        return () => clearTimeout(delaySearch)

    }, [searchQuery])  // Runs every time searchQuery changes

    const onClearSearch = () => {
        setSearchQuery("")
        handleClearSearch()
    }

    
    const onLogout = async () => {

      try {
        dispatch(signoutStart())
        const res = await axios.get("http://localhost:3000/api/auth/signout", { withCredentials: true })
        if(res.data.success === false){
          dispatch(signoutFailure(res.data.message)); toast.error(res.data.message); return
        }
        dispatch(signoutSuccess()); toast.success(res.data.message); navigate("/login")
      } catch (error) {
        dispatch(signoutFailure(error.message));
        toast.error(error.message)
      }
    }

  return (

    <div className='bg-(--bg-nav) flex items-center justify-between px-4 sm:px-6 py-2 drop-shadow gap-2 sm:gap-4'>
        
        <FluxNotesStack/>

        <SearchBar 
            value={searchQuery} 
            onChange={({target}) => setSearchQuery(target.value)}
            onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>

    </div>
  )
}

export default Navbar