import mongoose, { Schema, Document, modelNames } from 'mongoose'

export interface IVehicle extends Document {
  brand: string
  modelName: string
  owner: string
}

const VehicleSchema = new Schema(
  {
    brand: String,
    modelName: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Person' },
  },
  {
    timestamps: true,
  }
)

// TODO: Проверить эту функцию
function createModel<M extends Document>(modelName: string, schema: any) {
  return mongoose.models[modelName] || mongoose.model<M>(modelName, schema)
}

const VehicleModel = createModel<IVehicle>('Vehicle', VehicleSchema)
// Old version (need test new)
// const VehicleModel = mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema)

export default VehicleModel
