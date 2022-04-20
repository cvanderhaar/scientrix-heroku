import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'
import shopritetech from './img/shoprite_tech-removebg-preview.png'
import footer from './img/footer.png'
import newfooter from './img/new_footer.png'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

const accessToken = 'ZDgwNjZjY2FjYWQ3N2UxMDUyNWQ5M2QxNmQwYjUyMjczYmVhNDIwY2Q5MWM5MDViM2FmMWZmYTQ1MmJjM2Y5YQ';
const API_URL = 'https://shoprite.scientrix.com';
const clientId = process.env.REACT_APP_SCIENTRIX_API_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SCIENTRIX_API_CLIENT_SECRET;
const API_KEY = process.env.REACT_APP_SCIENTRIX_API_PUBLIC_KEY;
// const domain = process.env.SCIENTRIX_AUTH_DOMAIN;
//const [auth, setAuth] = useState({ accessToken: 'MWNiMmE4YWM1NmFlOTMwZTdjOWQxZmVkZjUxZDVmN2JjZmM4YzlmMWRmYTU5NDQzMGE0M2QyMTg5NzBjZTYwMQ', refreshToken: 'MDQ0ZDYwMWMyYjYzM2VjZTFhN2VlY2RkNmJjZmJlZDlhM2ZmMDRlMTM2NjdiNGVjOGQxNmRiOTA0YTI4ZmI1YQ' });

const authAxios = axios.create({
  baseUrl: API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}` 
  }
})

const refresh = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/oauth/v2/token?grant_type=http://platform.local/grants/api_key&client_id=${clientId}&client_secret=${clientSecret}&api_key=${API_KEY}`)
      .then(response => {
        resolve(response);
        console.log(response);
      })
      .catch(error => {
        reject(error);
      })
  })
}

// const refresh = useCallback(() => {
//   setAuth((auth) => {
//     fetch(`${API_URL}/oauth/v2/token?grant_type=http://platform.local/grants/api_key&client_id=${clientId}&client_secret=${clientSecret}&api_key=${API_KEY}`, auth.accessToken, auth.refreshToken)
//       .then((res) => res.json())
//       .then((body) =>
//         setAuth({
//           accessToken: body.accessToken,
//           refreshToken: body.refreshToken,
//         }) 
//       );
//     return auth;
//   });
// }, []);

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await authAxios.get(`${API_URL}/api/v1/elements?limit=8`)

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)
    }
    refresh()
    fetchItems()
  }, [])

  // useEffect(() => {
  //   const fetchProgress = async () => {
  //       const result = await authAxios.get(`${PROGRESS_URL}/api/v1/elements?id=${id}&periods=${periods}&2022=${year}&progress=${p}&Q2=${q}`)
  
  //       console.log({progress : result.data })
  
  //       setProgress(result.data.ytd)
  //       setId(result.data.id)
  //       setPeriods(result.data.periods)
  //       setYear(result.data.year)
  //       setP(result.data.p)
  //       setQ(result.data.q)
  //     }
  
  //     fetchProgress()
  // }, []);

  return (
    <div className='container'>
      {/* <Header /> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='search' style={{fontSize: '44px', color: 'black',}}>
      <div className="logo"><img src={shopritetech} alt='' /> </div> 
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightBlue" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkBlue" className="bi bi-circle-fill" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="8"/>
        </svg> */}
          Progress to Goal:   
      </div>
      {/* <Search getQuery={(q) => setQuery(q)} /> */}
      <CharacterGrid isLoading={isLoading} items={items} progress={progress} />
      <div class="footerWrap">
        <div class="footer">
          <div class="footerContent">
            <img src={newfooter} alt='' />
          </div>     
        </div>
      </div>
      {/* <div className="footer"><img src={footer} alt='' /> </div>  */}
    </div>
  )
}

export default App
