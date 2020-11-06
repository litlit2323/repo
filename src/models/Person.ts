import mongoose, {Schema, Document} from 'mongoose'


export interface IPerson extends Document {
  name: string,
  email: string,
  password: string
}

export const PersonSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
}, {
  timestamps: true
})

const PersonModel = mongoose.models.Person || mongoose.model<IPerson>('Person', PersonSchema)

export default PersonModel