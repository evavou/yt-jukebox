export const TAG_COLORS = {  
    //couleurs des tags
  all:          '#db0000',
  house:        '#4c1569',
  energy:       '#6b1663',
  jazz:         '#991b5b',
  chill:        '#ca1d51',
  lofi:         '#f16f44',
  peace:        '#e7b053',
  ambient:      '#bac563',
  ost:          '#79cb73',
  games:        '#2ca86d',
  nintendo:     '#10775b',
  japan:        '#0d5154',
  wtf:          '#113a58',
  french:       '#10235b'
};

// Fonction pour obtenir les couleurs d'un tag
export const getTagColor = (tagName) => {
  const normalizedTag = tagName.toLowerCase();
  return TAG_COLORS[normalizedTag] || TAG_COLORS.all;
};

export const getLightTagColor = (color) => {
  return `color-mix(in srgb, ${color} 20%, white 80%`;
};

export const getDarkTagColor = (color) => {
  return `color-mix(in srgb, ${color} 50%, black 50%`;
};
