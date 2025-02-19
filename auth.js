const jwt = require("jsonwebtoken"); // Requiere jsonwebtoken

const SECRET_KEY = "tu_clave_secreta"; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Token no proporcionado o formato inválido" });
    }

    const token = authHeader.split(" ")[1]; // Extrae solo el token

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        req.user = decoded; 
        next();
    });
};


module.exports = verifyToken; // Exporta correctamente la función
