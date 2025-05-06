import './PartnerCard.css'
import { useEffect, useState } from 'react';

import { ChevronDown } from 'react-bootstrap-icons';

import UnityDiv from '../../components/UnityDiv/UnityDiv';

import defaultLogo from '../../assets/images/logos/logo-default.jpg' 

const logos = require.context('../../assets/images/logos', false, /\.(png|jpe?g|svg)$/);

export default function PartnerCard({ unit, id, onClick, isOpen }) {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false);
  const [realAddresses, setRealAddresses] = useState([]);
  const [realContacts, setRealContacts] = useState([]);

  let logo;

  try {
    logo = logos(`./${unit.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '')}.svg`);
  } catch (e) {
    logo = defaultLogo; // fallback se não achar
  }

  useEffect(() => {
    const filledAddresses = Object.values(unit.endereco || {}).filter(adress => adress?.bairro?.trim() !== "");
    const filledContacts = Object.values(unit.contat || {}).filter(contat => contat?.trim() !== "");

    setRealAddresses(filledAddresses);
    setRealContacts(filledContacts);
  }, [unit]);

  return (
    <div className={`partner-card ${id}-${unit.area}`}>
      <button onClick={() => {
        onClick && onClick(`${id}-${unit.area}`);
      }} className='accordion-header'>
        <div>
          <img src={logo}/>
          <div className='accordion-header-content'>
            <h2 className='card-title'>{unit.name}</h2>
            <div>
              <p className='caption'>{Object.keys(realAddresses || {}).length} Unidade{Object.keys(realAddresses || {}).length > 1 ? "s" : ""}</p>
              <p className='caption'>{unit.desconto === "Variados" ? "Descontos Variados" :
              (unit.desconto.toLowerCase().includes("até") ? `Até ${parseInt(unit.desconto.replace(/[^\d]/g, ''))}% de Desconto` : `Até ${unit.desconto}% de Desconto`) }</p>
            </div>
          </div>
        </div>
        <span className='ico-button'>
          <ChevronDown className={`headline6 ${isOpen ? 'rotated' : ''}`} />
        </span>
      </button>

      <div className={`accordion ${isOpen ? "accordion-open" : ""}`}>
        {realAddresses.map((adress, index) => (
          <div className={index > 0 ? "above-unity" : ""} key={index}>
            <UnityDiv numberControler={index + 1} unitAdress={adress} unitContact={realContacts} />
          </div>
        ))}
      </div>
    </div>
  );
}
