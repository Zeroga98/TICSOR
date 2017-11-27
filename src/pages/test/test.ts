import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { LessonsPage } from '../../pages/lessons/lessons';
import { TemaryService } from '../../services/temary.service';
import { TokenService } from '../../services/token-services';
import { EvaluateService } from '../../services/evaluate.service';

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
	public evaluateId = 1;
	title = "";
	subtitle = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, private temaryService: TemaryService, private tokenService: TokenService, private alertCtrl: AlertController, private evaluateService: EvaluateService) {
		this.reproduce = "play";

		if (navParams.get("type") == 1) {
			evaluateService.getQuestions(this.evaluateId)
				.subscribe((data) => {
					this.questions = this.randomQuestions(data.result);
					console.log(this.questions);
				});
		} else {
			this.temary = navParams.get("temary");
			temaryService.getTest(this.temary.id)
				.subscribe((data) => {
					this.questions = this.randomQuestions(data.result);
					console.log(this.questions);
				});
		}
	}

	presentAlert(type) {
		if (type == 'bad') {
			this.title = '¡Oh Oh!';
			this.subtitle = 'Te has equivocado :(';
		} else if (type == 'wrong') {
			this.title = 'Te has quedado sin vidas';
			this.subtitle = 'Repasa la temática e inténtalo de nuevo.';
		} else if (type == 'good') {
			this.title = 'Felicidades';
			this.subtitle = 'Has completado con éxito la temática.';
		}
		let alert = this.alertCtrl.create({
			title: this.title,
			subTitle: this.subtitle,
			buttons: ['Continuar']
		});
		alert.present();
	}

	ionViewDidLoad() {
	}

	public response() {
		let responseCorrectId = this.responseCorrect();
		let stateTest = "";

		if (this.questions[this.questionIndex].select != responseCorrectId) {
			//Respondio mal
			stateTest = 'bad';
			this.life--;
			if (this.life == 0) {
				//Perdio empieza de nuevo
				stateTest = 'wrong';
				this.presentAlert(stateTest);
				this.navCtrl.pop();
				return;
			}
			this.presentAlert(stateTest);
		}

		if (this.questionIndex < this.questions.length - 1) {
			this.questionIndex++;
		} else {
			//Terminar el juego
			let total_response = this.questions.length - (3 - this.life);
			let total = (total_response * 10) / this.questions.length;
			let token: any = this.tokenService.getPayload();

			if (this.navParams.get("type") == 1) {
				this.evaluateService.response(token.correo, this.evaluateId, total)
				.subscribe((data) => {
					//Notificar que termina el juego
					stateTest = 'good';
					this.presentAlert(stateTest);
					this.navCtrl.setRoot(LessonsPage);
				});
			} else {
				this.temaryService.response(token.correo, this.temary.id, total)
				.subscribe((data) => {
					//Notificar que termina el juego
					stateTest = 'good';
					this.presentAlert(stateTest);
					this.navCtrl.setRoot(LessonsPage);
				});
			}
			
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

	private responseCorrect() {
		for (let i = 0; i < this.questions[this.questionIndex].respuesta.length; ++i) {
			if (this.questions[this.questionIndex].respuesta[i].correcta == 1) {
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
