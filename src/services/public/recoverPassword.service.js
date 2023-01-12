import ModelUsers from '../../Models/users/users.model.js';
import * as handlePasswords from '../../security/users/passwords.js';
import * as userServices from '../users/users.services.js';
import { v4 } from 'uuid';
import connectMailer from '../../mail/config.js';
import { formatRecoveryPassword } from '../../mail/documents/recoverPassword.js';

export const recoverPassword = async (email) => {
  try {
    const user = await userServices.getUserByEmail(email);

    // creamos nueva password
    const hash = v4();
    const htmlFormat = formatRecoveryPassword(hash);

    // encriptamos la password
    const newPassword = await handlePasswords.createHash(hash);

    await ModelUsers.findByIdAndUpdate(
      user.data[0]._id,
      { password: newPassword },
      {
        upsert: true,
      }
    );

    // enviamos la nueva clave al correo
    const resSendMail = await connectMailer({
      email_dest: email,
      subject: 'Recuperación de contraseña.',
      format: htmlFormat,
    });

    if (!resSendMail.response.split(' ')[1] === 'OK') {
      return {
        msg: 'Error al recuperar contraseña',
        success: false,
        data: [],
      };
    }

    return {
      msg: 'Nueva contraseña enviada a su correo.',
      success: true,
      data: [],
    };
  } catch (error) {
    console.log('Error al recuperar contraseña', error);
    return {
      msg: 'Error al recuperar contraseña',
      success: false,
      data: error,
    };
  }
};
