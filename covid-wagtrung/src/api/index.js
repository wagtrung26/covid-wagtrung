import axios from "axios";
import { getGeo } from "geoplugin";

export default function load() {
   alert("api ne")
}

export function loadCountryName(countryName) {
   if (countryName)
      alert(`your country is ${countryName}`)
}

// var userCountry = {name:"", code: "", continent: ""}
// get user country base on ip
export const yourCountry = () => {
   return getGeo()
}

export const getAllCountries = () => {

   let url = 'https://disease.sh/v3/covid-19/countries'
   return axios.get(url)

}