import modulePathHook, { Options } from './index'

const handleSimpleAlias = (id, alias: Record<string, string>) => {
  for (const [key, dir] of Object.entries(alias)) {
    if (id.startsWith(key)) {
      return true
    }
  }
}

export default (opts: Options, match: Parameters<typeof modulePathHook>[1]) => {
  if (Object.keys(opts).join('') === 'alias' && opts.alias) {
    match =
      match ||
      ((id) => {
        return handleSimpleAlias(id, opts.alias as any)
      })
  }

  return modulePathHook(opts, match)
}
