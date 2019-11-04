import { info } from './controller/info'
import { getListMatches } from './controller/matchlists'
import { getMatchesInfo } from './controller/match'
import { clean } from './controller/cleaning'

info('LiXiu')
  .then(res => {
    return getListMatches()
  })
  .then(res2 => {
    return getMatchesInfo()
  })
  .then(res3 => {
    clean()
  })
  .catch(err => {
    throw err
  })
