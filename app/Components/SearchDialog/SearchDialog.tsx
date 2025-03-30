"use client";
import { useGlobalContext, useGlobalContextUpdate } from '@/app/context/globalContext';
import { commandIcon } from '@/app/utils/Icons';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function SearchDialog() {
    const { geoCodedList, inputValue, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();

    const [recentSearches, setRecentSearches] = useState<{ name: string, lat: number, lon: number }[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("recent") || "[]");
        if (Array.isArray(history)) {
            setRecentSearches(history);
        }
    }, []);

    const getClickedCoords = (item: { name: string, lat: number, lon: number }) => {
        setActiveCityCoords([item.lat, item.lon]);
        setIsOpen(false);
        handleInput({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);

        let history = JSON.parse(localStorage.getItem("recent") || "[]");

        history = history.filter((city: { name: string }) => city.name !== item.name);
        history.unshift({ name: item.name, lat: item.lat, lon: item.lon });

        if (history.length > 5) {
            history.pop();
        }

        localStorage.setItem("recent", JSON.stringify(history));
        setRecentSearches(history);
    };

    return (
        <div className='search-btn'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium 
                        hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
                        onClick={() => setIsOpen(true)}
                    >
                        <p className="text-sm text-muted-foreground">Search Here...</p>
                        <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] 
                        rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <div className="p-3 flex h-11 w-full bg-transparent py-3 text-sm outline-none 
                                        placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 gap-2 border-b-2">
                            <Search className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
                            <input
                                className="flex mt-0.5 h-4 w-full bg-transparent text-sm outline-none 
                                placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                value={inputValue}
                                onChange={handleInput}
                                placeholder='Type a command or search...' />
                        </div>
                        <ul className='px-3 pb-2'>
                            {!inputValue && recentSearches.length === 0 && (
                                <>
                                    <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
                                    {geoCodedList.length === 0 ? (
                                        <p className="p-2 text-sm text-muted-foreground">No Results</p>
                                    ) : (
                                        geoCodedList.map((item: {
                                            name: string;
                                            country: string;
                                            state: string;
                                            lat: number,
                                            lon: number
                                        }, index: number) => (
                                            <li
                                                key={index}
                                                className="py-3 px-2 text-sm rounded-sm cursor-pointer hover:bg-accent"
                                                onClick={() => getClickedCoords(item)}
                                            >
                                                <p className="text">{item.name}, {item.state && item.state + ","} {item.country}</p>
                                            </li>
                                        ))
                                    )}
                                </>
                            )}

                            {!inputValue && recentSearches.length > 0 && (
                                <>
                                    <p className='p-2 text-sm text-muted-foreground'>Recent Searches</p>
                                    {recentSearches.map((item, index) => (
                                        <li
                                            key={index}
                                            className="py-2 px-2 text-sm cursor-pointer hover:bg-accent rounded-sm"
                                            onClick={() => getClickedCoords(item)}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </>
                            )}

                            {inputValue && (
                                <>
                                    <p className='p-2 text-sm text-muted-foreground'>Search Results</p>
                                    {geoCodedList.length === 0 ? (
                                        <p className="p-2 text-sm text-muted-foreground">No Results</p>
                                    ) : (
                                        geoCodedList.map((item: {
                                            name: string;
                                            country: string;
                                            state: string;
                                            lat: number,
                                            lon: number
                                        }, index: number) => (
                                            <li
                                                key={index}
                                                className="py-3 px-2 text-sm rounded-sm cursor-pointer hover:bg-accent"
                                                onClick={() => getClickedCoords(item)}
                                            >
                                                <p className="text">{item.name}, {item.state && item.state + ","} {item.country}</p>
                                            </li>
                                        ))
                                    )}
                                </>
                            )}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog;
