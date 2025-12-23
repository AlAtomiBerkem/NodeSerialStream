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
            .filter(([_, value]) => Boolean(value))
            .map(([classNames, _]) => [classNames]) : [])
    ].join(' ')
}