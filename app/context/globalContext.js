"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState([
        51.752021, -1.257726,
    ])
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [airQuality, setAirQuality] = useState({});

    // Air Quality
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

            setAirQuality(res.data);
        } catch (error) {
            console.log("Error in getting pollution data: ", error.message);
        }
    }

    // geocoded list
    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`/api/geocoded?search=${search}`);
            setGeoCodedList(res.data);
        } catch (error) {
            console.log("Error fetching geocoded list: ", error.message)
        }
    };

    // Handle Input Chnage
    const handleInput = (e) => {
        setInputValue(e.target.value);

        if(e.target.value === ""){
            setGeoCodedList(defaultStates);
        }
    };

    // Debounce Function
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);
        if(inputValue){
            debouncedFetch(inputValue);
        }
        // cleanup
        return () => debouncedFetch.cancel();

    }, [inputValue]);


    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords]);

    return (
        <GlobalContext.Provider
            value={{
                airQuality,
                geoCodedList,
                inputValue,
                handleInput,
                setActiveCityCoords,
            }}>
            <GlobalContextUpdate.Provider value={{setActiveCityCoords,}} >{children}</GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);