import './App.css';
import React, { useEffect, useState } from 'react';
import {motion, Reorder} from 'framer-motion'


const ACCESS_TOKEN = "ya29.a0AbVbY6NBe70A96S9fEy3gxnR2z6bJZQX9EaQMT77FMWfx0JgklDi9JNPw02GPpmGLf_ejjOfj0Z6kH222mEsxipezGLETEoCQlk75anj8ZQKhxmbavUf85JbabaJH3QfQHPT0sAeXFX91IJRzptjWZfBvN7KaCgYKAWYSARISFQFWKvPlvx-svAu0MTOF4Norv9T7pg0163"
const SHEET_ID = "1E2dtvCZzllJXFqhZP2kLfNWAihF52KTuB4NJKrbP5CY"

function App() {
  
  const [advocacyData, setAdvocacyData] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      updateLeaderboard();
      console.log("Updated")
    }, 5000)
    return () => clearInterval(interval);
  }, [advocacyData])
  
  const updateLeaderboard = async() => {

    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:B250`, {
      method: "GET",
      headers: new Headers({ 'Authorization': 'Bearer ' + ACCESS_TOKEN})
    })
      const apiResponse = await request.json();
  
      console.log(apiResponse);          
      setAdvocacyData(apiResponse.values)

  }

  const arrayDataItems = advocacyData.slice(1).map((advocate) => advocate);
  const sortedData = arrayDataItems.sort((a,b) => b[1] - a[1])
  const awards = ["🥇", "🥈", "🥉"]

  console.log((sortedData))
  if (sortedData.length > 1) {
    for (var i=0; i < awards.length; i++) {
      if (i<3) sortedData[i].push(awards[i]);
    }
  }

  var date = new Date();
  var dateStr =
    ("00" + date.getDate()).slice(-2) + "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
    date.getFullYear() + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);



  return (


    <div className="bg-gradient-to-bl min-h-screen from-sky-400 to-indigo-500">
    <div className="container md:max-w-2xl mx-auto px-4 sm:px-8">
      <div className="py-8">
          <h2 className="text-2xl font-bold leading-tight text-center">FP&A Week - Employee Advocacy leaderboard 🏆</h2>
        </div>
        <div className="flex px-5 border-b-2w-full h-full justify-center content-center items-center">
          <button onClick={() => updateLeaderboard() } className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-3 text-white"> Update leaderboard</button>
        </div>
       
        <div className="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <Reorder.Group values={advocacyData} onReorder={setAdvocacyData}>
              
            <table className="min-w-full leading-normal">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white text-black bg-gray-300">
                What is this? 👀
                <p className="mt-1 text-sm font-normal text-gray-900 dark:text-gray-900">
                 The FP&A Week Employee Advocacy Leaderboard updates every <strong>5 seconds</strong></p>
                  <p className="border-b-2 pb-5 border-gray-200 mt-1 text-sm font-normal text-gray-900 dark:text-gray-900">
                  </p>
                  <p className="font-semibold pt-5 text-lg text-center">Last update:</p>
                  <p className="font-normal text-sm text-center">{dateStr}</p>
            </caption>
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Employee UTM
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  </th>
                </tr>
              </thead>
              
              
              <tbody>
                {sortedData.map(advodate =>   
                 
                <Reorder.Item as="tr" key={advodate[0]} value={advodate[1]}>
                 
                  <td className="px-5 hover:bg-gray-100 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 text-left whitespace-no-wrap">{advodate[0]}</p>
                  </td>

                  
                  <td className="px-5 py-5 hover:bg-gray-100 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{advodate[1]}</p>
                    <p className="text-gray-600 whitespace-no-wrap">clicks</p>
                  </td>
                  <td className="px-5 py-5 hover:bg-gray-100 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block text-2xl py-3 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                      <span className="relative">{advodate[3]}</span>
                    </span>
                  </td>
                  
                </Reorder.Item> )}
               

                
                </tbody>
                
            </table>
            
            </Reorder.Group>
          </div>
        </div>
      </div>
      
  </div>
  );

} 


export default App;
