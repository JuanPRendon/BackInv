import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authToken = (req,res,next) => {
    const {token} = req.cookies

    if(!token)return res.status(401).json({message:"no token"})
    
    jwt.verify(token, TOKEN_SECRET,(err,payload)=>{
        if (err) return res.status(403).json({message:"invalid"})
        //el req.user esta guardando el id luego de decodificarlo y puedo acceder al valor desde los controller si tienen el middleware en la ruta
        req.id = payload.id
        req.rol = payload.rol
        next();
    })
}

export const isCalidad = (req,res,next) =>{
    if (req.rol !== 'calidad') return res.status(403).json({message:"invalid"})
    next()
    
}

// export const authGroup = (req,res,next) => {
// console.log(req.headers);
// next();
// }