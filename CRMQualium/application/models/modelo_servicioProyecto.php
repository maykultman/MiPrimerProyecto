<?php

	class Modelo_servicioProyecto extends CI_Model
	{
		# ............DATOS MODELO SERVICIO PROYECTO...........
		# $post['idproyecto'], $post['idservicio'], $post['status']
		
		function __construct(){ }

		public function create($post) 
		{   
			$this->db->insert('servicios_proy', $post)->insert_id();
			return $this->get($this->db->insert_id());	
		}

		public function get($id=FALSE) 
		{
		    $args = [ 'servicios_proy.id'        , 'servicios_proy.idproyecto', 
		    		  'servicios_proy.idservicio', 'servicios.nombre',
		    		  'servicios_proy.status'
		    		];

		    $this->db->select( $args );			
			$this->db->from('servicios');
			$this->db->join('servicios_proy', 'servicios_proy.idservicio = servicios.id');
			return $this->db->get()->result();
		}

		public function save (  $id,  $put ) 
		{	
			return $this->db->update ( 'servicios_proy', $put, array('id' => $id)  );	
		}
		public function destroy (  $id  ) 
		{	
			return $this->db->delete ( 'servicios_proy', array('id' => $id)  );	
		}

	} # Fin de la clase Model_phones