export interface Menu{
  id:number;
  name:string;
  userName:string;

}

export interface menuAccess{
  Id:number;
   MenuId:number;
 haveView   :boolean;
 haveAdd :boolean;
 haveEdit :boolean;
 haveDelete :boolean;
}
