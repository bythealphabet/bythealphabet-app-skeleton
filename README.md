# bythealphabet-mern-stack-template

Mern Stack Template

Template uses webpack5 React17, with webpack-dev-middleware and react-hot-loader for fast development.

Project starts:
development: yarn dev or npm run dev
production: yarn build or npm run build
start: yarn start or npm run start. this last command works only after build has been commanded.

NOTE FOR PRODUCTION.
before running in production comment the 2 lines in the server/express.js.


//////////////////////////////////////////////////////////////////
////comment the 2 lines below when going to run in production ////
import devBundle from "../build-utils/devBundle";         <-------- comment this line in production
devBundle.compile(app);                   <---------- comment this line in production
///////////////////////////////////////////////////////////////
