import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OverviewService {
  interval: BehaviorSubject<number> = new BehaviorSubject<number>(10);

  constructor(private http: HttpClient) {}
}
