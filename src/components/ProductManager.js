import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("Producto no Encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };
  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(this.products));
    console.log("Producto Eliminado");
  };
}

updateProducts = async ({ id, ...producto }) => {
  await this.deleteProductsById(id);
  let productOld = await this.readProducts();
  let productsModif = [{ ...producto, id }, ...productOld];
  await fs.writeFile(this.patch, JSON.stringify(productsModif));
};
/*const productos = new ProductManager();

productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc121", 1);
productos.addProduct("Titulo2", "Description2", 2000, "Imagen2", "abc122", 2);
productos.addProduct("Titulo3", "Description3", 3000, "Imagen3", "abc123", 3);
productos.addProduct("Titulo4", "Description4", 3000, "Imagen4", "abc124", 4);
productos.addProduct("Titulo5", "Description5", 3000, "Imagen5", "abc125", 5);
productos.addProduct("Titulo6", "Description6", 3000, "Imagen6", "abc126", 4);
productos.addProduct("Titulo7", "Description7", 3000, "Imagen7", "abc127", 3);
productos.addProduct("Titulo8", "Description8", 3000, "Imagen8", "abc128", 2);
productos.addProduct("Titulo9", "Description9", 3000, "Imagen9", "abc129", 1);
productos.addProduct("Titulo10", "Description10", 3000, "Imagen10", "abc1210", 2);

//productos.getProducts();

//productos.getProductById(3);

//productos.deleteProductsById(2);

productos.updateProducts({
  title: "Titulo3",
  description: "Description3",
  price: 4500,
  imagen: "Imagen3",
  code: "abc125",
  stock: 15,
  id: 3,
});
