import { Parser } from 'json2csv'
import fs from 'fs'
import { omit, merge, find, forEach, pick } from 'lodash'
import logSymbols from 'log-symbols'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const user = JSON.parse(fs.readFileSync('./auth/user.json'))
var matches = JSON.parse(fs.readFileSync('data/json/matchs.json'))

function renameObject (data) {
  forEach(Object.keys(data), value => {
    forEach(Object.keys(data[value]), data2 => {
      data[value][`${value}_${data2}`] = data[value][data2]
      delete data[value][data2]
    })
  })
  return data
}

function cleanMatch (match) {
  const infoMatch = omit(match, ['teams', 'participants', 'participantIdentities'])
  const player = find(match.participantIdentities, o => o.player.summonerName === user.name)
  const teams = omit(player.participantId <= 4 ? match.teams[0] : match.teams[1], ['bans'])
  const participant = omit(match.participants[player.participantId - 1], ['stats', 'timeline', 'masteries', 'runes'])
  const stats = match.participants[player.participantId - 1].stats
  let timeline = omit(match.participants[player.participantId - 1].timeline, ['lane', 'participantId', 'role'])
  timeline = renameObject(timeline)
  var final = {}
  const infoTimeLine = pick(match.participants[player.participantId - 1].timeline, ['lane', 'role'])
  forEach(Object.keys(timeline), value => {
    final = merge(final, timeline[value])
  })
  return merge(infoMatch, teams, participant, stats, final, infoTimeLine)
}
export function clean () {
  var db = []
  forEach(matches, (value, index) => {
    db.push(cleanMatch(value))
  })
  console.log(logSymbols.success, 'Matchs Trasnasformed!')
  // console.log(db[0])
  const test = Object.keys(db[0])
  const opts = { test }
  try {
    const parser = new Parser(opts)
    const csv = parser.parse(db)
    writeFile('data/csv/data.csv', csv)
    console.log(logSymbols.success, 'Matchs saved to CSV!')
  } catch (err) {
    console.error(err)
  }
}
