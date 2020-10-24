
const {Router} = require('express');
const router = Router();
const BD = require('../config/configuracionBD');
const nodemailer = require('nodemailer');


router.get("/", async (req, res) => {
    sql = "select * from producto";

    let result = await BD.Open(sql, [], true);
    Prod = []

    result.rows.map((prods) =>{
        let prodSchema ={

        }

        Prod.push(prods);
    })
    
    res.status(200).json(Prod);
});

router.get("/getUser", async (req, res) => {
  sql = "select * from usuario";

  let result = await BD.Open(sql, [], false);
  Users = [];

  result.rows.map((usuer) => {
    let userSchema = {
        Nombre: usuer[1],
        Apellido: usuer[2],
        Pais: usuer[3],
        fecha_nacimiento: usuer[6],
        email: usuer[8],
        foto: usuer[4],
        credits: usuer[5]   
    };

    Users.push(userSchema);
  });
  res.status(200).json(Users);
});

router.post("/login", async (req, res) => {
  const {correo, contrasenia} = req.body;

  confir = "select count(*) from usuario where correo = :correo and contrasenia = :contrasenia";

  let resultado = await BD.Open(confir, [correo, contrasenia], true);
  var validador = false;

  resultado.rows.map((usuarios) =>{
      if(usuarios[0] < 1){
        validador = true;
      }else{
            validador = false;
      }
  })

  if (validador == false){
    sql = "select * from usuario where correo = :correo and contrasenia = :contrasenia offset 0 rows fetch next 1 rows only";

    var result = await BD.Open(sql, [correo, contrasenia], true);
    Usuario = []

    result.rows.map((usuer) =>{
        let userSchema = {
            Nombre: usuer[1],
            Apellido: usuer[2],
            Pais: usuer[3],
            fecha_nacimiento: usuer[6],
            email: usuer[8],
            foto: usuer[4],
            credits: usuer[5]            
        }
        Usuario.push(userSchema);
    })

    res.status(200).json(Usuario);
  }else{
    res.status(200).json({
        "user":"No encontrado",
        "pass": "Erronea"
    })
  }
});

router.post("/login/recuperarCon", async (req, res) => {
    const {correo} = req.body;

    sql = "select count(*) from usuario where correo = :correo";

    let resultado = await BD.Open(sql, [correo], true);

    var validador = false;

    resultado.rows.map((usuario) =>{
        if(usuario[0] < 0){
            validador = true;
        }else{
            validador = false;
        }
    })
    
    if(validador == false){
        var abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","_","$","&","#","@"];

        var numberoAleatorio = 6;
        var passTemp = "";

        for(var i=0;i<abecedario.length;i++){
            numberoAleatorio = parseInt(Math.random()*abecedario.length);

            passTemp += abecedario[numberoAleatorio];
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'estuardomachado506@gmail.com',
                pass: 'MEFM1234'
            }
        });

        var mensaje = "Hola! Soy Estuardo y tengo entendido que haz olvidado tu contraña de GtSales "+correo+ " puedes utilizar esta password temporal para entrar a tu cuenta "+passTemp +"\nlocalhost:3000/login";

        var mailoptions = {
            from: 'estuardomachado506@gmail.com',
            to: correo,
            subject: 'Recuperacion de contraseña',
            text: mensaje
        };

        transporter.sendMail(mailoptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log("Enviado");
            }
        })

        var cambio = "update usuario set contrasenia='"+passTemp+"' where correo = :correo";

        await BD.Open(cambio,[correo], true);

        res.status(200).json({
            "correo": correo
        })

        

    }else{
        res.status(200).json({
            "correo": "No existe"
        })
    }

}); 

router.post("/crearUsuario", async (req, res) => {
  const {nombre, apellido,  pais,  fechaN,  tipo,  correo,  contrasenia,  foto, creditos } = req.body;


   sql = `insert into usuario(nombre,apellido,pais,fechaN,tipo,correo,contrasenia,foto,creditos) values(:nombre,:apellido,:pais,:fechaN,'U',:correo,:contrasenia,:foto,:creditos)`;
   confimar = `select count(*) from usuario where correo = :correo`;

   var validador = false;
    let resultado = await BD.Open(confimar,[correo], true);
    
    resultado.rows.map((user)=>{
        if(user[0]<1){
            validador = false;
        }else{
            validador = true;
        }
    })

    

  if(validador == false){


    await BD.Open(sql,
      [nombre, apellido, pais, fechaN, tipo, correo, contrasenia, foto, creditos],
      true);
  
      res.status(200).json({
        
      nombre: nombre,
      apellido: apellido,
      pais: pais,
      fechaN: fechaN,
      tipo: tipo,
      correo: correo,
      contrasenia: contrasenia,
      foto: foto,
      creditos: creditos
    })
  }else{
      //alert("El correo "+correo+" ya esta en uso.")
      res.status(200).json({
          "correo": "Correo ya existente",
          "creditos": "0"
      })
  }

})



router.get("/perfil/:correo", async (req, res) => {
    const {correo} = req.params;

    sql = "select * from usuario where correo = :id offset 0 rows fetch next 1 rows only";

    let result = await BD.Open(sql, [correo], false);
    Users = [];
  
    result.rows.map((usuer) => {
      let userSchema = {
          Nombre: usuer[1],
          Apellido: usuer[2],
          Pais: usuer[3],
          fecha_nacimiento: usuer[6],
          email: usuer[8],
          foto: usuer[4],
          credits: usuer[5]   
      };
  
      Users.push(userSchema);
    });
    res.status(200).json(Users);
}); //basicamente get user

router.put("/perfil/:correo/:contrasenia/editar", async (req, res) => {
    const{nombre, apellido, pais, fechaN, correo, contrasenia, foto, creditos} = res.body;

    //Aca se hace el perfil

});

router.post("perfil/agregarProd", async (req, res) => {
    const {} = req.body;

    sql = "";

});

//Area de publicacion

router.post("/like", async (req, res) => {});

router.get("/comentarios", async (req, res) => {});

router.post("/comentarios/subirComentario", async (req, res) => {});

router.get("/getProd", async (req, res) => {
  //Esta sera consulta para el area de detalle
});

router.post("/denunciar", async (req, res) => {});

router.post("/chat/crearSala", async (req, res) => {});

router.post("/chat/crearSalaProd", async (req, res) => {});

router.post("/chat/enviarMensaje", async (req, res) => {});

router.get("/chat/conversacion", async (req, res) => {});
//Area de carrito de comrpas

router.get("/getCart", async (req, res) => {});

router.get("/addToCart", async (req, res) => {});

//De add to cart a confirmar compra va casi igual

router.get("/confirmarCompra", async (req, res) => {});

//Area de busqueda y respuesta

router.get("/Categoria", async (req, res) => {});

router.get("/buscarPalabrasClave", async (req, res) => {});

//administracion

router.get("/consulta1", async (req, res) => {});

router.get("/consulta2", async (req, res) => {});

router.get("/consulta3", async (req, res) => {});

router.get("/consulta4", async (req, res) => {});

router.get("/consulta5", async (req, res) => {});

router.get("/consulta6", async (req, res) => {});

router.get("/consulta7", async (req, res) => {});

router.get("/consulta8", async (req, res) => {});

router.get("/denuncias", async (req, res) => {});

router.get("/denuncias/desicion", async (req, res) => {});

/**
 * 
cod_cliente int not null,
nombre varchar(45),
apellido varchar(45),
pais varchar(45),
fecha date,
tipo char,
correo varchar(100) not null,
contrasenia varchar(100) not null,
foto varchar(3000),
creditos varchar(40),
 */

module.exports = router;
