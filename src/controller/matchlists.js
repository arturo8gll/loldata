import axios from 'axios'
import fs from 'fs'
import logSymbols from 'log-symbols'

function dataMatches (index) {
  const data = JSON.parse(fs.readFileSync('./auth/token.json'))
  const user = JSON.parse(fs.readFileSync('./auth/user.json'))
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
  fs.writeFileSync('data/json/matcheslist.json', JSON.stringify(data))
  console.log(logSymbols.success, 'Matchs info Saved!')
}
