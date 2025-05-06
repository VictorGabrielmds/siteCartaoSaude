import './UnityDiv.css'

import {GeoAltFill} from 'react-bootstrap-icons';
import {Whatsapp} from 'react-bootstrap-icons';
import {TelephoneFill} from 'react-bootstrap-icons';


export default function UnityDiv({numberControler, unitAdress, unitContact}){
  return(
    <div className='unity-div'>
      <h4 className='body-1-m'>{numberControler+" - "+unitAdress.bairro}</h4>
      <div className='unity-div-buttons'>
        <button 
          onClick={() => {
            const address = `${unitAdress.complemento}, Nº ${unitAdress.numero}, ${unitAdress.bairro}`;
            const query = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
          }} 
          className='button-2'
          >
          <GeoAltFill className='icon headline6'/>
          {unitAdress.complemento+", Nº"+unitAdress.numero+", "+unitAdress.bairro}
        </button>
        <div>
          {
            unitContact.map((contact, index) => (
              <button
                className='button-2'
                key={index}
                onClick={() => {
                  const phone = contact.replace(/\D/g, ''); // remove tudo que não for número
                  if (index === 0) {
                    // ligação
                    window.location.href = `tel:${phone}`;
                  } else {
                    // WhatsApp
                    window.open(`https://wa.me/${phone}`, '_blank');
                  }
                }}
              >
                {index === 0 ? <TelephoneFill className='icon headline6' /> : <Whatsapp className='icon headline6' />}
                {contact}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}