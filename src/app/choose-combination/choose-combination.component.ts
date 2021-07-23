import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-combination',
  templateUrl: './choose-combination.component.html',
  styleUrls: ['./choose-combination.component.css']
})
export class ChooseCombinationComponent implements OnInit {

  input_array = new Array();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkInput(){
    var lsMsg = '';
    let input_error: Boolean = false;

    let five_points = parseInt((<HTMLInputElement>document.getElementById("five-points")).value);
    let ten_points = parseInt((<HTMLInputElement>document.getElementById("ten-points")).value);
    let fifteen_points = parseInt((<HTMLInputElement>document.getElementById("fifteen-points")).value);

    if((!five_points) || (!ten_points) || (!fifteen_points)){
      lsMsg += 'Morate popuniti sva polja. Ukoliko ne želite pitanja određene kategorije bodova potrebno je upisati 0.\n';
      input_error = true;
    }

    if ((five_points < 0) || (ten_points < 0) || (fifteen_points < 0)){
      lsMsg += 'Unijeli ste negativnu vrijednost. \n';
      input_error = true;
    }

    if(five_points + ten_points + fifteen_points != 10){
      lsMsg += 'Zbroj vaših unosa nije jednak 10. Potrebno je odabrati 10 pitanja!';
      input_error = true;
    }

    if(input_error){
      window.alert(lsMsg);
      return -1;
    }else{
      this.input_array.push(five_points);
      this.input_array.push(ten_points);
      this.input_array.push(fifteen_points);
      return 1;
    }
  }

  goNext(){
    if (this.checkInput() > 0) {
      this.router.navigate(['novaigra/pitanja'], {queryParams: {userInput: this.input_array}});
    }
  }

}
