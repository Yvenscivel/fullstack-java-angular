import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private readonly API = "http://localhost:8080/api/produtos";
  private http = inject(HttpClient);

  listarTodos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.API);
  }

  criar(produto:Produto): Observable<Produto>{
    return this.http.post<Produto>(this.API, produto);
  }

  alterar(id:number, produto:Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.API}/${id}`, produto);
  }

  deletar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}