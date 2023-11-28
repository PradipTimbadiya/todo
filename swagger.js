const swaggerJsDoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

const options={
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Todo Website Apis',
          version: '1.0.0',
        },
        servers:[{
            url: 'https://todo-pt.onrender.com'
        }]
    },
    apis:['swagger.js']
}

const swaggerSpec=swaggerJsDoc(options);

module.exports=function swaggerDocs(app){
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerSpec))
}

//Auth schema
/**
 * @swagger
 *  components:
 *      schemas:
 *          signup:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          signin:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          changepassword:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  newPassword:
 *                      type: string
 *          resetpassword:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          forgotpassword:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *          verifyotp:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  otp:
 *                      type: string
 *          ssocreate:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 */


/**
 * @swagger
 * /api/v1/sign-up:
 *  post:
 *      summary: signup user
 *      description: signup user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/signup'
 *      responses:
 *          200:
 *              description: User Added
 */

/**
 * @swagger
 * /api/v1/sign-in:
 *  post:
 *      summary: signin user
 *      description: signin user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/signin'
 *      responses:
 *          200:
 *              description: User login
 */

/**
 * @swagger
 * /api/v1/change-password:
 *  post:
 *      summary: password change
 *      description: password change
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/changepassword'
 *      responses:
 *          200:
 *              description: Password Change
 */

/**
 * @swagger
 * /api/v1/reset-password:
 *  post:
 *      summary: password reset
 *      description: password reset
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/resetpassword'
 *      responses:
 *          200:
 *              description: Password Reset
 */

/**
 * @swagger
 * /api/v1/forgot-password:
 *  post:
 *      summary: password forget
 *      description: password forget
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/forgotpassword'
 *      responses:
 *          200:
 *              description: Password forget
 */

/**
 * @swagger
 * /api/v1/verify-otp:
 *  post:
 *      summary: forget password verify otp
 *      description: forget password verify otp
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/verifyotp'
 *      responses:
 *          200:
 *              description: otp is right 
 */

/**
 * @swagger
 * /api/v1/sso-create:
 *  post:
 *      summary: create user with google
 *      description: create user with google
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/ssocreate'
 *      responses:
 *          200:
 *              description: user created 
 */

/**
 * @swagger
 * /api/v1/delete-user:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: delete user
 *      description: delete user
 *      responses:
 *          200:
 *              description: User deleted
 */



//Todo schema
/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: Bearer
 *              bearerFormat: JWT
 *      schemas:
 *          inserttodo:
 *              type: object
 *              properties:
 *                  image:
 *                      type: string
 *                      format: binary
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *          updatetodo:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  isCompleted:
 *                      type: boolean
 *          deletetodo:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *          checktodo:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  isCompleted:
 *                      type: boolean
 */

/**
 * @swagger
 * /api/v1/insert-task:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: add todo
 *      description: add todo
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/inserttodo'
 *      responses:
 *          200:
 *              description: Todo added 
 */

/**
 * @swagger
 * /api/v1/get-task:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: show all todo
 *      description: show all todo
 *      responses:
 *          200:
 *              description: all todo
 */

/**
 * @swagger
 * /api/v1/update-task:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: update todo
 *      description: update todo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/updatetodo'
 *      responses:
 *          200:
 *              description: Todo updated                             
 */

/**
 * @swagger
 * /api/v1/delete-task:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: delete todo
 *      description: delete todo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/deletetodo'
 *      responses:
 *          200:
 *              description: Todo deleted                             
 */

/**
 * @swagger
 * /api/v1/check-box:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: task complete 
 *      description: task complete
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/checktodo'
 *      responses:
 *          200:
 *              description: Task completed                             
 */