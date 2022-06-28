import minABI from './minimumABI.json'
import { digitToMonth } from './time'

//Globals
export const tellorAddressMainnet = '0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0'
export const tellorAddressRinekby = '0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0'
export const tellorAddressPolygon = '0xE3322702BEdaaEd36CdDAb233360B939775ae5f1'
export const tellorAddressMumbai = '0xce4e32fe9d894f8185271aa990d2db425df3e6be'
export const tellorAddressGoerli = '0x002E861910D7f87BAa832A22Ac436F25FB66FA24'
export const autopayAddressPolygon =
  '0xD789488E5ee48Ef8b0719843672Bc04c213b648c'
export const autopayAddressMumbai = '0x7B49420008BcA14782F2700547764AdAdD54F813'

export const truncateAddr = (addr) => {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export const getAssetBalances = async (web3, address, chainId) => {
  //Instantiating Contracts
  const trbContractEthereum = new web3.eth.Contract(
    minABI,
    tellorAddressMainnet
  )
  const trbContractPolygon = new web3.eth.Contract(minABI, tellorAddressPolygon)
  const trbContractMumbai = new web3.eth.Contract(minABI, tellorAddressMumbai)
  const trbContractGoerli = new web3.eth.Contract(minABI, tellorAddressGoerli)
  //Function Globals
  let chainMainTokenBalance
  let trbBalance

  switch (chainId) {
    case 1:
      //Main Chain Balance - ETHEREUM MAINNET
      chainMainTokenBalance = web3.utils.fromWei(
        await web3.eth.getBalance(address)
      )
      trbBalance = await trbContractEthereum.methods
        .balanceOf(address)
        .call()
        .then((res) => web3.utils.fromWei(res))
      //Add more assets here if needed
      return {
        main: Math.round(chainMainTokenBalance * 100) / 100,
        trb: Math.round(trbBalance * 100) / 100,
      }
    case 4:
      //Main Chain Balance - RINKEBY
      chainMainTokenBalance = web3.utils.fromWei(
        await web3.eth.getBalance(address)
      )
      trbBalance = await trbContractEthereum.methods
        .balanceOf(address)
        .call()
        .then((res) => web3.utils.fromWei(res))
      //Add more assets here if needed
      return {
        main: Math.round(chainMainTokenBalance * 100) / 100,
        trb: Math.round(trbBalance * 100) / 100,
      }
    case 5:
      //Main Chain Balance - GOERLI
      chainMainTokenBalance = web3.utils.fromWei(
        await web3.eth.getBalance(address)
      )
      trbBalance = await trbContractGoerli.methods
        .balanceOf(address)
        .call()
        .then((res) => web3.utils.fromWei(res))
      //Add more assets here if needed
      return {
        main: Math.round(chainMainTokenBalance * 100) / 100,
        trb: Math.round(trbBalance * 100) / 100,
      }
    case 137:
      //Main Chain Balance - MATIC/POLYGON MAINNET
      chainMainTokenBalance = web3.utils.fromWei(
        await web3.eth.getBalance(address)
      )
      trbBalance = await trbContractPolygon.methods
        .balanceOf(address)
        .call()
        .then((res) => web3.utils.fromWei(res))
      //Add more assets here if needed
      return {
        main: Math.round(chainMainTokenBalance * 100) / 100,
        trb: Math.round(trbBalance * 100) / 100,
      }
    case 80001:
      //Main Chain Balance - MUMBAI
      chainMainTokenBalance = web3.utils.fromWei(
        await web3.eth.getBalance(address)
      )
      trbBalance = await trbContractMumbai.methods
        .balanceOf(address)
        .call()
        .then((res) => web3.utils.fromWei(res))
      //Add more assets here if needed
      return {
        main: Math.round(chainMainTokenBalance * 100) / 100,
        trb: Math.round(trbBalance * 100) / 100,
      }
    default:
      return null
  }
}

//SO FAR NOT USED, DELETE LATER IF NEEDED
export const sortDataByProperty = (prop, arr) => {
  arr.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return 1
    } else if (a[prop] > b[prop]) {
      return -1
    } else {
      return 0
    }
  })
  return arr
}

export const dateManipulator = (formData) => {
  //FOR THE FUTURE WHEN WE INCLUDE UTC TIMEZONE
  //AND LOCAL MACHINE TIME
  // const timezoneOffset = (new Date().getTimezoneOffset() / 60).toString()
  // const UTCDate = Math.round(
  //   new Date(
  //     `${digitToMonth[formData.startMonth]} ${formData.startDay}, ${
  //       formData.startYear
  //     } ${formData.startHourFirst}${formData.startHourSecond}:${
  //       formData.startMinuteFirst
  //     }${formData.startMinuteSecond}:00-0${timezoneOffset}:00`
  //   ).getTime() / 1000
  // )

  const localDate =
    new Date(
      `${digitToMonth[formData.startMonth]} ${formData.startDay}, ${
        formData.startYear
      } ${formData.startHourFirst}${formData.startHourSecond}:${
        formData.startMinuteFirst
      }${formData.startMinuteSecond}:00`
    ).getTime() / 1000

  return localDate
}

export const convertToSeconds = (amount, type) => {
  let total
  switch (type) {
    case 'minute':
      total = amount * 60
      return total
    case 'minutes':
      total = amount * 60
      return total
    case 'hour':
      total = amount * 60 * 60
      return total
    case 'hours':
      total = amount * 60 * 60
      return total
    case 'day':
      total = amount * 24 * 60 * 60
      return total
    case 'days':
      total = amount * 24 * 60 * 60
      return total
    default:
      return
  }
}
