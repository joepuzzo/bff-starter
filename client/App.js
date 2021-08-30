import React, { useEffect, useState } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql,
  from
} from "@apollo/client";
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    // authLink,
    // @ts-ignore
    createUploadLink({
      uri: '/graphql',
      credentials: 'include',
      // headers: {
      //   'CSRF-TOKEN': Cookies.get('CSRF-TOKEN'),
      // },
    }),
  ]),
});

const GET_PARTS_CHANGESET_PARTS_PRICING1 = gql`
  query getPartsChangesetPartsPricing(
    $changesets: [Int]!
    $market: String!
    $offset: Int
    $limit: Int
    $effectiveDate: String
    $productTypes: [String]
    $productModels: [String]
    $productSystems: [String]
    $productSubsystems: [String]
    $productTopics: [String]
    $partTypes: [String]
    $actions: [ActionInput]
  ) {
    generatePartsPricing(
      changesets: $changesets
      market: $market
      offset: $offset
      limit: $limit
      effectiveDate: $effectiveDate
      productTypes: $productTypes
      productModels: $productModels
      productSystems: $productSystems
      productSubsystems: $productSubsystems
      productTopics: $productTopics
      partTypes: $partTypes
      actions: $actions
    ) {
      id
      name
      number
      productSystems
      productSubsystems
      productTypes
      partTypes
      productModels
      productTopics
      status
      SBOMStartDate
      SBOMEndDate
      effectiveStartDate
      effectiveEndDate
      prices {
        weight
        price
        vatPrice
        vat
        roundedPrice
        roundedVatPrice
        changesets
        costs {
          unitLaborCost
          unitBurdenCost
          unitServiceCost
          unitMaterialCost
        }
        baseCostCustomizations {
          cost
          costAggregation
          customizations {
            id
            ruleType
            effectiveDate
            endEffectiveDate
            value
            adjustmentType
            market
            changesetId
            changesetName
            startValue
            endValue
            precision
            relatedTo
            result
            rateType
          }
        }
        marketPrices {
          market
          marketCustomizations {
            costCustomizations {
              costAggregation
              customizations {
                id
                ruleType
                effectiveDate
                endEffectiveDate
                value
                adjustmentType
                market
                changesetId
                changesetName
                startValue
                endValue
                precision
                roundType
                relatedTo
                result
                rateType
              }
            }
            marginCustomizations {
              price
              customizations {
                id
                ruleType
                effectiveDate
                endEffectiveDate
                value
                adjustmentType
                market
                changesetId
                changesetName
                startValue
                endValue
                precision
                roundType
                relatedTo
                result
                rateType
              }
            }
            priceCustomizations {
              price
              customizations {
                id
                ruleType
                effectiveDate
                endEffectiveDate
                value
                adjustmentType
                market
                changesetId
                changesetName
                startValue
                endValue
                precision
                roundType
                relatedTo
                result
                rateType
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PARTS_QUEUE1 = gql`
  query partsQueue(
    $limit: Int
    $offset: Int
    $productTypes: [String]
    $productModels: [String]
    $productSystems: [String]
    $productSubsystems: [String]
    $productTopics: [String]
    $partTypes: [String]
    $market: String
  ) {
    partsQueue(
      limit: $limit
      offset: $offset
      productTypes: $productTypes
      productModels: $productModels
      productSystems: $productSystems
      productSubsystems: $productSubsystems
      productTopics: $productTopics
      partTypes: $partTypes
      market: $market
    ) {
      queuedParts
      partsQueue {
        id
        number
        productTypes
        productModels
        productSystems
        productSubsystems
        productTopics
        name
        partTypes
        manufacturingLocation
        prices {
          changesets
          roundedVatPrice
          costs {
            unitLaborCost
            unitBurdenCost
            unitServiceCost
            unitMaterialCost
          }
          baseCostCustomizations {
            cost
            costAggregation
            customizations {
              id
              value
              adjustmentType
              result {
                value
              }
            }
          }
        }
      }
    }
  }
