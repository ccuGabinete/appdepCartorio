import { Lacre } from '../lacre/lacre';

export class Instituicao {
  bairro: string;
  cep: string;
  cnpj: string;
  codigo: string;
  complemento: string;
  cpf: string;
  data: Date;
  endereco: string;
  estado = 'RJ';
  id: string;
  lacres: Array<Lacre>;
  municipio: string;
  numero: string;
  processo: string;
  responsavel: string;
  razaosocial: string;
  matricula: string;
}
