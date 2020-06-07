import axios from 'axios';
import { useState, useEffect } from 'react';

/*
* Everything dealing with GET, POST requests
*/




export function useOnetimeAPIFetch(url, initial) {  
  const [data, setData] = useState(initial);

  useEffect(() => {
    axios.get(url).then(result => {
      setData(result.data)
    }).catch((error) => {
      //TODO
      console.log("error!" + error)
    });
  }, [url]); //will only run again if the url changes

  return data;
}