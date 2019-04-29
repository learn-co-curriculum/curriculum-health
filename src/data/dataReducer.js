import onlineData from './data/online.js'
import old_preworkData from './data/old_prework.js'
import mod1Data from './data/mod1.js'
import mod2Data from './data/mod2.js'
import old_mod3Data from './data/old_mod3.js'
import new_mod3Data from './data/new_mod3.js'
import mod4Data from './data/mod4.js'

export default [ ...new Set( [
  ...onlineData,
  ...old_preworkData,
  ...mod1Data,
  ...mod2Data,
  ...old_mod3Data,
  ...new_mod3Data,
  ...mod4Data
] ) ]
