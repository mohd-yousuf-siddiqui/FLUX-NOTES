import React, { useState, useRef, useEffect } from 'react';
import { getInitials } from '../../utils/helper';
import { MdLogout } from 'react-icons/md';

const ProfileInfo = ({ userInfo, onLogout }) => {
    // --- STATE FOR MOBILE ONLY ---
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="ml-4 z-50">
            
            <div className="hidden md:flex items-center">
                <div className="group relative flex items-center bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-full p-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/10">
                    {/* Avatar */}
                    <div className="relative shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-linear-to-tr from-zinc-800 to-zinc-700 text-zinc-200 text-xs font-bold ring-1 ring-black group-hover:ring-indigo-500/50 transition-all duration-300 z-10">
                        {getInitials(userInfo?.username)}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></span>
                    </div>

                    {/* Expanding Content (Row) */}
                    <div className="flex items-center overflow-hidden max-w-0 opacity-0 group-hover:max-w-50 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <div className="flex flex-col pl-3 pr-2 whitespace-nowrap">
                            <p className="text-sm font-medium text-white leading-tight">{userInfo?.username}</p>
                            
                        </div>
                        <div className="h-5 w-px bg-zinc-800 mx-1"></div>
                        <button onClick={onLogout} className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors mx-1">
                            <MdLogout className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>


            {/* =======================================================
               2. MOBILE VIEW
               ======================================================= */}
            <div className="md:hidden relative" ref={mobileMenuRef}>
                
                {/* Trigger: Avatar Only */}
                <div 
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className={`
                        relative w-9 h-9 flex items-center justify-center rounded-full 
                        bg-zinc-800 text-zinc-200 text-xs font-bold cursor-pointer ring-1 
                        transition-all duration-300
                        ${isMobileOpen ? "ring-indigo-500" : "ring-zinc-700"}
                    `}
                >
                    {getInitials(userInfo?.username)}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></span>
                </div>

                {/* The Dropdown Menu */}
                <div 
                    className={`
                        absolute right-0 top-12 w-56 
                        bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 
                        rounded-xl shadow-2xl overflow-hidden
                        transform origin-top-right transition-all duration-200 ease-out
                        ${isMobileOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                    `}
                >
                    {/* User Info Header */}
                    <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                        <p className="text-sm font-semibold text-white truncate">{userInfo?.username}</p>
                        <p className="text-xs text-zinc-500 truncate">user@example.com</p>
                    </div>

                    {/* Logout Button (Full Width) */}
                    <div className="p-1">
                        <button 
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-2 p-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <MdLogout className="text-lg" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfileInfo;