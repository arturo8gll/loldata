import axios from 'axios'
import fs from 'fs'
import logSymbols from 'log-symbols'
export async function info (user) {
  const data = JSON.parse(fs.readFileSync('./auth/token.json'))
  axios({
    method: 'get',
    url: `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}`,
    headers: {
      'X-Riot-Token': data.token
    }
  })
    .then(response => {
      fs.writeFileSync('./auth/user.json', JSON.stringify(response.data))
    })
    .catch(err => {
      throw err
    })
}
