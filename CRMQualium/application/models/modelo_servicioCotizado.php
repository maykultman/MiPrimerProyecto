<?php
    /**
    * Operaciones en la base de datos con los contactos
    */
    class Modelo_servicioCotizado extends CI_Model
    {          
        function obj(){  return $obj = new modelo_rit();  }

        public function insert_servicioCotizado($post)
        {
            
          $proyecto=false;
			    $columna = $this->db->field_data('cotizacion_servicios');
    			if($post)
    			{
      				foreach ($columna as $key)
      				{ 
      					if(array_key_exists($key->name, $post)) # Existe la cabecera en el array $put?
      					{
      						$serviciosCotizado[$key->name] = $post[$key->name];	     		        		
      					}
      				} # Foreach
      				
      				if($serviciosCotizado!=NULL)
      				{
      					$query = $this->db->insert('cotizacion_servicios', $serviciosCotizado);
      					return $this->db->insert_id();					
      				}
      				
    				return false; # False si los campos no coinciden
    			}
			         

        } # Fin del metodo insert_mcontact()...

        public function get_servicioCotizado($id=FALSE){          
       
            if($id===FALSE)
            { 
              return $this->db->get('cotizacion_servicios')->result();                
            }
            $query = $this->db->get_where('cotizacion_servicios', array('id'=>$id))->result(); 
                return ($query) ? $query[0] : false;
                // return $query;
                                        	
        } # Fin del metodo get_cotizacion()...

        // function update_servicioCotizado(){
        	
        //   $contactos = array(
        //                         'nombre_completo' => $this->input->post('nombreContacto'),
        //                         'correo'          => $this->input->post('correoContacto'),
        //                         'cargo'           => $this->input->post('cargoContacto')
        //                      );//Verificar si es un arreglo

        //     $this->db->where('id', $id);
        //     $this->db->update('contacto', $contactos); 

        // }
        // private function delete_servicioCotizado($id){

        //     $query = $this->db->delete('contactos', array('id' => $id));
        //     return $query;
            
        // }

}