import { BuildOptions, Model } from 'sequelize'

export interface WorksheetAttributes {
    firstName: string;
    lastName: string;
    email: string;
    doctor: string;
    hash: string;
    data: object;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface WorksheetModel extends Model<WorksheetAttributes>, WorksheetAttributes { }
export class Worksheet extends Model<WorksheetModel, WorksheetAttributes> { }
export type WorksheetStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): WorksheetModel;
};

export interface LogAttributes {
    url: string;
    ipAddress: string;
    message: string;
    data: object;
    // id?: number;
    // createdAt?: Date;
    // updatedAt?: Date;
}
export interface LogModel extends Model<LogAttributes>, LogAttributes { }
export class Log extends Model<LogModel, LogAttributes> { }
export type LogStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): LogModel;
};
