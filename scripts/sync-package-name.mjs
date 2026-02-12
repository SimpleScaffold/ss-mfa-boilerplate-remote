#!/usr/bin/env node
/**
 * package.json의 name을 폴더명 기반(@repo/<folderName>)으로 동기화합니다.
 * git pull 시 폴더명이 바뀌어도 prepare 시점에 자동 반영됩니다.
 */
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkgDir = path.dirname(__dirname)
const folderName = path.basename(pkgDir)
const pkgPath = path.join(pkgDir, 'package.json')

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
const expectedName = `@repo/${folderName}`

if (pkg.name !== expectedName) {
    pkg.name = expectedName
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 4))
    console.log(`[sync-package-name] package.json name → ${expectedName}`)
}
