import axios from 'axios'
import fs from 'fs'
import logSymbols from 'log-symbols'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const data = JSON.parse(fs.readFileSync('./auth/token.json'))
const user = JSON.parse(fs.readFileSync('./auth/user.json'))
console.log(`${user.name} search games`)
function dataMatches (index) {
  return axios.get(`https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/${user.accountId}?beginIndex=${index}&queue=420`, {
    headers: {
      'X-Riot-Token': data.token
    }
  })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function getListMatches () {
  let index = 0
  let count = 0
  var data = []
  while (true) {
    const test = await dataMatches(index)
    if (test.matches.length === 0) break
    index = 100 + index
    count = count + test.matches.length
    for (let i = 0; i < test.matches.length; i++) {
      data.push(test.matches[i])
    }
  }
  await console.log(logSymbols.info, `Games found ${count}`)
  await writeFile('data/json/matcheslist.json', JSON.stringify(data))
  console.log(logSymbols.success, 'Matchs info Saved!')
}
