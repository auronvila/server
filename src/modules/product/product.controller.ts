import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductController {
constructor(private readonly productService : ProductsService ){}

    @Post()
    addProduct(
        @Body('title') prodTitle:string,
        @Body('description') prodDesc : string,
        @Body('price') prodPrice : number,

    ):any{
        const generatedId = this.productService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        )
        return{id:generatedId}
    }

    @Get()
    getAllProducts(){
       return this.productService.fetchProduct()
    }

    @Get(':id')
    getSingleProduct(@Param('id')prodId:string){
        return this.productService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id')prodId:string, 
        @Body('title') prodTitle:string, 
        @Body('description') prodDesc:string , 
        @Body('price') prodPrice:number 
        )
        {
            this.productService.updateProduct(prodId,prodDesc,prodTitle,prodPrice)
            return null
    }
}
