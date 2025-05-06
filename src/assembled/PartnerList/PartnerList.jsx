import './PartnerList.css'
import { useState, useEffect } from 'react';

import db from '../../services/firebase.js'; // Também parece ter uma vírgula errada no nome do arquivo

import PartnerCard from '../PartnerCard/PartnerCard.jsx';
import { collection, onSnapshot } from 'firebase/firestore';

export default function PartnerList({_area, search}) {
  const [unityList, setUnitylist] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);

  const imma = {
    name: "Clínica Imma",
    id: "Clinica Imma",
    area:"medica",
    endereco: {
      unidade1:{
        bairro: "Monte Castelo",
        complemento: "Av. Getúlio Vargas",
        numero: "2509"
      },
      unidade2:{
        bairro: "",
        complemento: "",
        numero: ""
      }
    },
    desconto: "Até 70%",
    contat: {
      0: "98 33110101",
      1: "98 98542-4532" 
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "credenciados"), (snapshot) => {
      const unityList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if(search === "" || search === null || search === " "){
        setUnitylist(unityList.filter((unity) =>{
          return(
            unity.area === _area
          )
        }));
      } else{
        setUnitylist(unityList.filter((unity) =>{
          return(
            unity.name.toLowerCase().includes(search)
          )
        }));
      }
    });
    
    return () => unsubscribe();
  }, [_area, search]);

  function changesItemDisplay(_item) {
    setOpenItemId(prev => (prev === _item ? null : _item));
  }  

  return (
    <div className='partner-list'>
      {
        _area === "medica" && (!search || search.trim().length === 0 || "clínica imma".normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())) && (<PartnerCard isOpen={openItemId === `999-${imma.area}`} onClick={changesItemDisplay} unit={imma} id="999" key={imma.id}/>)
      }
      {unityList.map((unit, index) => (
        <PartnerCard isOpen={openItemId === `${index+1}-${unit.area}`} onClick={changesItemDisplay} id={index+1} key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
