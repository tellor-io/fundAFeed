import { gql } from '@apollo/client'

export const appQuery = gql`
  query {
    dataFeedFundedEntities(orderBy: id, orderDirection: desc) {
      id
      _queryId
      _feedId
      _amount
    }
    newDataFeedEntities(orderBy: id, orderDirection: desc) {
      id
      _token
      _queryId
      _feedId
    }
    oneTimeTipClaimedEntities(orderBy: id, orderDirection: desc) {
      id
      _queryId
      _token
      _amount
    }
    tipAddedEntities(orderBy: id, orderDirection: desc) {
      id
      _token
      _queryId
      _amount
      _queryData
    }
    tipClaimedEntities(orderBy: id, orderDirection: desc) {
      id
      _feedId
      _queryId
      _token
      _amount
    }
  }
`
