var app = app || {};

app.VistaNuevoPermiso = Backbone.View.extend({
	el : '#catalogoPermisos',

	events : {
		'click #guardar' : 'guardar'
	},

	initialize : function ()
	{
		/* Inicializamos la tabla servicios que es donde esta la lista de servicios a seleccionar*/
        this.$scroll_permisos = this.$('#scroll_permisos');
        /*Invocamos el metodo para cargar y pintar los servicios*/
        this.cargarPermisos();
        this.listenTo( app.coleccionPermisos, 'add', this.cargarServicio );
		this.listenTo( app.coleccionPermisos, 'reset', this.cargarPermisos );     
	},
	render : function ()
	{
		return this;
	},
	guardar : function (evento)
	{
		var modeloPermiso = pasarAJson($('#registroPermiso').serializeArray());

		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionPermisos.create
		(
			modeloPermiso,
			{
				wait: true,
				success: function (data){},
				error: function (error) {}
			}
		);

		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
		
		evento.preventDefault();
	},

	cargarPermiso : function (permiso)
	{
		var vistaPermiso = new app.VistaPermiso({model : permiso});		
		this.$scroll_permisos.append(vistaPermiso.render().el);
	},
	cargarPermisos : function ()
	{	
		app.coleccionPermisos.each(this.cargarPermiso, this);
	}
});

app.vistaNuevoPermiso = new app.VistaNuevoPermiso();