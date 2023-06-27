import Swal from 'sweetalert2';
import {
  PersonalAcademico,
  PersonalAcademicoItem,
  AsesorExterno,
  AsesorExternoItem,
} from '@modules/consejo_tutelar/types';

import Validadores from '././reglasConformacionCT';

export type ValidadorCT = {
  maximoIntegrantes: number;
  maximoExternoOpcional: number;
  codirector: {
    requerido: boolean;
    maximoExterno: number;
  };
};

export class ConformacionCT {
  private _internosItems: PersonalAcademicoItem[];
  private _externosItems: AsesorExternoItem[];
  private _validador: ValidadorCT;
  public programa: 'maestria' | 'doctorado';

  constructor(
    programa: 'maestria' | 'doctorado' = 'maestria',
    internosItems: PersonalAcademicoItem[] = [],
    externosItems: AsesorExternoItem[] = []
  ) {
    this._internosItems = internosItems;
    this._externosItems = externosItems;
    this._validador = programa === 'maestria' ? Validadores[0] : Validadores[1];
    this.programa = programa;
  }

  get internos() {
    return this._internosItems;
  }

  get externos() {
    return this._externosItems;
  }

  codirectoresEstanCompletos() {
    return (
      this._externosItems.filter(e => e.idParticipacion == 33).length ==
      this._validador.codirector.maximoExterno
    );
  }

  asesoresExternosEstanCompletos() {
    return this._externosItems.length == this._validador.maximoExternoOpcional;
  }

  integrantesEstanCompletos() {
    const numbIntegrantes =
      this._internosItems.length + this._externosItems.length;
    return numbIntegrantes == this._validador.maximoIntegrantes;
  }

  integrantesExternosEstanCompletos() {
    if (this.integrantesEstanCompletos()) return true;
    const numCodirector = this._validador.codirector.requerido
      ? this._validador.codirector.maximoExterno
      : 0;
    const numExternos = this._validador.maximoExternoOpcional - numCodirector;
    if (numExternos == 0) return true;
    return (
      this._externosItems.filter(e => e.idParticipacion == 2).length ==
      numExternos
    );
  }

  removeInterno(index: number, handleDisabled: () => void) {
    this._internosItems.splice(index, 1);
    handleDisabled();
  }

  removeExterno(index: number, handleDisabled: () => void) {
    this._externosItems.splice(index, 1);
    handleDisabled();
  }

  addInterno(integrante: PersonalAcademico, handleDisabled: () => void) {
    const index = this._internosItems.findIndex(
      interno => interno.id === integrante.id
    );
    if (index === -1) {
      const integranteItem = integrante as PersonalAcademicoItem;
      integranteItem.aprobadoPorComite = false;
      this._internosItems.push(integranteItem);
      handleDisabled();
    }
  }

  private checkCodirector() {
    if (this.codirectoresEstanCompletos()) {
      Swal.fire({
        icon: 'error',
        title: 'Codirectores completos',
        text: 'Ya ha seleccionado el maximo permitido de integrantes codirectores',
      });
      return true;
    }
    return false;
  }

  private checkAsesorExterno() {
    if (this.integrantesExternosEstanCompletos()) {
      const codirectorCompleto = this.codirectoresEstanCompletos();
      const msg =
        this._validador.codirector.requerido && !codirectorCompleto
          ? 'Hacen falta los codirectores requeridos'
          : 'Su consejo tutelar ya cuenta con el maximo permitido de asesores externos';
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar integrante externo',
        text: msg,
      });
      return true;
    }
    return false;
  }

  addExterno(integrante: AsesorExterno): boolean {
    const index = this._externosItems.findIndex(
      externo => JSON.stringify(integrante) === JSON.stringify(externo)
    );
    if (index == -1) {
      if (integrante.idParticipacion == 33) {
        if (this.checkCodirector()) return false;
      } else if (this.checkAsesorExterno()) return false;

      const integranteItem = integrante as AsesorExternoItem;
      integranteItem.aprobadoPorComite = false;
      this._externosItems.push(integranteItem);
      return true;
    }
  }
}
