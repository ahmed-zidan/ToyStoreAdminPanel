export interface Menu{
  id:number;
  name:string;
  userName:string;

}

export interface menuAccess{
  Id:number;
   MenuId:number;
 HaveView   :boolean;
 HaveAdd :boolean;
 HaveEdit :boolean;
 HaveDelete :boolean;
}
