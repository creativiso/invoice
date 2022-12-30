import {
    Model,
    Optional
  } from 'sequelize';
  
  type ContractorAttributes = {
    id: number;
    name: string;
    city: string;
    address: string;
    eik: string;
    dds: boolean;
    ddsnumber: string;
    mol: string;
    person: boolean;
    egn: string;
  }
  
  type ContractorCreationAttributes = Optional<ContractorAttributes, 'id'>;
  
    const Contractor = (sequelize, DataTypes) => {  
        class Contractor extends Model<ContractorAttributes, ContractorCreationAttributes>{
            declare id: number;
            declare name: string;
            declare city: string;
            declare address: string;
            declare eik: string;
            declare dds: boolean;
            declare ddsnumber: string;
            declare mol: string;
            declare person: boolean;
            declare egn: string;
        }
        
        Contractor.init({
        id: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        eik: {
            type: DataTypes.CHAR(12),
            defaultValue: null
        },
        dds: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        ddsnumber: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        mol: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        person: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        egn: {
            type: DataTypes.CHAR(12),
            defaultValue: null
        }
    },
    {
      sequelize,
      modelName: 'Contractor',
      timestamps: false
    });
    return Contractor;
  };

  export default Contractor;
