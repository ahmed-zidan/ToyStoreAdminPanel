export interface ICategoryDto{
  id:number;
  name:string;
  description:string;
  image:string;
}


export interface ICategoryAdd{
  name:string;
  description:string;
  image:File;
}
