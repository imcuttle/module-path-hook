/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
import modulePathHook from '../src'

import test from 'ava'
import { fixture } from './helper'

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
