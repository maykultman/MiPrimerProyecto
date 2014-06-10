var app = app || {};

app.VistaPerfil = Backbone.View.extend({
	tagName : 'tr', //Etiqueta donde se va a representar el modelo

	plantilla : _.template($('#plantilla_perfil').html()),

	events : {
		'keypress .actualizar_atributo' : 'actualizar'
	},

	initialize : function () {},

	render : function (){
		this.$el.html( this.plantilla( this.model.toJSON() ) );
		return this;
	},

	actualizar : function (elemento)
	{
		if( elemento.keyCode === 13 )
		{
			var json = $(elemento.currentTarget).serializeArray();
			json = this.pasarAJson(json);
			
			this.model.save(
				json,
				{
					wait : true, 
					patch : true,
					success: function(exito){ console.log(exito)},
					error : function(error){ console.log(error)}
				} 

			);
		}
	},

	pasarAJson : function (objSerializado) {
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

});