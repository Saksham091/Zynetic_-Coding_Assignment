"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { github } from '../utils/Icons';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import SearchDialog from './SearchDialog/SearchDialog';
import { useGlobalContext } from '../context/globalContext';

function Navbar() {
    const router = useRouter();
    const { state } = useGlobalContext();

    return (
        <div className='w-full py-4 flex flex-col sm:flex-row items-center justify-between gap-2'>
            <div className="left"></div>
            <div className="search-container flex flex-col sm:flex-row shrink-0 w-full gap-2 sm:w-fit">

                <SearchDialog />

                <div className="btn-group flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <ThemeDropdown />
                    <Button 
                        className='source-code flex items-center justify-center gap-2 w-full sm:w-auto' 
                        onClick={() => router.push("https://github.com/Saksham091/weather_app")}
                    > 
                        {github} Source Code
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
