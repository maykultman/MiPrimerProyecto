 <?php
    /**
    * Operaciones en la base de datos con los contactos
    */
    class Modelo_archivos extends CI_Model
    {          
        function obj(){  return $obj = new modelo_rit();  }

        function insert_mult()
        {
          
          if(!empty($_FILES))
          {
            // var_dump($_FILES); die();
               if(array_key_exists('fotoCliente', $_FILES)&&$_FILES['fotoCliente']['name']!="")
               {
                   $carpeta="img/fotosClientes/";
                   opendir($carpeta);
                   $destino=$carpeta.$_FILES['fotoCliente']['name'];  
                   if(copy($_FILES['fotoCliente']['tmp_name'], $destino))
                   {
                       return $_FILES['fotoCliente']['name'];
                   } 
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
               }
               elseif(array_key_exists('archivo', $_FILES)&&$_FILES['archivo']['name']!="")
               {
                   $carpeta="archivos/";
                   opendir($carpeta);
                     for($i=0; $i<count($_FILES['archivo']['name']);$i++)
                     {
                       $destino=$carpeta.$_FILES['archivo']['name'][$i];  

                       if(copy($_FILES['archivo']['tmp_name'][$i], $destino))
                       {
                           $archivos[$i] = $_FILES['archivo']['name'][$i];
                       }
                     }
                     return $archivos;
               }
            }
           
           return false;
        } # Fin del metodo insert_mcontact()...

        function get_mult($id)
        {
           
        
                   	
        } # Fin del metodo get_cotizacion()...
        function patch_mult($id, $put)
        {
            
        }
        function update_mult()
        {
        	
        }
        private function delete_mult($id)
        {

        }

    } # Fin de la clase...