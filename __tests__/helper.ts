/**
 * @file helper
 */

import * as nps from 'path'

function fixture(...argv: string[]) {
  return nps.join.apply(nps, [__dirname, 'fixture'].concat(argv))
}

function globalNodeModules(...argv: string[]) {
  return nps.join.apply(nps, [__dirname, '../../node_modules'].concat(argv))
}

export { fixture, globalNodeModules }
