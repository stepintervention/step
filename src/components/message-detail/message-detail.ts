import { Component, Input, NgModule,ViewChild} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


/**
 * Generated class for the MessageDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
 @Component({
 	selector: 'message-detail',
 	templateUrl: 'message-detail.html'
 })
 export class MessageDetailComponent {

 	@Input() msg: AngularFireAction<DatabaseSnapshot>;
 	@ViewChild(Content) pageContent: Content;

 	private todo : FormGroup;

 	survey = [];

 	likert = [5, 5, 5];
 	mcq = [1];
 	field = ["KEKEEKE"];

 	text: string;

 	title : string;
 	content : string;
 	sections : [any];
 	displayedSections = [];
 	progressIndex = 0;
 	time : any;

 	constructor(private formBuilder: FormBuilder) {
 		this.todo = this.formBuilder.group({
 			title: ['', Validators.required],
 			description: [''],
 			field0: [this.field[0]],
 			likert0: [this.likert[0]],
 			likert1: [this.likert[1]],
 			mcq0: [this.mcq[0]]
 		});	
 	}

 	ngOnChanges(changes: any) {
 		this.content = this.msg.payload.val().content;
 		console.log("content: " + this.content);
 		this.sections = this.msg.payload.val().sections;
 		console.log("length: " + this.sections.length);
 		this.time = this.msg.payload.val().time;
 		this.displayedSections.push(this.sections[0]);
 	}

 	logForm(idx: number){
 		if (idx == this.progressIndex && this.progressIndex < this.sections.length - 1) {
 			this.progressIndex++;
 			this.displayedSections.push(this.sections[this.progressIndex]);
 			this.scrollTo("section" + idx);
 		}
 		console.log("index == " + idx);
 	}

 	scrollTo(elementId:string) {
 		//let yOffset = document.getElementById(elementId).offsetTop + document.getElementById(elementId).offsetHeight;
 		//this.pageContent.scrollTo(0, yOffset, 4000);
 	}

 	updateMCQChoice(questionID: number, selected: number) {
 		this.mcq[questionID] = selected;
 	}

 }


