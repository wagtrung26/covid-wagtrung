import axios from "axios";
import { getGeo } from "geoplugin";


export const yourCountry = () => {
   return getGeo()
}

export const getAllCountries = () => {

   let url = 'https://disease.sh/v3/covid-19/countries'
   return axios.get(url)

}

export const getHistoricalCountry = (countryCode) => {
   let url = `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=all`
   return axios.get(url)
}

export const getTotalContinent = (continentName) => {
   let url = `https://disease.sh/v3/covid-19/continents/${continentName}?strict=true`
   return axios.get(url)
}
//vaccine
export const getHistoricalCountryVaccine = (countryCode) => {

   let url = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${countryCode}?lastdays=all&fullData=false`
   return axios.get(url)
}

// WORLD VIEW
export const getTotalWorld = () => {

   let url = 'https://disease.sh/v3/covid-19/all'
   return axios.get(url)

}

export const getHistoricalWorld = () => {

   let url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
   return axios.get(url)

}

export const getTotalContinents = () => {

   let url = 'https://disease.sh/v3/covid-19/continents'
   return axios.get(url)

}


