import { getJestProjects } from '@nx/jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.base.json'

export default {
  projects: getJestProjects(),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}
