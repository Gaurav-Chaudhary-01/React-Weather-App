import React, { useEffect, useState } from 'react'
import Weathercard from './weathercard';
import './style.css'

const Temp = () => {

    const [searchValue, setSearchValue]=useState("pune");
    const [tempInfo, setTempInfo]=useState({});

    const getWeatherInfo= async ()=>{
        try {

            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3d2a1`
            
            const res=await fetch(url)
            const data=await res.json()
            
            const {temp, humidity , pressure }=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;
            
            const myWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };
            
            setTempInfo(myWeatherInfo);
            

        } catch (error) {
            console.log(error);
            
        }

    }



    useEffect(() => {
     
        getWeatherInfo();

    }, []);
    


  return (
    <>

    {/* //SEARCH BUTTON */}

    <div className="wrap">
        <div className="search">
            <input type="search" 
            placeholder='search ....' 
            autoFocus
            id="search"
            className='searchTerm'
            value={searchValue }
            onChange={(e)=>setSearchValue(e.target.value)}
            />

            <button className='searchButton ' 
            type='button' onClick={getWeatherInfo}> Search </button>
        </div>
    </div>

    <Weathercard tempInfo={tempInfo}/>
      
    </>
  )
}

export default Temp
