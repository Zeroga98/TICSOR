var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.save = function (object) {
        localStorage.setItem("user", JSON.stringify(object));
    };
    UserModel.prototype.get = function () {
        var object = JSON.parse(localStorage.getItem("user"));
        this.names = object.NOMBRES;
        this.lastname = object.APELLIDOS;
        this.gener = object.GENERO;
        this.email = object.CORREO;
        this.picture = object.FOTO;
        this.rol = object.ROL;
        return this;
    };
    UserModel.prototype.isUser = function () {
        return (localStorage.getItem("user") != null && localStorage.getItem("user") != undefined);
    };
    return UserModel;
}());
export { UserModel };
//# sourceMappingURL=user.model.js.map