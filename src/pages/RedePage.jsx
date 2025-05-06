import PartnerList from "../assembled/PartnerList/PartnerList";
import ScroolButtons from "../components/ScroolButtons/ScroolButtons";
import Header from "../assembled/Header/Header";
import SearchInput from "../components/SearchInput/SearchInput"

import '../App.css'
import { useEffect, useState } from "react";

export default function RedePage(){

  const [area, setArea] = useState("medica")
  const [searchPartner, setSearchPartner] = useState("")

  console.log(searchPartner == "")

  return(
    <div className="RedePage">
      <Header/>
      <SearchInput value={searchPartner} onChange={(e) => setSearchPartner(e.target.value)} />
      <ScroolButtons _area={area} _onClick={setArea} _disabled={searchPartner !== "" && searchPartner !== " " && searchPartner !== null }/>
      <PartnerList search={searchPartner} _area={area}/>
    </div>
  )
}