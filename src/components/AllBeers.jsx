import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
const apiUrl = 'https://ih-beers-api2.herokuapp.com/beers'


const AllBeers = () => {

    const [beers, setBeers] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        axios
            .get(apiUrl)
            .then(response => {
                console.log(response.data)
                setBeers(response.data)
            })
            .catch(error => console.log(error))
        }, []
    )

    const handleChange = (e) => {
        setSearch(e.target.value)
        console.log(search)
        let query = search

        axios
            .get(`https://ih-beers-api2.herokuapp.com/beers/search?q=${query}`)
            .then(res => {
                setBeers(res.data)
            })
            .catch(error => console.log(error))
    }



    return (
        <>
            <div className="row justify-content-center">
                <h1 className="title"><strong>All</strong> beers</h1>
                <div className="col-12">
                    <div className="form-group search-input">
                        <label htmlFor="search">Beer search</label>
                        <input type="text" className="form-control" id="search" aria-describedby="search" placeholder="Enter beer search" name="search" onChange={(e) => handleChange(e)} value={search} />
                    </div>
                </div>
                {beers.length ? beers.map((beer) =>
                    <div className="col-12 col-sm-3 mb-4">
                        <div className="card">
                            <NavLink to={`/beers/${beer._id}`} className="card-header">
                                <div className="card-pic" style={{background: `url(${beer.image_url}) no-repeat center center / contain`}}></div>
                            </NavLink>
                            <div className=" card-body">
                                <h5 className="card-title">{beer.name} <br />
                                    <small className="tagline">{beer.tagline}</small></h5>
                                <p className="card-text">@{beer.contributed_by}</p>
                            </div>
                        </div>
                    </div>
                ) : <h1 className="text-center">Loading...</h1>}
            </div>
        </>
    )

}

export default AllBeers

