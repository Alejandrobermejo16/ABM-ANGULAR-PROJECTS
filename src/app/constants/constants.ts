export const APP_CONSTANTS = {
  
  TITLE_QUESTIONS: [
    { title: "¿Cuánta experiencia laboral tienes?" },
    { title: "¿Estás estudiando Actualmente?" },
    { title: "Describe tus habilidades y logros" } // Nueva pregunta con texto libre
  ],

  QUESTIONS: [
    [ 
      { label: 'No cuento con experiencia', placeholder: 'No cuento con experiencia', id: 'sinExperiencia' },
      { label: 'Entre 0 y 2 años', placeholder: 'Entre 0 y 2 años', id: 'ceroadosaños' },
      { label: 'Entre 2 y 5 años', placeholder: 'Entre 2 y 5 años', id: 'dosacincoaños' },
      { label: 'Más de 5 años', placeholder: 'Más de 5 años', id: 'masdecinco' }
    ],
    [ 
      { label: 'Sí', placeholder: 'Sí', id: 'si' },
      { label: 'No', placeholder: 'No', id: 'no' }
    ],
    [
      { label: 'Describe tus habilidades y logros', placeholder: 'Escribe aquí...', id: 'habilidades', description: true } // Propiedad description presente
    ],
    // Agrega más grupos según sea necesario
  ]
};
