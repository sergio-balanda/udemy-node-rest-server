const { response } = require('express')

const esAdmin = (req, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
             msg: 'Se quiere verificar el usuario'
        })
    }

    const { rol, name } = req.user
    if(rol != 'ADMIN'){
        return res.status(401).json({
            msg: 'No es administrador'
       })
    }
    next()
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
                 msg: 'Se quiere verificar el usuario'
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: 'No autorizado'
           })
        }
        
        next()
    }
}

module.exports ={
    esAdmin,
    hasRole
}