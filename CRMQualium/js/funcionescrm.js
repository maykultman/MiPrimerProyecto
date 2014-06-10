var app = app || {};
app.busquedaServicio.servicio = (function () {
    buscarPorNombre = function (searchKey) {
        var deferred = $.Deferred();
        var results = servicios.filter(function (element) {
            var nombre = element.nombre;
            // console.log(nombre);
            // console.log(searchKey);
            return nombre.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    },
    servicios = app.coleccionDeServicios;

    // The public API
    return {
        buscarPorNombre: buscarPorNombre
    };
}());  

app.busquedaCliente.cliente = (function () {
    buscarPorNombre = function (searchKey) {
        var deferred = $.Deferred();
        var results = clientes.filter(function (element) {
            var nombre = element.nombreComercial;
            // console.log(nombre);
            // console.log(searchKey);
            return nombre.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    },
    clientes = app.coleccionDeClientes;

    // The public API
    return {
        buscarPorNombre: buscarPorNombre
    };
}());

function pasarAJson (objSerializado) {
    var json = {};
    $.each(objSerializado, function () {
        if (json[this.name]) {
            if (!json[this.name].push) {
                json[this.name] = [json[this.name]];
            };
            json[this.name].push(this.value || '');
        } else{
            json[this.name] = this.value || '';
        };
    });
    return json;
}