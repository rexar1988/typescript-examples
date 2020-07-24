import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import { environment } from '~/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NodeTypeInterface } from '~/app/pages/structure/pages/node-type/entities/interfaces/node-type.interface';
import { NodeTypeCreateInterface } from '~/app/pages/structure/pages/node-type/entities/interfaces/node-type-create.interface';
import { NodeTypeMachineNameInterface } from '~/app/pages/structure/pages/node-type/entities/interfaces/node-type-machine-name.interface';

@Injectable()
export class NodeTypeService {
  private url = `${environment.adminApi}/nodetype`;

  constructor(private httpClient: HttpClient) { }

  getNodeTypes(): Observable<NodeTypeInterface[]> {
    return this.httpClient.get<NodeTypeInterface[]>(this.url);
  }

  getNodeTypeById(id: number, showFields: boolean = false): Observable<NodeTypeInterface> {
    let params;

    if (showFields) {
      params = new HttpParams().set('fields', 'true');
    }

    return this.httpClient.get<NodeTypeInterface>(`${this.url}/${id}`, { params });
  }

  createNodeType(model: NodeTypeCreateInterface): Observable<NodeTypeCreateInterface> {
    return this.httpClient.post<NodeTypeCreateInterface>(this.url, model);
  }

  updateNodeType(id: number, model: NodeTypeInterface): Observable<null> {
    return this.httpClient.put<null>(`${this.url}/${id}`, model);
  }

  deleteNodeType(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${id}`);
  }

  hasMachineNameAlreadyTaken(machineName: string): Observable<ValidationErrors | null> {
    return this.httpClient.get<ValidationErrors | null>(`${this.url}/machine-name/${machineName}`)
      .pipe(map((item: NodeTypeMachineNameInterface) => item ? { machineNameHasAlreadyTaken: true } : null));
  }
}
