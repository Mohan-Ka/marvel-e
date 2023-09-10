import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

export const Marvel = () => {
    const {id}=useParams();
    const [item,setItem]=useState()
    useEffect(()=>{
        fetch();
    },[]);
    const fetch=async()=>{
        const res=await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=fbdd9092bf76c59fed244fe862f3af0c&hash=035bee483e1bc4501bd80d402cb6f11c`)
        setItem(res.data.data.results[0])
    }
    return (
        <>
        {
            (!item)? "":(
                <div className='box-content'>
                    <div className='right-box'>
                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
                    </div>
                    <div className='left-box'>
                        <h1>{item.name}</h1>
                        <h4>{item.description}</h4>
                    </div>
                </div>

            )
        }
        </>

    )
}