export interface Jelentkezes {
  id?: number;
  nev: string;
  email: string;
  telefonszam: string;
  kepzettseg: number;
  vegzettseg: string;
  tapasztalatEv: number;
  allasId: string;
  fizetesiIgeny?: number;
  oneletrajz: File | string;
  motivaciosLevel?: string;
  egyebMegjegyzes?: string;
  jelentkezesIdopont?: Date;
  statusz?: JelentkezesStatusz;
}

export enum JelentkezesStatusz {
  UJ = 'új',
  FELDOLGOZAS_ALATT = 'feldolgozás alatt',
  INTERJU = 'interjú',
  ELUTASITVA = 'elutasítva',
  ELFOGADVA = 'elfogadva'
}

export interface Allas {
  id: string;
  cim: string;
  leiras: string;
  ceg: string;
  hely: string;
  tipus: string; // pl. teljes munkaidő, részmunkaidő, távmunka
  kategoria: string;
  fizetesiSav?: string;
  publikalvaDate: Date;
  lejarDate?: Date;
  aktiv: boolean;
}

export interface Kepzettseg {
  id: number;
  nev: string;
}

export interface TapasztalatEv {
  id: number;
  nev: string;
}
