import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LessonsPage } from '../../pages/lessons/lessons';
import { TemaryService } from '../../services/temary.service';
import { TokenService } from '../../services/token-services';

@Component({
	selector: 'page-test',
	templateUrl: 'test.html',
})
export class TestPage {

	public reproduce;
	public temary;
	public questions;
	public questionIndex = 0;
	public life = 3;

	constructor(public navCtrl: NavController, public navParams: NavParams, private temaryService: TemaryService, private tokenService: TokenService) {
		this.reproduce = "play";
		this.temary = navParams.get("temary");
		
		temaryService.getTest(this.temary.id)
			.subscribe((data) => {
				this.questions = this.randomQuestions(data.result);
				console.log(this.questions);
			});
	}

	ionViewDidLoad() {
	}

	public response() {
		let responseCorrectId = this.responseCorrect();

		if(this.questions[this.questionIndex].select != responseCorrectId){
			//Respondio mal
			this.life--;
			if(this.life == 0){
				//Perdio empieza de nuevo
				this.navCtrl.pop();
			}
		}else {
			//Respondio bien
		}

		if (this.questionIndex < this.questions.length - 1) {
			this.questionIndex++;
		} else {
			//Terminar el juego
			let total_response = this.questions.length - (3 - this.life);
			let total = (total_response * 10)/this.questions.length;
			let token: any = this.tokenService.getPayload();

			this.temaryService.response(token.correo, this.temary.id, total)
			.subscribe((data) => {
				//Notificar que termina el juego
				this.navCtrl.setRoot(LessonsPage);
			});
		}
	}

	public reproduceVideo(i) {
		(this.reproduce == "play") ? this.reproduce = "pause" : this.reproduce = "play";
		let vid: any = document.getElementById("video-" + i);

		let element = document.getElementById("video-" + i);

		if (!element.onended) {
			element.onended = () => {
				(this.reproduce == "play") ? this.reproduce = "pause" : this.reproduce = "play";
			};
		}
		if (this.reproduce == "play") {
			vid.pause();
		} else {
			vid.play();
		}
	}

	private responseCorrect(){
		for (let i = 0; i < this.questions[this.questionIndex].respuesta.length; ++i) {
			if(this.questions[this.questionIndex].respuesta[i].correcta == 1){
				return this.questions[this.questionIndex].respuesta[i].id;
			}
		}
	}

	private randomQuestions(array) {
		let array_random = [];

		while (array.length > 0) {
			let random = Math.floor(Math.random() * array.length);
			if (array[random].images) {
				array[random].images = JSON.parse(array[random].images);
			}
			array[random].respuesta = JSON.parse(array[random].respuesta);
			array[random].life = 3;
			array[random].select = 0;
			array_random.push(array[random]);
			array.splice(random, 1);
		}
		return array_random;
	}

}
