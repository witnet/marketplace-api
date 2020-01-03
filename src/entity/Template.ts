import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import {
  IsNotEmpty,
  IsObject,
  IsString
} from 'class-validator'
// TODO: define a stronger type for RadonScript
type RadonScript = Array<number | Array<number | string | boolean>>

type RadRequest = {
  timelock: number
  retrieve: Array<{ url: string; kind: string; script: RadonScript }>
  aggregate: RadonScript
  tally: RadonScript
}

@Entity()
export class Template {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string

  // TODO(#13): define validation rules for radRequest
  @Column()
  @IsObject()
  @IsNotEmpty()
  radRequest: RadRequest
}
