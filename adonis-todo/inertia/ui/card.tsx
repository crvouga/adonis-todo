export type CardProps = {
  title: string
  body: React.ReactNode
}

export function Card(props: CardProps) {
  return (
    <div className="card w-96 bg-white shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-2xl font-bold text-center mb-6">{props.title}</h1>
        {props.body}
      </div>
    </div>
  )
}
