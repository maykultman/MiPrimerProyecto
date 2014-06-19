<?php

	class Modelo_servicioProyecto extends CI_Model
	{
		# ............DATOS MODELO SERVICIO PROYECTO...........
		# $post['idproyecto'], $post['idservicio'], $post['status']
		
		function __construct(){ }

		public function create($post) 
		{   
			if(count($post['idservicio'])>1)
			{
				for($i = 0; $i<count($post['idservicio']); $i++)
				
				$data[$i] = array(  'idproyecto'=>$post['idproyecto'], 'idservicio'=>$post['idservicio'][$i], 'status'=>0);
				return $this->db->insert_batch('servicios_proy', $data);
			}
			 $this->db->insert('servicios_proy', $post);
			 return $this->get($this->db->insert_id());						 	
		}	
		
		public function get($id=FALSE) 
		{
			if($id===FALSE){ $reply = 'result';}else{ $reply = 'row';}
			
		    $args = [ 'servicios_proy.id'        , 'servicios_proy.idproyecto', 
		    		  'servicios_proy.idservicio', 'servicios.nombre',
		    		  'servicios_proy.status'
		    		];

		    $this->db->select( $args );			
			$this->db->from('servicios');
			$this->db->join('servicios_proy', 'servicios_proy.idservicio = servicios.id');
			return $this->db->get()->$reply();
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