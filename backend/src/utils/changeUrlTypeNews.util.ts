export const changeUrlTypeNews = (type: string, index: number) => {
  let url = 'https://www.ansa.it/sicilia/notizie/';

  switch (type.toLowerCase()) {
    case 'cronaca':
      return index === 1
        ? (url += `cronaca.shtml`)
        : (url += `cronaca_${index}.shtml`);

    case 'politica':
      return index === 1
        ? (url += `politica.shtml`)
        : (url += `politica_${index}.shtml`);

    case 'economia':
      return index === 1
        ? (url += `economia.shtml`)
        : (url += `economia_${index}.shtml`);

    case 'cultura':
      return index === 1
        ? (url += `cultura.shtml`)
        : (url += `cultura_${index}.shtml`);

    case 'sport':
      return index === 1
        ? (url += `sport.shtml`)
        : (url += `sport_${index}.shtml`);

    case 'viaggi':
      return index === 1
        ? (url += `viaggi.shtml`)
        : (url += `viaggi_${index}.shtml`);

    case 'sanità regionale':
      return index === 1
        ? (url += `sanita_regionale/index.shtml`)
        : (url += `sanita_regionale/index_${index}.shtml`);
  }
};
