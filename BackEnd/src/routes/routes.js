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