import {getLanguage} from '@/utils/globals';
const language = getLanguage();
type TYiiLangKeys = 'pt_BR';

const langCardmigo = {
  pt_BR: {
    textNotFound: 'Nenhum registro econtrado',
  },
};
type TYiiLangCardmigoMessageKey = keyof typeof langCardmigo.pt_BR;
const cardmigo = (messageKey: TYiiLangCardmigoMessageKey) => langCardmigo[language as TYiiLangKeys]?.[messageKey] || '';

export default {cardmigo};
