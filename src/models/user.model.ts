import { Observable } from 'rxjs/Observable';

export class UserModel {

	names: string;
	lastname: string;
	rol: string;
	gener: string;
	picture: string;
	email: string;

	constructor() {
	}

	save(object: any): void {
		localStorage.setItem("user", JSON.stringify(object));
	}

	get(){
		let object = JSON.parse(localStorage.getItem("user"));
		this.names = object.NOMBRES;
		this.lastname = object.APELLIDOS;
		this.gener = object.GENERO;
		this.email = object.CORREO;
		this.picture = object.FOTO;
		this.rol = object.ROL;
		return this;
	}

	isUser(){
		return (localStorage.getItem("user") != null && localStorage.getItem("user") != undefined)
	}

}