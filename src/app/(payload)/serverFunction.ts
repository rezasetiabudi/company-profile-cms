'use server'

import config from '@payload-config'
import { importMap } from './admin/importMap'
import { handleServerFunctions } from '@payloadcms/next/layouts'

type ServerFunctionClientArgs = {
  args: Record<string, unknown>
  name: string
}

export const serverFunction = async ({ args, name }: ServerFunctionClientArgs) => {
  'use server'
  return handleServerFunctions({
    args,
    name,
    config,
    importMap,
  })
}
