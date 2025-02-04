export default function ServerError(props: { error: unknown }) {
  return (
    <>
      <div className="container">
        <div className="title">Server Error</div>

        <span>{hasMessage(props.error) ? props.error.message : 'Unknown error'}</span>
      </div>
    </>
  )
}

const hasMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  )
}
