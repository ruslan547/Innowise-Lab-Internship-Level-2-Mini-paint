## Task

[Task link](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit)

[Demo on gh-pages](https://ruslan547.github.io/Innowise-Lab-Internship-Level-2-Mini-paint/)

## How to run the app

1. Clone the develop branch.

`$ git clone https://github.com/ruslan547/Innowise-Lab-Internship-Level-2-Mini-paint.git`

2. Go to the directory

`$ cd Innowise-Lab-Internship-Level-2-Mini-paint`

3. Install the npm modules

`$ npm install`

4. add the .env.local file with the firebase config

5. Run the app

`$ npm run start`


You will now have app running on localhost via port 3000  http://localhost:3000

## Database snapshot

```
   mini-paint-58a48-default-rtdb
    └── images
        ├── imageId
        │   ├── email
        │   └── image
        │
        └── imageId
            ├── email
            └── image
```

## Application stack

* react
* firebase
* node-sass
* react-router-dom
* eslint
* husky
* pinst
* prettier
* react-toastify
* redux
* redux-thunk
* scroll-into-view-if-needed
* typescript

## Folder structure

```
public
src
├── assets
│   └── img
├── core
│   ├── actions
│   ├── components
│   │   ├── Form
│   │   ├── FormButton
│   │   ├── Loader
│   │   ├── Modal
│   │   ├── ModalButton
│   │   ├── PaintButton
│   │   ├── PrivateRoute
│   │   └── SignoutButton
│   ├── constants
│   ├── helpers
│   ├── reducers
│   └── services
└── pages
    ├── Register
    ├── Signin
    ├── Gallery
    │   └── components
    │       ├── Filter
    │       ├── GalleryList
    │       └── GalleryToolBar
    └── Paint
        └── components
           ├── Circle
           ├── ColorBar
           ├── DrawBar
           ├── Hexagon
           ├── Line
           ├── MainView
           ├── NavBar
           ├── PaintBrush
           ├── PaintToolBar
           ├── Rectangle
           ├── SaveButton
           ├── ShapeBar
           ├── SizeBar
           └── Star
```
