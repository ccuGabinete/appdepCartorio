import { Igrupo } from '../../interfaces/igrupo/igrupo';
const go = console.log;

export class Grupo {
  getGrupos(): Igrupo[] {
    return [
      { tipo: 'ACESSÓRIOS AUTOMOTIVOS', grupo: '01', id: 1 },
      { tipo: 'ACESSÓRIOS DE INFORMÁTICA', grupo: '02', id: 1 },
      { tipo: 'ARTESANATO/SUVINIR', grupo: '03', id: 1 },
      { tipo: 'BARRACA PADRÃO', grupo: '04', id: 2 },
      { tipo: 'BEBIDAS ALCOÓLICAS', grupo: '05', id: 1 },
      { tipo: 'BEBIDAS EM GARRFAS DE VIDRO', grupo: '06', id: 1 },
      { tipo: 'BEBIDAS NÃO ALCOÓLICAS', grupo: '07', id: 1 },
      { tipo: 'BICICLETA', grupo: '08', id: 3 },
      { tipo: 'BOLSAS E MOCHILAS', grupo: '09', id: 1 },
      { tipo: 'BOTIJÃO DE GÁS', grupo: '10', id: 1 },
      { tipo: 'BRINQUEDOS', grupo: '11', id: 1 },
      { tipo: 'BURRO SEM RABO', grupo: '12', id: 3 },
      { tipo: 'CADEIRA', grupo: '13', id: 1 },
      { tipo: 'CALÇADO', grupo: '14', id: 1 },
      { tipo: 'CARRINHO DE CARGA', grupo: '15', id: 1 },
      { tipo: 'CHURRASQUEIRA', grupo: '16', id: 2 },
      { tipo: 'ELETRODOMÉSTICO', grupo: '17', id: 1 },
      { tipo: 'ELETRÔNICOS', grupo: '18', id: 1 },
      { tipo: 'ENGENHO PUBLICITÁRIO', grupo: '19', id: 1 },
      { tipo: 'GRANDES ESTRUTURAS', grupo: '20', id: 3 },
      { tipo: 'GUARDA CHUVA', grupo: '21', id: 1 },
      { tipo: 'ISOPOR', grupo: '22', id: 1 },
      { tipo: 'LIVRO', grupo: '23', id: 1 },
      { tipo: 'MATERIAL DE PRAIA', grupo: '24', id: 1 },
      { tipo: 'MESA', grupo: '25', id: 1 },
      { tipo: 'MIDIA', grupo: '26', id: 1 },
      { tipo: 'MOENDA', grupo: '27', id: 2 },
      { tipo: 'OCULOS', grupo: '28', id: 1 },
      { tipo: 'PAPELARIA E BAZAR', grupo: '29', id: 1 },
      { tipo: 'PERECÍVEIS', grupo: '30', id: 1 },
      { tipo: 'QUENTINHA', grupo: '31', id: 1 },
      { tipo: 'QUINQUILHARIA', grupo: '32', id: 1 },
      { tipo: 'TABULEIRO', grupo: '33', id: 1 },
      { tipo: 'TRICÍCLO', grupo: '34', id: 3 },
      { tipo: 'UTENSÍLIOS DE CARROÇA', grupo: '35', id: 1 },
      { tipo: 'VEÍCULO AUTOMOTOR', grupo: '36', id: 3 },
      { tipo: 'VESTUÁRIO', grupo: '37', id: 1 }
    ];
  }

  getTipo(grupo: string): string {
    const index = this.getGrupos().findIndex(x => x.grupo === grupo);
    return this.getGrupos()[index].tipo;
  }

  getId(grupo: string): number {
    if (grupo === '00') {
      grupo = '01';
    }
    const index = this.getGrupos().findIndex(x => x.grupo === grupo);
    return this.getGrupos()[index].id;
  }
}
