import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { FieldInterface } from '../../pages/node-type/entities/interfaces/field.interface';
import { FieldService } from '../services/field/field.service';

@Injectable()
export class FieldsResolver implements Resolve<FieldInterface[]> {
  constructor(private service: FieldService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FieldInterface[]> {
    return this.service.getFields();
  }
}
