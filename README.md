# ShopKaro Web App
A full-stack online shopping website. Provide interaction Between Buyer,Seller and Admin


ShopKaro Backend build using NodeJs, ExpressJs and MongoDB,Cloundinary
<br>
ShopKaro Fronted build using ReactJs,Redux,React-Material-Ui
<br>

![](github_assets/banner.png)

## How to build and run this project
* Clone this repository.
* Execute `npm install`
* Make sure MongoDB is installed your system or setup the MongoDB Atlas online.
* Provide ```NODE_ENV```, ```PORT```, ```TOKEN_ISSUER``` , ```TOKEN_AUDIENCE```, ```MONGO_URI```, ```GEOCODER_API_KEY```, ```JWT_SECRET```, ```SMTP_PORT```, ```SMTP_EMAIL```, ```SMTP_PASSWORD``` in **Backend/.env** file
* Execute `npm start`

 ## Project Directory Structure
```
.
├── Backend
    ├── controllers
│       ├── orderController.js
│       ├── productController.js
│       ├── userController.js
    ├── middleware
│       ├── auth.js
│       ├── error.js
│       └── catchAsyncError.js
    ├── models
│       ├── orderModel.js
│       ├── productSchema.js
│       └── UserSchema.js
    ├── routes
│       ├── orderRoutes.js
│       ├── productRoutes.js
│       ├── userRoutes.js
    ├── utils
│       ├── Apifeatures.js
│       ├── errorHandler.js
│       └── sendJwtToken.js
    ├── .env
    ├── apiDocs.yml
    ├── app.js
    └── server.js
├── .gitignore
├── nodemon.json
├── package.json
├── package-lock.json


```
## API Specifications

- Version: 1.0.0
- Author: Prince kushwaha

### Find this project useful ? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

### License
```
MIT License

Copyright (c) 2022 Prince kushwaha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
