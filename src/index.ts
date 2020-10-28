/**
 * Module path hook for Node.js require
 * @author 余聪
 */

import requireResolveHook, { Match } from 'require-resolve-hook'
import { isAbsolute, dirname } from 'path'
import * as fs from 'fs'
import { ResolverFactory, CachedInputFileSystem } from 'enhanced-resolve'

type CreateResolverOptions = Parameters<typeof ResolverFactory.createResolver>[0]

export type Options = Omit<CreateResolverOptions, 'fileSystem' | 'useSyncFileSystemCalls'> & {
  fileSystem?: CreateResolverOptions['fileSystem']
}

function modulePathHook(
  { fileSystem = new CachedInputFileSystem(fs, 4000), ...options }: Options = {},
  match: Match = (id) => !isAbsolute(id) && !id.startsWith('.')
) {
  const resolver = ResolverFactory.createResolver({
    ...options,
    fileSystem,
    useSyncFileSystemCalls: true
  })
  return requireResolveHook(match, (id, parent, isMain, options) => {
    return resolver.resolveSync({}, parent?.filename ? dirname(parent.filename) : process.cwd(), id)
  })
}

export default modulePathHook
