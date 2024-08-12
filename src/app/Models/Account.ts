export interface LoginDto{
  email: string;
  password: string;
}

export interface RegisterDto
{
  displayName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export interface userInfo{
  userId: string;
  displayName: string;
  token: string;
}


export interface userDto{
  Id :string;
  DisplayName :string;
  Role :string;
  PhoneNumber :string;
  Photo :File;
}
