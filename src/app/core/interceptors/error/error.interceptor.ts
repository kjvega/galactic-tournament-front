import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AlertService} from '../../../shared/services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const type = error.error?.type;
      const message = error.error?.message || 'Error inesperado.';

      switch (type) {
        case 'ALREADY_EXISTS':
          alertService.showAlert('warning', 'La especie ya existe.');
          break;

        case 'NOT_FOUND':
          alertService.showAlert('info', 'La especie no fue encontrada.');
          break;

        case 'TOTAL_TIE':
          alertService.showAlert('info',  'La batalla terminó en empate.');
          break;

        case 'BATTLE_PERSISTENCE_ERROR':
          alertService.showAlert('error', 'Error al guardar la batalla.');
          break;

        default:
          switch (error.status) {
            case 404:
              alertService.showAlert('warning', 'Recurso no encontrado.');
              break;
            case 409:
              alertService.showAlert('warning', 'Conflicto detectado.');
              break;
            case 500:
              alertService.showAlert('error', 'Error interno del servidor.');
              break;
            default:
              alertService.showAlert('error', message);
          }
          break;
      }
      return throwError(() => error);
    })
  );
};
