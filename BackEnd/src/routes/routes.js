const {Router} = require('express');
const router = Router();
const BD = require('../config/configuracionBD');

router.get('/',(req,res) =>{
    res.status(200).json({
        msg:"todo bien"
    })

})


router.get('/getUser', async (req, res) => {

    sql = "select * from usuario";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "id_usuario": user[0],
            "correo": user[1],
            "nombre": user[2],
            "apellido" : user[3],
            "pais" : user[4],
            "fecha_nacimiento" : user[5],
            "contrasena" : user[6],
            "foto" : user[7],
            "tipo" : user[8]
        }

        Users.push(userSchema);
    }) 
    res.status(200).json(Users);
})


router.post('/addUser', async (req, res) => {
    const { username, firstname, lastname } = req.body;

    sql = `insert into person
            values (:username,:firstname,:lastname)`;

    await BD.Open(sql, [username, firstname, lastname], true);

    res.status(200).json({
        "username": username,
        "firstname": firstname,
        "lastname": lastname
    })
})


router.get('/login',async (req, res)=>{
    sql = "";


})

router.post('/login/recuperarCon', async (req, res) =>{})

router.put('/login/recuperarCon/canbiarCont', async (req, res)=>{})

router.post('/crearUsuario', async(req, res) =>{})

router.get('/perfil', async(req, res) =>{}) //basicamente get user

router.put('/perfil/editar',async (req, res) =>{})

router.post('perfil/agregarProd', async (req, res) =>{})

//Area de publicacion

router.post('/like', async (req, res) =>{

})

router.get('/comentarios', async (req, res) =>{})

router.post('/comentarios/subirComentario', async(req, res) =>{})

router.get('/mostrarProd', async(req, res) =>{
    //Esta sera consulta para el area de detalle
})

router.post('/denunciar', async(req, res) =>{})

router.post('/chat/crearSala', async (req, res)=>{

})

router.post('/chat/crearSalaProd', async (req, res) =>{})

router.post('/chat/enviarMensaje', async(req, res) =>{})

router.get('/chat/conversacion', async(req, res)=>{})
//Area de carrito de comrpas

router.get('/getCart', async (req, res)=>{

})

router.get('/addToCart', async(req,res)=>{

})

//De add to cart a confirmar compra va casi igual

router.get('/confirmarCompra', async (req, res) =>{

})


//Area de busqueda y respuesta

router.get('/buscarPorCategoria', async (req, res) =>{

})

router.get('/buscarPalabrasClave', async (req, res)=>{

})

router.get('/buscarProd', async(req, res)=>{

})

//administracion

router.get('/consulta1', async(req, res)=>{

})

router.get('/consulta2', async(req, res)=>{
    
})

router.get('/consulta3', async(req, res)=>{
    
})

router.get('/consulta4', async(req, res)=>{
    
})

router.get('/consulta5', async(req, res)=>{
    
})

router.get('/consulta6', async(req, res)=>{
    
})

router.get('/consulta7', async(req, res)=>{
    
})

router.get('/consulta8', async(req, res)=>{
    
})

router.get('/denuncias', async(req, res) =>{})

router.get('/denuncias/desicion', async(req,res)=>{})

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