app.VistaCatalogoRol = Backbone.View.extend({
	tagName : 'tr',
	plantilla : _.template($('#listaRoles').html()),

	events : {	},

	initialize : function ()
	{
	
	},
	render : function ()
	{
		this.$el.html(this.plantilla(this.model.toJSON()));
		return this;
	}
});


app.VistaNuevoRol = Backbone.View.extend({
	el : '#catalogo_roles',

	events : {
		'click     #guardar' : 'guardar',
		'keypress  #rol'     : 'guardar'
	},

	initialize : function ()
	{
		/* Inicializamos la tabla servicios que es donde esta la lista de servicios a seleccionar*/
        this.$scroll_roles = this.$('#scroll_roles');
        //Invocamos el metodo para cargar y pintar los servicios
        this.cargarRoles();
        this.listenTo( app.coleccionRoles, 'add', this.cargarRol );
        this.listenTo( app.coleccionRoles, 'reset', this.cargarRol );    
	},
	render : function ()
	{
		return this;
	},
	
	guardar : function(evento)
	{
		var modeloRol = pasarAJson($('#registro_rol').serializeArray());
		 $('#registro_rol')[0].reset();
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		if()
		{
			app.coleccionRoles.create
			(
				modeloRol,
				{
					wait: true,
					success: function (data){},
					error: function (error) {}
				}
			);
		}
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
		evento.preventDefault();
	},

	cargarRol : function (rol)
	{
		var vistaRol = new app.VistaCatalogoRol({model : rol});		
		this.$scroll_roles.append(vistaRol.render().el);
	},
	cargarRoles : function ()
	{	
		app.coleccionRoles.each(this.cargarRol, this);
	}
});

app.vistaNuevoRol = new app.VistaNuevoRol();


