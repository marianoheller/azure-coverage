export function allSkippingErrors(promises: Array<Promise<any>>) {
  return Promise.all(
    promises.map((p: any) => p.catch(() => null))
  )
}