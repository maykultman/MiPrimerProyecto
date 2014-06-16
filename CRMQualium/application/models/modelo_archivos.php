 <?php
    require_once 'Modelo_crud.php';
    class Modelo_archivos extends Modelo_crud
    {   
        private $archivo;       
        function obj(){  }

        function create($post)
        {
          if(!empty($_FILES))
          {
               if(array_key_exists('fotoCliente', $_FILES)&&$_FILES['fotoCliente']['name']!="")
               {
                   $carpeta="img/fotosClientes/";
                   opendir($carpeta);
                   $destino=$carpeta.$_FILES['fotoCliente']['name'];  
                   if(copy($_FILES['fotoCliente']['tmp_name'], $destino))
                   {
                       return $_FILES['fotoCliente']['name'];
                   }
                   return FALSE;  
               }
               elseif(array_key_exists('fotoUsuario', $_FILES)&&$_FILES['fotoUsuario']['name']!="")
               {
                   $carpeta="img/fotosUsuarios/";
                   opendir($carpeta);
                   $destino=$carpeta.$_FILES['fotoUsuario']['name'];  
                   if(copy($_FILES['fotoUsuario']['tmp_name'], $destino))
                   {
                       return $_FILES['fotoUsuario']['name'];
                   }
                   return FALSE;   
               }
               elseif(array_key_exists('archivo', $_FILES)&&$_FILES['archivo']['name']!="")
               {
                  $carpeta="archivos/";
                  opendir($carpeta);
                  $destino=$carpeta.$_FILES['archivo']['name'][0];  

                    if(copy($_FILES['archivo']['tmp_name'][0], $destino))
                    {
                        $this->archivo = 
                        array(  'idpropietario'=> $post['idpropietario'],
                                'tabla'        => $post['tabla'],
                                'nombre'       => $_FILES['archivo']['name'][0],
                                'ruta'         => $destino);
                        return $this->db->insert('multimedia', $this->archivo);
                    }
                  return FALSE;                
                }
            }           
           return false;
        } # Fin del metodo insert_mult()...

        public function get($id=FALSE, $tabla=FALSE)
        {
          // $result = $this->where();
          $this->db->where('tabla', $tabla);
          return $this->db->get( 'multimedia' )->$result();
                   	
        } # Fin del metodo get_mult()...
        
        public function save (  $id,  $put ) 
        {   
          return $this->db->update( 'multimedia', $put, array('id' => $id)  );   
        }       
        
        public function destroy (  $id  ) 
        {   
          return $this->db->delete( 'multimedia', array('id' => $id)  ); 
        }

    } # Fin de la clase...