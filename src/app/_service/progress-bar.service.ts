import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  
  progressBarReactiva = new Subject<boolean>();
  constructor() {}
  
}
