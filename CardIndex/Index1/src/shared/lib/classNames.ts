
type Mods = Record<string, boolean | string>
type Additional = Array<string | undefined>

export function classNames (
  cls: string,
  mods?: Mods,
  additional?: Additional
) {
  return [
    cls,
    ...(additional ? additional.filter(Boolean) : []),
    ...(mods ? Object.entries(mods)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => Boolean(value))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([classNames, _]) => [classNames]) : [])
  ].join(' ')
}
