import axios from "axios";
import { getGeo } from "geoplugin";

export default function load()
{
   alert("api ne")
}

export function loadCountryName(countryName)
{
      if(countryName)
      alert(`your country is ${countryName}`)
}

// var userCountry = {name:"", code: "", continent: ""}
// get user country base on ip
export function yourCountry(){
   return getGeo()
}

export const getAllCountries = async () =>{

   let  allCountries , url
   url = 'https://disease.sh/v3/covid-19/countries'
   allCountries = await axios.get(url)
   return allCountries

}