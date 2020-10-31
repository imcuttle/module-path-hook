/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
import modulePathHook from '../src'
import * as nodeResolve from 'resolve'

import test from 'ava'
import { fixture, globalNodeModules } from './helper'

test('modules: vendor', (t) => {
  const { unhook } = modulePathHook({
    modules: [fixture('vendor')]
  })

  t.is(require.resolve('jquery'), fixture('vendor/jquery.js'))
  t.is(require.resolve('jquery'), fixture('vendor/jquery.js'))
  unhook()

  t.throws(() => require.resolve('jquery'), {
    code: 'MODULE_NOT_FOUND',
    message: /Cannot find module 'jquery'/
  })
})

test('alias: vendor', (t) => {
  const { unhook } = modulePathHook({
    modules: [fixture('vendor')],
    alias: {
      '@alias': fixture('alias')
    }
  })

  t.is(require.resolve('@alias/react'), fixture('alias/react.js'))
  t.is(require.resolve('@alias/comps/react'), fixture('alias/comps/react.js'))

  unhook()
})

test('match', (t) => {
  const { unhook } = modulePathHook(
    {
      modules: [fixture('vendor')]
    },
    /./
  )

  t.is(require.resolve('./fixture/vendor/react'), fixture('vendor/react.js'))

  unhook()
})

test('normal', (t) => {
  const { unhook } = modulePathHook(
    {
      // modules: [fixture('vendor')]
    },
    /./
  )

  t.is(require.resolve('require-resolve-hook'), nodeResolve.sync('require-resolve-hook'))
  unhook()
})

test('not found module should fallback', (t) => {
  // error
  const { unhook: unHook1 } = modulePathHook({
    alias: {}
  })

  // resolved
  const { unhook: unHook2 } = modulePathHook({
    alias: {
      react: fixture('alias/react.js')
    }
  })

  t.is(require.resolve('react'), fixture('alias/react.js'))
  unHook1()

  t.is(require.resolve('react'), fixture('alias/react.js'))
  unHook2()

  t.throws(() => require.resolve('react'), {
    code: 'MODULE_NOT_FOUND'
  })
})
