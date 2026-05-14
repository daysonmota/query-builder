import {knex as knexConfig} from 'knex' //Importa a função construtora do Knex
import config  from '../../knexfile' //Importa as configuraçoes do banco de dados.

export const knex = knexConfig(config)
