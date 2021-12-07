import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`

const Launch = () => {
  const { flight_number } = useParams()
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: parseInt(flight_number) },
  })

  if (loading) {
    return <h4>Loading...</h4>
  } else {
    const { flight_number, mission_name, launch_year, launch_success, rocket } =
      data.launch
    const { rocket_id, rocket_name, rocket_type } = rocket

    return (
      <>
        {!loading && !error && data.launch && (
          <div>
            <h1 className='display-4 my-3'>
              Mission: <span className='text-dark'>{mission_name}</span>
            </h1>

            <h4 className='mb-3'>Launch Details</h4>

            <ul className='list-group'>
              <li className='list-group-item'>
                Flight Number: {flight_number}
              </li>
              <li className='list-group-item'>Flight Year: {launch_year}</li>
              <li className='list-group-item'>
                Flight Successful:{' '}
                <span
                  className={launch_success ? 'text-success' : 'text-danger'}
                >
                  {launch_success ? 'Yes' : 'No'}
                </span>
              </li>
            </ul>

            <h4 className='my-3'>Rocket Details</h4>
            <ul className='list-group'>
              <li className='list-group-item'>Rocket ID: {rocket_id}</li>
              <li className='list-group-item'>Rocket Name: {rocket_name}</li>
              <li className='list-group-item'>Rocket Type: {rocket_type}</li>
            </ul>

            <hr />

            <Link to='/' className='btn btn-secondary mb-3'>
              Back
            </Link>
          </div>
        )}
      </>
    )
  }
}

export default Launch
