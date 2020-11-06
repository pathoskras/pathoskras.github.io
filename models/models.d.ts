import { BuildOptions, Model } from 'sequelize'

export interface WorksheetAttributes {
    firstName: string;
    lastName: string;
    email: string;
    doctor: string;
    hash: string;
    data: string;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface WorksheetModel extends Model<WorksheetAttributes>, WorksheetAttributes { }
export class Worksheet extends Model<WorksheetModel, WorksheetAttributes> { }
export type WorksheetStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): WorksheetModel;
};

export interface UserAttributes {
    name: string;
    email: string;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes { }
export class User extends Model<UserModel, UserAttributes> { }
export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export interface SkillsAttributes {
    skill: string;
    id?: number;
    updatedAt?: Date;
    createdAt?: Date;
}
export interface SkillsModel extends Model<SkillsAttributes>, SkillsAttributes { }
export class Skills extends Model<SkillsModel, SkillsAttributes> { }
export type SkillsStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): SkillsModel;
};
