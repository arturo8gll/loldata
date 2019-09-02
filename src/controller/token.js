import fs from 'fs'
import logSymbols from 'log-symbols'

export function updateToken (token) {
  fs.writeFile('auth/token.json', JSON.stringify({ token }), function (err) {
    if (err) throw err
    console.log(logSymbols.success, 'Token Saved!')
  })
}
