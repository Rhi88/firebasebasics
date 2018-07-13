import { Component } from '@angular/core';


import{AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarios:Observable<any[]>;

  constructor(db: AngularFirestore){
    this.usuarios =db.collection('use').valueChanges();
  }
  ngOnInit() {
    this.createIDs(this.usuarios);
  }
  createIDs(usuarios): void {
    for(let usuario of usuarios){
      const   FIRST_TWO_CHARACTERS=usuario.primer_apellido.substring(1,3);
      const   SECOND_TWO_CHARACTERS=usuario.segundo_apellido.substring(1,3);
      const   THIRD_TWO_CHARACTERS=usuario.nombre.substring(1,3);
      const   FIRST_PART=FIRST_TWO_CHARACTERS+SECOND_TWO_CHARACTERS+THIRD_TWO_CHARACTERS;
      usuario.string_id =FIRST_PART.toUpperCase();
      usuario.update(usuario);
    }
  }
}
