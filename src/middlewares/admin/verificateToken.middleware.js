import { getTokenFromRequest } from '../../security/helpers/authorizations.js';
import * as auth from '../../security/helpers/tokens.js';

export const validateToken = async (req, res, next) => {
  try {
    const tokenRequest = await getTokenFromRequest(req);

    if (!tokenRequest) {
      return res.json({
        msg: 'No tienes los permisos necesarios.',
        success: false,
        data: [],
      });
    }

    const isValidToken = await auth.verifyToken(tokenRequest);

    if (!isValidToken.success) {
      return res.json({
        msg: 'Token perdido o invalido',
        success: false,
        data: isValidToken.data.name,
      });
    }

    next();
  } catch (error) {
    console.log('Error al verificar token', error);
    res.json({ error });
  }
};
