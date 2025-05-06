import './ScroolButtons.css';
import { useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function ScroolButtons({_area ,_onClick, _disabled}) {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);
  const [disabledButtons, setDisabledButtons] = useState(false);

  // visibilidade das setas
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // sincroniza desabilitação
  useEffect(() => {
    setDisabledButtons(_disabled);
  }, [_disabled]);

  // define deslocamento por clique
  const SCROLL_AMOUNT = 150;

  const areas = [
    ['Clínica Médica','medica'],
    ['Obstetria e Ginecologia', 'obstetria'],
    ['Laboratório','laboratorio'],
    ['Clínica de Diagnostico','diagnostico'],
    ['Farmácia','farmacia'],
    ['Farmácia de Manipulação','manipulacao'],
    ['Estética','estetica'],
    ['Odontologia','odontologia'],
    ['Oftalmologia','oftalmologia'],
    ['Psicologia','psico'],
    ['Fisioterapia','fisioterapia'],
    ['Diversas','diversas']
  ];

  // atualiza visibilidade das setas com base na posição de scroll
  const updateArrows = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  // bind do scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // inicia estado correto
    updateArrows();
    container.addEventListener('scroll', updateArrows, { passive: true });
    // cleanup
    return () => container.removeEventListener('scroll', updateArrows);
  }, []);

  // rolagem genérica
  const scrollContainerBy = (offset) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // clique em área: dispara onClick e centraliza botão
  const handleAreaClick = (areaKey, index) => {
    _onClick(areaKey);
    const container = containerRef.current;
    const button = buttonRefs.current[index];
    if (container && button) {
      container.scrollTo({
        left: button.offsetLeft - (container.clientWidth - button.clientWidth) / 2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="ScroolButtons-wrapper">
      {showLeft && (
        <div className="scroll-btn esquerda">
          <button
            onClick={() => scrollContainerBy(-SCROLL_AMOUNT)}
            disabled={disabledButtons}
            aria-label="Scroll esquerda"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      )}

      <div className="ScroolButtons" ref={containerRef}>
        {areas.map((area, index) => (
          <button
            key={area[1]}
            ref={el => buttonRefs.current[index] = el}
            className={`button-1 ${_area === area[1] ? "active" : ""}`}
            onClick={() => handleAreaClick(area[1], index)}
            disabled={disabledButtons}
          >
            {area[0]}
          </button>
        ))}
      </div>

      {showRight && (
        <div className="scroll-btn direita">
          <button
            onClick={() => scrollContainerBy(SCROLL_AMOUNT)}
            disabled={disabledButtons}
            aria-label="Scroll direita"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
