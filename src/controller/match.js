import axios from 'axios'
import fs from 'fs'
import delay from 'delay'
import logSymbols from 'log-symbols'
import { promisify } from 'util'
import { Spinner } from 'cli-spinner'


function match (idMatch) {
  const data = JSON.parse(fs.readFileSync('./auth/token.json'))
  return axios.get(`https://la1.api.riotgames.com/lol/match/v4/matches/${idMatch}`, {
    headers: {
      'X-Riot-Token': data.token
    }
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

export async function getMatchesInfo () {
  const matchList = await JSON.parse(fs.readFileSync('data/json/matcheslist.json'))
  var data = []
  var spinner = new Spinner('processing.. %s')
  spinner.setSpinnerString('|/-\\')
  spinner.start()
  for (let i = 0; i < matchList.length; i++) {
    data.push(await match(matchList[i].gameId))
    spinner.setSpinnerTitle(`Download Match ${i + 1}`)
    await delay(1500)
  }
  spinner.stop()
  fs.writeFileSync('data/json/matchs.json', JSON.stringify(data))
  console.log('\n', logSymbols.success, 'Matchs info Saved!')
}
