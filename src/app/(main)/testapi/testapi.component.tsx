'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { InputText } from 'primereact/inputtext'
import { useAppSelector, useAppDispatch, useAppStore } from '@/redux/hooks';

function TestapiTemplate() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [username, setUserName] = useState(null)
  const [userImg, setUserImg] = useState('')
  const [staffId, setStaffId] = useState('')

  const value = useAppSelector(state => state.counter.value);
  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>

  // useEffect(() => {
  //   if (staffId != '') {
  //     fetch('https://id.mvpapp.vn/api/v1/getUserInfo_R9ia37vV0HgUod0z?id='+staffId)
  //       .then((res) => res.json())
  //       .then((data: any) => {
  //         console.log("data", data)
  //         if (data.code == "SUCCESS") {
  //           setUserImg(data.data.avatar)
  //           setUserName(data.data.name)
  //         }

  //         setData(data)
  //         setLoading(false)
  //       })
  //   }

  // }, [])

  function getUser() {
    if (staffId.length > 0) {
      fetch('https://id.mvpapp.vn/api/v1/getUserInfo_R9ia37vV0HgUod0z?id=' + staffId)
        .then((res) => res.json())
        .then((data: any) => {
          console.log("data", data)
          if (data.code == "SUCCESS" && data.data) {
            setUserImg(data.data.avatar)
            setUserName(data.data.name)
          }

          setData(data)
          setLoading(false)
        })
    }

  }


  return (
    <div>
      <div className="col-4">
        <p>{value}</p>
        <h1>Test API</h1>
      </div>
      <div className="grid">
        <div className='col-12'>
          <InputText value={staffId} onChange={(e) => { setStaffId(e.target.value) }} onKeyUp={getUser} />
        </div>
        <div className='col-12'>
          {userImg && <Image src={userImg} width={50}
            height={50} alt='image of user'></Image>}
        </div>
        <div className='col-12'>
          {username && <input className="p-inputtext p-component" placeholder="Default" data-pc-name="inputtext" data-pc-section="root" type="text" value={username}></input>}
        </div>

      </div>

    </div>
  )
}

export default TestapiTemplate