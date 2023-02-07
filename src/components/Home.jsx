import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Image } from 'react-bootstrap'
import CheckLogo from '../Icons/Nespresso-Icons-05.png'
import ResultsLogo from '../Icons/Nespresso-Icons-10.png'
import MembersLogo from '../Icons/Nespresso-Icons-11.png'
import '../css/home.css'

export default function Home() {
  return (
    <>
      <main className='main-body'>
        <Container>
          <div className='row row-cols-1 row-cols-md-3 mb-3 text-center'>
            <div className='col'>
              <Card className='mb-4 rounded-3 shadow-sm'>
                <Link to='/new-form'>
                  <Card.Header className='py-3'>
                    <h4 className='my-0 fw-normal'>Új mérés</h4>
                  </Card.Header>
                  <Card.Body>
                    <Image src={CheckLogo} fluid />
                  </Card.Body>
                </Link>
              </Card>
            </div>

            <div className='col'>
              <Card className='mb-4 rounded-3 shadow-sm'>
                <Link to='/results'>
                  <Card.Header className='py-3'>
                    <h4 className='my-0 fw-normal'>Eredmények</h4>
                  </Card.Header>
                  <Card.Body>
                    <Image src={ResultsLogo} fluid />
                  </Card.Body>
                </Link>
              </Card>
            </div>

            <div className='col'>
              <Card className='mb-4 rounded-3 shadow-sm'>
                <Link to='/members'>
                  <Card.Header className='py-3'>
                    <h4 className='my-0 fw-normal'>Coffee Specialistek</h4>
                  </Card.Header>
                  <Card.Body>
                    <Image src={MembersLogo} fluid />
                  </Card.Body>
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
