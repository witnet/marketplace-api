import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'

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
  name: string

  @Column()
  description: string

  @Column()
  radRequest: RadRequest
}
