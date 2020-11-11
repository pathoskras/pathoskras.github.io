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
