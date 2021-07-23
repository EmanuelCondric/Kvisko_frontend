import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { combineLatest, Observable, Subscription, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { QuestionModel} from '../models/question.model';
import { CrudGenericService } from '../modules/oc-core/services/crud-generic.service';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.css']
})
export class QuestionComponentComponent implements OnInit{

  private subscription: Subscription = new Subscription();

  navStart: Observable<NavigationStart>;
  userFilterGroup!: FormGroup;
  @ViewChild(Table, {static: true}) dataTableComponent!: Table;

  questionArray!: QuestionModel[];
  filteredQuestionArray!: QuestionModel[];
  gameArray: QuestionModel[] = [];
  userAnswerList: String[] = [];
  rightAnswers: String[] = [];

  inputArray!: String[];

  userPoints: number = 0;
  questionNumber: number = 0;

  showedQuestion!: String;

  @ViewChild("userAnswer") userAnswer!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private crudService: CrudGenericService, private httpClient: HttpClient, private fb: FormBuilder, private modalService: NgbModal) { 
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.userFilterGroup = this.fb.group(new QuestionModel());

    this.route.queryParamMap.subscribe(params => this.inputArray = params.getAll('userInput'))

    this.navStart.subscribe(evt => {
      
      if(evt.navigationTrigger == 'imperative' && evt.url == '/game/questions'){
        this.dataTableComponent.clearState();
      }
    });

    let routeParamsObs = combineLatest(this.route.params, this.route.queryParams,
      (params, qparams) => ({ params, qparams }));

    this.subscription.add(routeParamsObs.subscribe(routeParams => {
      this.initSearchForm();
      this.getSearchResults(routeParams);
    })
    );
  }

  initSearchForm(){
    this.userFilterGroup.reset(); 
  }

  getSearchResults(routeParams: any){
    let type!: QuestionModel;

    this.crudService.retrieveEntityList(type, null!, null!, null!, 'questions').subscribe(data => {
      this.questionArray = data;
      this.getQGameList();
    });
  }

  getQGameList(){
    let question: QuestionModel;

    for(let i = 0; i < this.inputArray.length; i++){
      if(Number(this.inputArray[i]) > 0 && i==0){
        this.filteredQuestionArray = this.questionArray.filter(array => array.points == 5);
        do{
          question = this.filteredQuestionArray[Math.floor(Math.random() * this.filteredQuestionArray.length)];
          if (this.gameArray.some(x => x == question)){
            continue
          }else{
            this.gameArray.push(question);
          }
        }while (this.gameArray.length < Number(this.inputArray[i]))
        this.filteredQuestionArray = [];
      }
      if(Number(this.inputArray[i]) > 0 && i==1){
        this.filteredQuestionArray = this.questionArray.filter(array => array.points == 10);
        do{
          question = this.filteredQuestionArray[Math.floor(Math.random() * this.filteredQuestionArray.length)];
          if (this.gameArray.some(x => x == question)){
            continue
          }else{
            this.gameArray.push(question);
          }
        }while (this.gameArray.length < Number(this.inputArray[i]) + Number(this.inputArray[i - 1]))
        this.filteredQuestionArray = [];
      }
      if(Number(this.inputArray[i]) > 0 && i==2){
        this.filteredQuestionArray = this.questionArray.filter(array => array.points == 15);
        do{
          question = this.filteredQuestionArray[Math.floor(Math.random() * this.filteredQuestionArray.length)];
          if (this.gameArray.some(x => x == question)){
            continue
          }else{
            this.gameArray.push(question);
          }
        }while (this.gameArray.length < Number(this.inputArray[i]) + Number(this.inputArray[i - 1]) + Number(this.inputArray[i - 2]))
        this.filteredQuestionArray = [];
      }
    }
    // Array Shuffle
    this.gameArray = this.randomArrayShuffle(this.gameArray);
    this.showedQuestion = this.gameArray[this.questionNumber].question;
    this.rightAnswers.push(this.gameArray[this.questionNumber].answer);
  }
  randomArrayShuffle(array: QuestionModel[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  Next(){
    let userAnswer;
    var allAnswerList = [];
    userAnswer = (<HTMLInputElement>document.getElementById("userAnswer")).value;
    this.userAnswerList.push(userAnswer);
    if(userAnswer == this.gameArray[this.questionNumber].answer){
      this.userPoints = this.userPoints + this.gameArray[this.questionNumber].points;
    }
    this.questionNumber = this.questionNumber + 1;
    if(this.questionNumber <= 9){
      this.userAnswer.nativeElement.value = "";
      this.showedQuestion = this.gameArray[this.questionNumber].question;
      this.rightAnswers.push(this.gameArray[this.questionNumber].answer);
    }else{
      allAnswerList.push({userAnswers: this.userAnswerList});
      allAnswerList.push({rightAnswers: this.rightAnswers});
      allAnswerList.push({points: this.userPoints});
      this.router.navigate(['novaigra/rezultati'], {queryParams: {list: allAnswerList}});
    }
  }
}
