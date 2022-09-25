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

export function yourCountry(){
   return getGeo()
}
