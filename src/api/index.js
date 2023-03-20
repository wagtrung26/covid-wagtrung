import axios from "axios";
import { getGeo } from "geoplugin";


export const yourCountry = () => {
   return getGeo()
}

export const getAllCountries = () => {

   let url = 'https://disease.sh/v3/covid-19/countries'
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })

}

export const getHistoricalCountry = (countryCode) => {
   let url = `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })
}

export const getTotalContinent = (continentName) => {
   let url = `https://disease.sh/v3/covid-19/continents/${continentName}?strict=true`
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })
}
//vaccine
export const getHistoricalCountryVaccine = (countryCode) => {

   let url = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=all&fullData=false`
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })
}

export const getForCountry = (countryCode,continentName)=>{
  return axios.all([
      getHistoricalCountry(countryCode),
      getHistoricalCountryVaccine(countryCode),
      getTotalContinent(continentName),
   ])
}

// WORLD VIEW
export const getTotalWorld = () => {

   let url = 'https://disease.sh/v3/covid-19/all'
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })

}

export const getHistoricalWorld = () => {

   let url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })

}

export const getTotalContinents = () => {

   let url = 'https://disease.sh/v3/covid-19/continents'
   return axios({
      method: 'get',
      url: url,
      withCredentials: false,
      
    })

}