`;

const GET_PARTS_CHANGESET_PARTS_PRICING = gql`
  query getPartsChangesetPartsPricing(
    $changesets: [Int]!
    $market: String!
    $offset: Int
    $limit: Int
    $effectiveDate: String
    $productTypes: [String]
    $productModels: [String]
    $productSystems: [String]
    $productSubsystems: [String]
    $productTopics: [String]
    $partTypes: [String]
    $actions: [ActionInput]
  ) {
    generatePartsPricing(
      changesets: $changesets
      market: $market
      offset: $offset
      limit: $limit
      effectiveDate: $effectiveDate
      productTypes: $productTypes
      productModels: $productModels
      productSystems: $productSystems
      productSubsystems: $productSubsystems
      productTopics: $productTopics
      partTypes: $partTypes
      actions: $actions
    ) {
      id
      name
      number
      productSystems
      productSubsystems
      productTypes
      partTypes
      productModels
      productTopics
      status
      SBOMStartDate
      SBOMEndDate
      effectiveStartDate
      effectiveEndDate
      prices {
        weight
        price
        vatPrice
        vat
        roundedPrice
        roundedVatPrice
        changesets
        costs {
          unitLaborCost
          unitBurdenCost
          unitServiceCost
          unitMaterialCost
        }
        baseCostCustomizations {
          cost
          costAggregation
          customizations {
            id
            ruleType
            effectiveDate
            endEffectiveDate
            value
            adjustmentType
            market
            changesetId
            changesetName
            startValue
            endValue
            precision
            relatedTo
            result {
              value
            }
            rateType
          }
        }
        marketPrices {
          market
          marketCustomizations {
            marginCustomizations {
              price
              customizations {
                id
                ruleType
                effectiveDate
                endEffectiveDate
                value
                adjustmentType
                market
                changesetId
                changesetName
                startValue
                endValue
                precision
                roundType
                relatedTo
                result {
                  value
                }
                rateType
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PARTS_QUEUE = gql`
  query partsQueue(
    $limit: Int
    $offset: Int
    $productTypes: [String]
    $productModels: [String]
    $productSystems: [String]
    $productSubsystems: [String]
    $productTopics: [String]
    $partTypes: [String]
    $market: String
  ) {
    partsQueue(
      limit: $limit
      offset: $offset
      productTypes: $productTypes
      productModels: $productModels
      productSystems: $productSystems
      productSubsystems: $productSubsystems
      productTopics: $productTopics
      partTypes: $partTypes
      market: $market
    ) {
      queuedParts
      partsQueue {
        id
        number
        productTypes
        productModels
        productSystems
        productSubsystems
        productTopics
        name
        partTypes
        manufacturingLocation
        prices {
          changesets
          roundedVatPrice
          costs {
            unitLaborCost
            unitBurdenCost
            unitServiceCost
            unitMaterialCost
          }
          baseCostCustomizations {
            cost
            costAggregation
            customizations {
              id
              value
              adjustmentType
              result {
                value
              }
            }
          }
        }
      }
    }
  }
`;

const DOGS = gql`
  query{
    dogs {
      name
      id
    }
  }
`;

const OTHER_DOGS = gql`
  query{
    otherDogs {
      name
      id
    }
  }
`;

const OtherDogs = () => {

  const [getDogs, { loading, error, data }] = useLazyQuery(OTHER_DOGS, {
    fetchPolicy: 'network-only'
  });

  useEffect(()=>{
    getDogs();
  }, [])

  const [
    getPartsChangesetPartsPricing,
    { loading: partsPricingLoading, error: partsPricingError, data: partsPricingData, fetchMore },
  ] = useLazyQuery(GET_PARTS_CHANGESET_PARTS_PRICING, {
    fetchPolicy: 'network-only',
  });

  useEffect(()=>{
    getPartsChangesetPartsPricing({
      variables: {
        changesets: [27],
        limit: 20,
        offset: 0,
        actions: [],
        market: `US:USD`,
      },
    });
  }, [])

  if (loading || partsPricingLoading) return <p>Loading...</p>;
  if (error || partsPricingError) return <p>Error :(</p>;

  return (
    <>
      <h1>Dogs</h1>
      {data ? data.otherDogs.map(({ id, name, age }) => (
        <div key={id}>
          <p>
            Id({id}) Name({name}) Age({age})
          </p>
        </div>
      )) : null }
    </>
  )

}


const Dogs = () => {

  const [getDogs, { loading, error, data }] = useLazyQuery(DOGS, {
    fetchPolicy: 'network-only'
  });

  useEffect(()=>{
    getDogs();
  }, [])

  const [
    getPartsQueue,
    { loading: partsQueueLoading, error: partsQueueError, data: partData, fetchMore },
  ] = useLazyQuery(GET_PARTS_QUEUE, {
    fetchPolicy: 'network-only',
  });

  useEffect(()=>{
    getPartsQueue({
      variables: {
        offset: 0,
        limit: 100,
        market: `US:USD`,
      },
    });
  }, [])

  if (loading || partsQueueLoading) return <p>Loading...</p>;
  if (error || partsQueueError) return <p>Error :(</p>;

  return (
    <>
      <h1>Dogs</h1>
      {data ? data.dogs.map(({ id, name }) => (
        <div key={id}>
          <p>
            Id({id}) Name({name})
          </p>
        </div>
      )) : null }
    </>
  )

}

const DogThings = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Dogs />
      <button type="button" onClick={()=> setShow(!show)}>
        Toggle Other Dogs
      </button>
      {show ? <OtherDogs /> : null}
    </>
  )
}

const App = () => {

  // const { loading, error, data } = useGet({
  //   url: '/health'
  // });

  

  return (
    <ApolloProvider client={client}>
       <DogThings />
    </ApolloProvider>
  );
};

export default App;