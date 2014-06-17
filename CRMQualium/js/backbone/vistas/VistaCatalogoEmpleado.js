var app = app || {};

app.VistaCatalogoEmpleado = Backbone.View.extend({

	tagName : 'div',

	plantilla : _.template($('#datosEmpleado').html()),

	events : {},

	initialize : function()	{ 

	},

	render : function(info) 
	{	
		
		var self = this;
		if(info.filtrado != null){			
			self.$el.html(self.plantilla(info.filtrado));
		}else{
			self.$el.html(self.plantilla(info.model.toJSON()));
		}

		return self;
	}

});