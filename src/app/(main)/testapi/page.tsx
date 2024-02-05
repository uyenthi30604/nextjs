// 'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TestapiTemplate from './testapi.component'

function TestAPI() {
    // const [data, setData] = useState(null)
    // const [isLoading, setLoading] = useState(true)
    // const [username, setUserName] = useState(null)
    // const [userImg, setUserImg] = useState('')

    
    // if (isLoading) return <p>Loading...</p>
    // // if (!data) return <p>No profile data</p>
    // function getUser(id: number) {
    //     fetch('https://id.mvpapp.vn/api/v1/getUserInfo_R9ia37vV0HgUod0z?id=')
    //         .then((res) => res.json())
    //         .then((data: any) => {
    //             console.log("data", data)
    //             if (data.code == "SUCCESS") {
    //                 setUserImg(data.data.avatar)
    //                 setUserName(data.data.name)
    //             }

    //             setData(data)
    //             setLoading(false)
    //         })
    // }

    return (
        <TestapiTemplate></TestapiTemplate>
       
       
    )
}

export default TestAPI