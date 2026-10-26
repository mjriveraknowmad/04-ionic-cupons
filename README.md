# Ionic Cupons


Es una aplicación de pruebas, siguiendo el curso de https://www.udemy.com/course/aprende-ionic-con-proyectos-practicos

Es una aplicación básica de Ionic 7 con Angular 19, para aprender. Para ello lo que se ejecutó:

`npm install -g @ionic/cli@v7`

`ionic start 04-ionic-cupons` y se fue respondiendo: Angular, tabs y standalone


Ejecutar `ionic serve` dentro del directorio de la aplicación para ver tu app en el navegador

Ejecutar `ionic capacitor build android` para crear la aplicación de android y se abra el android studio

Ejecutar `npm run generate-icons-android` para crear los iconos

Usa  `cordova-res --skip-config --copy` para generar el icono de tu app y pantallas de presentación


Ejecutar `ionic capacitor run android -l --external` para actualizar automáticamente en android, aunque hay que pulsar el reload en el Android Studio, la primera vez

## Añadir plugins de capacitor
Por ejemplo, para añadir el plugin de preferences, para guardar datos en el storage :
`npm install @capacitor/preferences`

O para generar los iconos:
`npm install @capacitor/assets --save-dev`

O para dar y quitar brillo a la pantalla del móvil:
`npm install @capacitor-community/screen-brightness`

O para escanear un QR:
`npm install @capacitor/barcode-scanner`   // https://www.the-qrcode-generator.com/ para generar códigos QR de prueba


## Generar páginas
`ionic g page pages/mypage`

# Generar servicio
`ionic g s services/coupon`

# Generar pipe
`ionic g pipe pipes/filterCouponCategory`

## Generar iconos
Se añadieron los scripts correspondientes en el package.json, y las imagenes en la carpeta resources

`npm run generate-icons-android`
`npm run generate-icons-ios`
`npm run generate-icons-pwa`

Más info sobre el script y las dimensiones necesarias de las imágenes: [https://capacitorjs.com/docs/v7/guides/splash-screens-and-icons](https://capacitorjs.com/docs/v7/guides/splash-screens-and-icons)


`ionic capacitor build android` 

# Añadir librería de QR
https://www.npmjs.com/package/angularx-qrcode 
`npm i angularx-qrcode`

## Generar un QR externo que tenga datos, para pillarlo con la webcam después
Ir a https://www.the-qrcode-generator.com/ , pulsar en "plain text", añadimos el texto:
  `{"idProduct":13,"img":"assets/img/oreo.jpg","name":"Oreo","discount":15, "category": "candies"}`
 y le damos a guardar


## Más documentación
https://ionic-docs-lq0if04rc-ionic1.vercel.app/docs/v7/intro/cli
https://ionic-docs-lq0if04rc-ionic1.vercel.app/docs/v7/components
https://ionicframework.com/docs
