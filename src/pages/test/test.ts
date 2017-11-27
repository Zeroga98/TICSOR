import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TemaryService } from '../../services/temary.service';
@Component({
	selector: 'page-test',
	templateUrl: 'test.html',
})
export class TestPage {

	public reproduce;
	public temary;
	public questions;
	public questionIndex = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, private temaryService: TemaryService) {
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
		if (this.questionIndex < this.questions.length) {
			this.questionIndex++;
		}
	}

	reproduceVideo(i) {
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

	private randomQuestions(array) {
		let array_random = [];

		while (array.length > 0) {
			let random = Math.floor(Math.random() * array.length);
			if (array[random].images) {
				array[random].images = JSON.parse(array[random].images);
			}
			array[random].respuesta = JSON.parse(array[random].respuesta);
			array[random].select = 0;
			array_random.push(array[random]);
			array.splice(random, 1);
		}
		return array_random;
	}

}
