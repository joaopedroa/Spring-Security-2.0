import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { LoaderState } from '../../interfaces/loader-state';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);
}
