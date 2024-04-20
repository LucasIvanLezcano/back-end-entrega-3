const fs = require("fs");


class ProductManager {
    static Id = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct = async (title, description, price, img, code, stock) => {

        if (!title || !description || !price || !img || !code || !stock) {  //verificar campos obligatorios
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this, this.products.some(item => item.code === code)) {
            console.log("El codigo ya existe");
            return;
        }


        const newProduct = {
            id: ++ProductManager.Id, //generar un id unico para cada producto
            title,
            description,
            price,
            img,
            code,
            stock,
        }
        this.products.push(newProduct); // pushea el nuevo producto a array de productos

        await fs.promises.writeFile(this.path, JSON.stringify(this.products)); //guardar los productos en un archivo JSON
    };

    //metodo para obtener todos los productos
    getProduct = async () => {

        const productsJson = await fs.promises.readFile(this.path, "utf-8");// lee el contenido del archivo JSON
        this.products = JSON.parse(productsJson) || []; //asigna los productos al array

        return this.products;
    }


    // metodo para obtener prodcuto por su ID
    getProductById = async (id) => {
        await this.getProduct(); // cargamos los productos llamando al metodo getProduct
        const producto = this.products.find((item) => item.id === id); // buscamos el producto por id
        if (!producto) {
            console.log("Not Found");
            return producto || undefined;
        }
        console.log(producto);
        return producto;
    };







    //Metodo para guardarArchivo
    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }



    //actualizar producto
    updateProduct = async (id, dataProduct) => {
        await this.getProduct(); // cargamos productos con getProduct
        const index = this.products.findIndex(product => product.id === id);//encuenta el indice del producto con su id
        this.products[index] = {
            ...this.products[index],
            ...dataProduct //actualiza los productos con los nuevos datos
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.products)); // guardamos los productos actualizados en el archivo JSON

    };


    // metodo para eliminar producto
    deleteProduct = async (id) => {
        await this.getProduct(); //cargamos productos con getProduct
        this.products = this.products.filter(product => product.id !== id); // creamos un nuevo array sin el producto que le pasamos el ID
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    }

}

//const productManager = new ProductManager("F:\\coderprojects\\Back-end\\entrega-2\\products.json");




module.exports = ProductManager;


