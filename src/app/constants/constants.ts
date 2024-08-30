// src/app/constants/constants.ts

export const APP_CONSTANTS = {
  
    TITLE_QUESTIONS: [
      { title: "¿Cuánta experiencia laboral tienes?" },
      { title: "¿Estás estudiando?" }
    ],
  
    QUESTIONS: [
      [ // Grupo 1
        { label: 'No cuento con experiencia', placeholder: 'No cuento con experiencia', id: 'sinExperiencia' },
        { label: 'Entre 0 y 2 años', placeholder: 'Entre 0 y 2 años', id: 'ceroadosaños' },
        { label: 'Entre 2 y 5 años', placeholder: 'Entre 2 y 5 años', id: 'dosacincoaños' },
        { label: 'Más de 5 años', placeholder: 'Más de 5 años', id: 'masdecinco' }
      ],
      [ // Grupo 2
        { label: 'Si', placeholder: 'Si', id: 'Si' },
        { label: 'No', placeholder: 'No', id: 'No' }
      ]
      // Agrega más grupos según sea necesario
    ]
  };
  