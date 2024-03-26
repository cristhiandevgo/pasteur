<<<<<<< Updated upstream
function authenticationMiddleware({ requiredRoles }) {
  return (req, res, next) => {
    // Verificar se o usuário está autenticado e tem um cargo
    if (!req.user || !req.user.cargo) {
      return res.status(401).json({ message: 'Usuário não autenticado ou sem cargo.' });
    }

    // Verificar se o cargo do usuário corresponde aos cargos necessários
    const userRole = req.user.cargo;
    if (requiredRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ message: 'Acesso negado. Cargo insuficiente.' });
    }
  };
}

export default authenticationMiddleware;
=======
// authenticationMiddleware.js
>>>>>>> Stashed changes

import jwt from 'jsonwebtoken';

function authenticationMiddleware(req, res, next) {
    const jwtToken = req.header('TOKEN');

    if (!jwtToken) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    try {
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = decodedToken.user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token de autenticação inválido' });
        } else {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default authenticationMiddleware;
