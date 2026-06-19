type TLanguage = 'en' | 'es' | 'pt_BR';

export function getLanguage(): TLanguage {
  return (getWindowLocalStorage().getItem('language') || 'pt_BR') as TLanguage;
}

function getWindowLocalStorage() {
  return typeof window === 'undefined'
    ? ({
        getItem: (v) => v,
      } as Storage)
    : window.localStorage;
}
