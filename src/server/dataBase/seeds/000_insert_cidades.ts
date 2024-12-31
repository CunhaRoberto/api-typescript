import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';



export const seed = async (knex : Knex) => {

   const [{count}] = await knex(ETableNames.cidade).count<[{ count: number}]>('* as count')
    if(!Number.isInteger(count) || Number(count) > 0) return 

    const cityToInsert = listaCidades.map(nomeDaCidade => ({nome : nomeDaCidade}));
    await knex(ETableNames.cidade).insert(cityToInsert)

}

const listaCidades = [
           
    "Amapá",
    "Calçoene",
    "Cutias",
    "Ferreira Gomes",
    "Itaubal",
    "Laranjal do Jari",
    "Macapá",
    "Mazagão",
    "Oiapoque",
    "Pedra Branca do Amapari",
    "Porto Grande",
    "Pracuúba",
    "Santana",
    "Serra do Navio",
    "Tartarugalzinho",
    "Vitória do Jari"       
      
]

//lista de cidades do brasil: https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json