var app = app || {};
app.ModeloServicioProyecto = Backbone.Model.extend({
	urlRoot	:'http://crmqualium.com/api_serviciosProyecto',
	defaults	: {
		status	: true
	},
	conmutarStatus	: function (callback) {
		this.save(
			{ status: !this.get('status') },
			{
				wait:true, 
				patch:true,
				success:function () {
					callback();
				},
				error:function () {
				}
			}
		);
	}
});