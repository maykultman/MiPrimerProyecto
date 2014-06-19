var app = app || {};

//*****************************************************//
app.VistaPuestoEmpleado = Backbone.View.extend({
	tagName : 'li',
	className : 'opciones',

	plantilla  : _.template($('#ppuestos').html()),

	events : {},

	initialize : function () {
		this.$listaPuesto = this.$('#listaPuesto');		
	},

	render : function ()
	{	//Renderiza en la plantilla el modelo....
		this.$el.html(this.plantilla(this.model.toJSON()));
		this.$el.attr('id', 'puesto_'+this.model.get('id'));		
		return this;
	}	
});
//*****************************************************//

//*****************************************************//
app.VistaSelectPuesto = app.VistaPuestoEmpleado.extend({
	tagName : 'option',
	
	plantilla  : _.template($('#selectpuesto').html()),

	events : {},

	initialize : function () {
		this.$lpuesto = this.$('#lpuesto');	
		this.$el.attr('value', this.model.get('id'));	
	}
});
//*****************************************************//


app.VistaNuevoEmpleado = Backbone.View.extend({
	el : '.contenedor_modulo',

	events : {
		'click #guardar'      : 'guardar',
		'click .opciones'	  : 'opciones'
		// 'click .icon-trash'   : 'destroyModel'
	},

	initialize : function (){
		
		this.$divEmpleado = this.$('#divEmpleado');	
		this.$selectpuesto = this.$('#lpuesto');
		this.cargarSelectPuestos();
		
		this.$listaPuesto = this.$('#listaPuesto');
		this.cargarPuestos();
		this.opciones('puesto_1'); //Carga empleados
	},

	render : function()	{	return this; },

	opciones : function(evento)
	{	
		var id;
		if(evento==='puesto_1')
		{
			 id = evento.split('_');			 
		}
		else
		{
			id = ($(evento.currentTarget).attr('id')).split('_');			
		}

		this.$divEmpleado.html('');		
		var evens = _.filter(app.coleccionEmpleados.toJSON(), 
			function(empleado)
			{ 
				var validate = false; 
				if(empleado.puesto == id[1])
				{
					validate = true;
				}
				return validate;

			});

		for(x in evens)
		{
					
			/*****************************************************************************************************/
			var casa  = app.coleccionTelefonos.where ({ idpropietario : evens[x].id, tabla : 'empleados' });
				for(i in casa)
				{
					if(casa[i].get('tipo')==='movil')
					{
						evens[x].movil = casa[i].get('numero');
					}
					if(casa[i].get('tipo')==='casa')
					{
						evens[x].casa = casa[i].get('numero');
					}
				}	
			/*****************************************************************************************************/
			var employ = app.coleccionEmpleados.where({ id : evens[x].id });

			var viewEmpleado = new app.VistaCatalogoEmpleado({ model : employ });
			
			this.$divEmpleado.append(viewEmpleado.render({ filtrado : evens[x]}).el);			
		}

	},

	guardar : function (evento)
	{
		var modeloTelefono = new Array();
		var modeloEmpleado = pasarAJson($('#registro').serializeArray());
		modeloEmpleado = limpiarJSON(modeloEmpleado);
	
		$('#registro')[0].reset();
 		/* nombre tiene algún valor?*/
	 	if(modeloEmpleado.nombre)
	 	{
			if(modeloEmpleado.movil!=undefined) /*... Tiene telefono movil?...*/
			{
				var movil = modeloEmpleado.movil;
				delete modeloEmpleado.movil;    /*... eliminamos movil de modelo que contiene los datos el empleado ...*/
			}
			if(modeloEmpleado.casa!=undefined) /*... Tiene telefono de casa?...*/
			{
				var casa  = modeloEmpleado.casa;					
				delete modeloEmpleado.casa;    /*... eliminamos movil de modelo que contiene los datos el empleado ...*/
			}

			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionEmpleados.create
			(
				modeloEmpleado,
				{
					wait: true,
					success: function (exito)
					{
						if(movil) /* Esperamos un exito del post del empleado para guardar su telefono*/
						{
							modeloTelefono[0] = { id 			: '',
												  idpropietario : exito.get('id'),
												  tabla         : 'empleados', 
												  numero        : movil, 
									  			  tipo          : 'movil'
												};
		        		}
		        		if(casa)
						{
		        			modeloTelefono[1] = { id 			: '',
		        								  idpropietario : exito.get('id'),
									  			  tabla         : 'empleados', 
									  			  numero        : casa, 
									  			  tipo          : 'casa'
												};
						}						
						
						if(modeloTelefono.length>0)
						{
							Backbone.emulateHTTP = true;
							Backbone.emulateJSON = true;
							for (i in modeloTelefono) 
							{	
								app.coleccionTelefonos.create
								(
									modeloTelefono[i],
									{
										wait: true,
										success: function (exito){},
										error  : function(error){}
									}
								);						
							}
							Backbone.emulateHTTP = false;
							Backbone.emulateJSON = false;
						}
						$('#modal_nuevo_empleado').modal('hide'); /* Oculta el modal*/
						
					}, // Fin de success...
					error: function (error) {}
				}
			);
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;			
		}		
		evento.preventDefault();
	}, /*... Fin de la función guardar ...*/

	cargarPuesto : function (puesto)
	{
		var vistaPuesto = new app.VistaPuestoEmpleado({ model : puesto});		
		this.$listaPuesto.append(vistaPuesto.render().el);
	},

	cargarPuestos : function ()
	{	
		app.coleccionPuestos.each(this.cargarPuesto, this);
		$('#listaPuesto').children(':first-child').addClass('active');
	},

	cargarSelectPuesto : function (puesto)
	{
		var vistaPuesto = new app.VistaSelectPuesto({ model : puesto});		
	    this.$selectpuesto.append(vistaPuesto.render().el);
	},

	cargarSelectPuestos : function ()
	{	
		app.coleccionPuestos.each(this.cargarSelectPuesto, this);
	}

	

});

app.vistaNuevoEmpleado = new app.VistaNuevoEmpleado();