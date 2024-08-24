export interface productPagination {
  categoryId: number
  search: string
  sorting: string
  minPrice: number
  maxPrice: number
  pageIdx: number
  pageSize: number
  sizes: number[]
  colors: number[]
}


export interface ProductList {
  pageCount: number
  pageSize: number
  pageNumber: number
  products: Product[]
}

export interface Product {
  id: number
  name: string
  description: string
  mainPrice: number
  sellPrice: number
  isSale: boolean
  isNew: boolean
  categotyId: number
  categoryName: string
  imageUrl: string
  colors: Color[]
  sizes: Size[]
}



export interface Color{
  id:number;
  name:string;
  colorCode:string;
}

export interface Size{
  id:number;
  name:string;
}


