/**
 * Module path hook for Node.js require
 * @author imcuttle
 */

import requireResolveHook, { Match } from 'require-resolve-hook'
import { isAbsolute, dirname } from 'path'
import { builtinModules } from 'module'
import * as fs from 'fs'
import { ResolverFactory, CachedInputFileSystem } from 'enhanced-resolve'

type CreateResolverOptions = Parameters<typeof ResolverFactory.createResolver>[0]

export type Options = Omit<CreateResolverOptions, 'fileSystem' | 'useSyncFileSystemCalls'> & {
  fileSystem?: CreateResolverOptions['fileSystem']
}

function modulePathHook(
  { fileSystem = new CachedInputFileSystem(fs, 4000), ...options }: Options = {},
  match: Match = (id) => !builtinModules.includes(id) && !isAbsolute(id) && !id.startsWith('.')
) {
  const resolver = ResolverFactory.createResolver({
    mainFields: ['main', 'browser'],
    exportsFields: [],
    ...options,
    fileSystem,
    useSyncFileSystemCalls: true
  })

  return requireResolveHook(match, (id, parent) => {
    try {
      return resolver.resolveSync({}, parent?.filename ? dirname(parent.filename) : process.cwd(), id)
    } catch (err) {
      if (/^Can't resolve/.test(err.message)) {
        return false
      }
      throw err
    }
  })
}

export default modulePathHook
