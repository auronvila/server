import { Injectable, NotFoundException } from '@nestjs/common'
import {Product} from './product.model'
import { title } from 'process'


@Injectable()
export class ProductsService{
    product : Product[] = []

    insertProduct(title:string,desc:string,price:number){
        const ProId = Math.random().toString()
        const newProduct = new Product (ProId, title,desc,price)
        this.product.push(newProduct)
        return ProId
    }

    fetchProduct(){
        return [...this.product]
    }

    getSingleProduct(productId: string) {
        const [product, index] = this.FindProduct(productId);
        return { ...product, id: productId }; // add the id property to the returned object
      }
      

    updateProduct(productId:string,prodTitle:string,prodDesc:string,prodPrice:number){
        const [product,index] = this.FindProduct(productId)
        const updateProduct = {...product}
        if(prodTitle){
            updateProduct.title = title
        }
        if(prodDesc){
            updateProduct.description = prodDesc
        }
        if(title){
            updateProduct.title = title
        }
        if(prodPrice){
            updateProduct.price = prodPrice
        }
        this.product[index] = updateProduct
   }

    private FindProduct(productId:string): [Product,number]{
        const productIndex = this.product.findIndex((prod) =>prod.id === productId);
        const product = this.product[productIndex]
        if(!productIndex){
            throw new NotFoundException('Could not find the product Check the service');
        }
        return [product, productIndex]
    }
}