import React, { useState, useEffect } from "react";
import ProgressBar from '../ui/Progress';
import axios from 'axios'

const accessToken = 'Mzg1OTQxNDkwMzJjZGIwNzM5ZTg3YmYzZTNlYmE2ODdjMjQ1YWZiZDg0ODQ5ZDRiOWMxMGYwODI1ZmE4YTE4ZA';
const API_URL = 'https://shoprite.scientrix.com';
const clientId = process.env.REACT_APP_SCIENTRIX_API_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SCIENTRIX_API_CLIENT_SECRET;
const API_KEY = process.env.REACT_APP_SCIENTRIX_API_PUBLIC_KEY;
const PROGRESS_URL = 'https://shoprite.scientrix.com';
// const domain = process.env.SCIENTRIX_AUTH_DOMAIN;

const authAxios = axios.create({
  baseUrl: API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

const CharacterItem = ({ item }) => {

  //https://shoprite.scientrix.com/download_photo/29

  const [progressValue, setProgressValue] = useState(0);
  const [color, setColor] = useState('')

  const changeColor = () => {
    switch (color) {
      case '.progress > div:nth-of-type(1)':
        return <ProgressBar color={'#384C58'} value={progressValue} max={100} />
      case '.progress > div:nth-of-type(3)':
        return <ProgressBar color={'#549AA7'} value={progressValue} max={100} />
      case '.progress > div:nth-of-type(4)':
        return <ProgressBar color={'#7B9E41'} value={progressValue} max={100} />
      case '.progress > div:nth-of-type(5)':
        return <ProgressBar color={'#FACE3E'} value={progressValue} max={100} />
      case '.progress > div:nth-of-type(7)':
        return <ProgressBar color={'#E4652D'} value={progressValue} max={100} />
      default:
        return null
    }
  }

  const fetchProgress = async (data) => {
    const result = await authAxios.get(`${PROGRESS_URL}/api/v1/elements/${data.id}/periods/2022/progress/Q2`)
    setProgressValue(result?.data?.qtd ? result?.data?.qtd : 0)
    console.log(result.data.qtd)
  }

  useEffect(() => { 
    item && fetchProgress(item)
    setColor()
  }, [])

  return (
    <div className='card'>
      <div className='card-inner'>
        <div className='card-front'>
          {/* <img src={item.responsible.image_40} alt='' /> */}
          {/* {progress.map((p) => ( */}
          {/* ))}           */}
        </div>
          <h1>{item.name} 
            <div className='progress'>
              <ProgressBar value={progressValue} max={100} />
            </div>
          </h1>
          {/* <div className="card-image"></div>
            <div className="card-text">
              <h1 className="date">{item.updated}</h1>
              <h2>{item.responsible.firstname}</h2>
              <p>{item.slug}</p>
            </div> */}
            {/* <div class="card-stats">
              <div class="stat">
                <div class="value">4<sup>m</sup></div>
                <div class="type">read</div>
              </div>
              <div class="stat border">
                <div class="value">5123</div>
                <div class="type">views</div>
              </div>
              <div class="stat">
                <div class="value">32</div>
                <div class="type">comments</div>
              </div>
            </div> */}
          {/* <ul>
            <li>
              <strong>Planning:</strong> {item.scope}
            </li>
            <li>
              <strong>Decisions:</strong> {item.updated}
            </li>
            <li>
              <strong>IT:</strong> {item.slug}
            </li>
          </ul> */}
      </div>
    </div>
  )
}

export default CharacterItem
