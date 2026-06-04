import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RA2RA3ExJordiMunozRecus');

  constructor(private http: HttpClient) {
  }

  ex1() {
    this.http.get<any>('http://localhost:3000/llistaProfMunoz').subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  ex2() {
    // @ts-ignore
    this.http.post<any>('http://localhost:3000/modifCorreuMunoz/"otaku@institutvidreres.cat"').subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  ex3(){
    this.http.get<any>('http://localhost:3000/profeDOlotMunoz').subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  ex4() {
    const nouDept = {
      DEPT_CODI: 6,
      DEPT_NOM: 'EXAMEN',
      DEPT_UBICACIO: 'GIRONA',
      DEPT_TELEFON: '621276401',
      DEPT_PROF_DNI: 3214
    }
    this.http.post("http://localhost:3000/nouDeptMunoz", nouDept).subscribe({
      next: (res) => {
        console.log("Funciona")
        console.log(res)
      },
      error: (error) => {
        console.log("Falla")
        console.log(error)
      }
    })
  }
}
