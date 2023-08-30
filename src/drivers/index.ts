import admin from 'firebase-admin';

export default admin.initializeApp({ 
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "tasks-254e0",
      "private_key_id": "4654c58eabe49c9c1ace700f22df0887a70e0406",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQClMwt77X0bZD5r\nzCCd1lFQg5U04fF8+5zvUmtHR8kx3cHxoW6aejDxVhPJOqMqS/Q8IakKzfcw9qlE\nw8fChPprMi/S53eo52dHcXaZT7I7oOORmDLVZSiVPnlOw83BtJnhiW3OeN5GvyFh\nGZ1fpj/qxm0ostBQ/Ejx4PkcCPfqcWVARzhlCiUhCmNEcjL6+OegJrXxPO/XgMBp\nLyKmUw0emu0nZ7m2Pa/LkoQw3dA3bVHdfLZGq02nzz1G/83C2umiug1UHkNqz0dh\n0Diwv5rtcAPKRvXcHmvfRSwaPETQryCTxC4Z4cR15+Lf4MPpYXA1oJ69sUFU6Y7e\nyyiho/vlAgMBAAECggEAB2m4eLRUpQTaYOJKjmVJGyikao3pqmGXY7faP4XC9f1i\nUBJIkR8C5jl7btALoADDh2qSmCew5si9b2wCS+zFWJ0VFKI1YOYYC4ErFhXDmjW4\nhdaDZXGsy1xVJjSBcvvvMcswcGTvwyidegAjwIszGrkSZJKi6BdsuzSMs8uFOxxk\nENOuQxm5HPLajo6oLO2ynk9ezD1GOs5ppn1OeMA6MdiURbX8H/qfzdbpXZMj15k6\nwiqN5i2QpLSc9XwvVIhaXPVl5q0CC4quIv7IVyhoXbph8Wotrb4SxPz7dCyiJ5al\nh4y0I3iYOqAmKXbBFSazkXJGHPRBQKXHgq6w/PB3OwKBgQDVcYERmG4qfEXNR0cx\nahEmmdmDMfVdO8H8fkP12nJJMX9mG2Hq5J8uvnnetH7/Lg9ARbq55EneQuI49tyd\new9t6pcc/8aW6kMLnmb1cZ4yoDgoCqAj+7IBgCNy1Xh+/YV7qq7PZ/X3Qlrqx3As\nqcqggfK+5+VgNIXWwOl+OrJqXwKBgQDGIxb0k2srO0895uTAOjqXt/jO59azSefX\nnS/GHaE5NJS0nxm9/gWl/hrZLifDueYgRROPiXCy76WfFGTemA28zkDlcRdpXh1F\nwkHuKQb04+yEHwxMNBmsXWIhoMxVQ6JfWtZ1tF4CKq6h66UxrwDKUic7Sl44w/fv\n9nWQQt2IOwKBgQC9FrfcKaj3NG72I747VZbqFoPuyTRwqz74e7ejNynmE9akU3/U\ng0NOOupmVIrpcBmMu/lnM4oJQEF/a5sYXGvX2WqUAzggfFp3EZZuvIAEo5H8TyV9\nmz4gPC+rTNhZ0CkP3K7PCW+K5Br9QT/sIWNj/Jtbar73ErC7Bt4TuNZUiwKBgB2D\naI3xz4rXAMy1sek4QzYKP1OCkSaPoasqTM1z6Gn+/Q+Si2ETj3/UQ+eJyn6LGE5C\nO9GrpU/iBoeVoBjQCWvQRTZoDBaz4CRd9TgmgFTGBpr/jPNk51YXauCbdRRWSL9v\nZnaN8VrdRLn1wduOt81rQ1C/mR1Xg30I9yYP77O1AoGBAMuhbQ3Pvb6XaWvTLdx6\nO5WYeu8CV76ByV9NJhxIMrZQdFAGa6elgQAuYZnVgRwQdAJ8s/7UVbBq65cF2bzu\nvT5c8HOki+Fiw/jiY1pPN53MXtzfBOd9amrkcDm96Uys9cDsLc5OGx2ClsO3SOU6\nOoF3aAOOTmXfwGRWdS8DXbcy\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-1zfa7@tasks-254e0.iam.gserviceaccount.com",
      "client_id": "116994417451037998286",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1zfa7%40tasks-254e0.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
  ),
});