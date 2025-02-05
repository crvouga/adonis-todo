export type Ok<T> = {
  t: 'ok'
  value: T
}

export type Err<E> = {
  t: 'err'
  error: E
}

export type NotAsked = {
  t: 'not_asked'
}

export type Loading = {
  t: 'loading'
}

export type Result<T, E> = Ok<T> | Err<E> | NotAsked | Loading

export type RemoteResult<T, E> = Ok<T> | Err<E> | Loading | NotAsked

export const Ok = <T>(value: T): Ok<T> => ({ t: 'ok', value })
export const Err = <E>(error: E): Err<E> => ({ t: 'err', error })
export const NotAsked = (): NotAsked => ({ t: 'not_asked' })
export const Loading = (): Loading => ({ t: 'loading' })

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.t === 'ok'

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => result.t === 'err'

export const mapOk = <T, E, R>(result: Result<T, E>, mapper: (value: T) => R): Result<R, E> => {
  if (isOk(result)) {
    return Ok(mapper(result.value))
  }
  return result
}

export const mapErr = <T, E, F>(result: Result<T, E>, mapper: (error: E) => F): Result<T, F> => {
  if (isErr(result)) {
    return Err(mapper(result.error))
  }
  return result
}

export const andThen = <T, E, R>(
  result: Result<T, E>,
  mapper: (value: T) => Result<R, E>
): Result<R, E> => {
  if (isOk(result)) {
    return mapper(result.value)
  }
  return result
}

export const orElse = <T, E, F>(
  result: Result<T, E>,
  mapper: (error: E) => Result<T, F>
): Result<T, F> => {
  if (isErr(result)) {
    return mapper(result.error)
  }
  return result
}

export const fromUnknownError = (error: unknown): Err<string> => {
  if (error instanceof Error) {
    return Err(error.message)
  }
  return Err(String(error))
}

export const unwrapOr = <T, E>(result: RemoteResult<T, E>, defaultValue: T): T => {
  if (isOk(result)) {
    return result.value
  }
  return defaultValue
}

export const isLoading = <T, E>(result: RemoteResult<T, E>): result is Loading => {
  return result.t === 'loading'
}

export const isNotAsked = <T, E>(result: RemoteResult<T, E>): result is NotAsked => {
  return result.t === 'not_asked'
}
