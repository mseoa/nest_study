import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>){
        Object.assign(this, partial) //copy the properties from the partial object to the UserEntity instance 
    } // partial object can contain any subset of the properties defined in the UserEntity class

    @ApiProperty() // make visible to swagger
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    // omit @ApiProperty(), sensitive field
    @Exclude()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
